/**
 * ---
 * { "useMath": true }
 * ---
 * # HTML Weaver
 * 
 * When HTML is selected as an output format, the weaver class needs to do more
 * work:
 * 
 *  - Manage TOC loading, saving, and updating.
 *  - Keep track of dynamic code files (see [visualizers](visualizer.html)).
 *  - Convert markdown blocks to HTML. This involves also adding syntax 
 *    highlighting to TypeScript code blocks written inside markdown.
 *  - Call the template to transform HTML snippets into valid web pages.
 *  - Call the [bundler](bundler.html) to pack the dependencies of the
 *    generated HTML files to single JS and CSS files. 
 * 
 * ## Imports
 * 
 * We use [markdown-it][] library to convert markdown to HTML. We customize it
 * with couple of plug-ins that:
 * - add IDs to heading tags ([markdown-it-named-headings][]), 
 * - provide support for [KaTeX][] math equations ([markdown-it-katex]), 
 * - parse [front matter](front-matter.html) at the beginning of a file 
 *   ([markdown-it-front-matter][]), and
 * - allow resizing images ([markdown-it-imsize][]).
 * 
 * [markdown-it]: https://github.com/markdown-it/markdown-it
 * [markdown-it-named-headings]: https://github.com/rstacruz/markdown-it-named-headings
 * [markdown-it-katex]: https://github.com/waylonflinn/markdown-it-katex
 * [markdown-it-front-matter]: https://github.com/craigdmckenna/markdown-it-front-matter
 * [markdown-it-imsize]: https://github.com/tatsy/markdown-it-imsize
 * [KaTex]: https://katex.org/
 */
import * as path from 'path'
import * as fs from 'fs'
import * as ts from 'typescript'
import * as fm from './templates/front-matter'
import * as toc from './templates/toc'
import * as tmp from './templates/template'
import * as MarkdownIt from 'markdown-it'
import * as mditKatex from '@iktakahiro/markdown-it-katex'
import { minimatch } from 'minimatch'
import mditNamedHeadings = require('markdown-it-named-headings')
import mditImSize = require("markdown-it-imsize")
const mditFrontMatter = require("markdown-it-front-matter")
import { HLJSApi } from 'highlight.js'
const hljs = require('highlight.js') as HLJSApi
import * as cfg from './config'
import * as bl from './block-list'
import * as tr from './translators/translators'
import * as wv from './weaver'
import * as bnd from './bundler'
import * as log from './logging'
/**
 * ## Instance Variables
 * 
 * We store inside a `HtmlWeaver` object variables that are needed in the process.
 */
export class HtmlWeaver extends wv.Weaver {
    /**
     * Reference to the markdown parser.
     */
    private mdit: MarkdownIt
    /**
     * We also keep the active front matter up-to-date. If a source file 
     * contains overrides to the global settings, they will only appear here.
     */
    private frontMatter: fm.FrontMatter
    /**
     * The base directory.
     */
    private baseDir: string
    /**
     * The site directory.
     */
    private siteDir: string
    /**
     * The output directory,
     */
    private outDir: string
    /**
     * Currently open table of contents.
     */
    private toc: toc.Toc
    /**
     * The dynamic code files referenced in the markdown are stored in a 
     * dictionary.
     */
    public entries: bnd.EntryPoints
    /**
     * ## Overriding the Main Method
     * 
     * We override the `generateDocumentation` method to instantiate markdown-it
     * and its plug-ins. 
     */
    generateDocumentation(prg: ts.Program) {
        this.mdit = new MarkdownIt({ html: true })
        this.mdit.use(mditKatex)
        this.mdit.use(mditNamedHeadings)
        this.mdit.use(mditImSize)
        let opts = cfg.getOptions()
        /** 
         * If a front matter block is encountered at the start of a file, we
         * parse it and merge the settings with the global front matter object.
         * Since there might be parsing errors, we need to catch and report
         * them to the calling function. 
         */
        this.mdit.use(mditFrontMatter, (fmstr: string) => {
            try {
                this.frontMatter = JSON.parse(fmstr)
                cfg.mergeOptions(opts.frontMatter, this.frontMatter)
            }
            catch (e) {
                throw e instanceof SyntaxError ?
                    Error("Could not parse front matter. Error: \n" +
                        e.message) : e
            }
        })
        /**
         * Configure [highlight.js][] to omit style class prefixes.
         * 
         * [highlight.js]: https://highlightjs.readthedocs.io/en/latest/index.html
         */
        hljs.configure({
            classPrefix: ''
        })
        /**
         * We initialize the rest of the instance variables defined above.
         */
        this.entries = {}
        /** 
         * We load the TOC before calling the inherited method and save it
         * afterwards, if so requested in configuration. As the last step, we
         * bundle the deployment files.
         */
        let tocFile = path.resolve(opts.outDir, opts.tocFile)
        log.info(`Loading TOC from ${log.Colors.Blue}${opts.tocFile}`)
        this.toc = toc.loadToc(tocFile)
        if (this.toc.length == 0)
            log.warn("TOC not found or empty.")
        /**
         * Find site directory either from the current project directory, or
         * from the LiTScript `lib` directory. Also initialize `outDir` as it's
         * needed by the template.
         */
        this.baseDir = opts.baseDir
        this.siteDir = path.resolve(
            cfg.getCompilerOptions().outDir || this.baseDir, "site/")
        if (!fs.existsSync(this.siteDir))
            this.siteDir = path.resolve(__dirname, "../site")
        this.outDir = opts.outDir
        tmp.initialize(this.siteDir)
        super.generateDocumentation(prg)
        if (opts.updateToc) {
            log.info(`Saving TOC to ${log.Colors.Blue}${opts.tocFile}`)
            toc.saveToc(this.toc, tocFile)
        }
        if (opts.bundle)
            bnd.bundle(this.entries)
    }
    /**
     * The output extension is `.html`
     */
    protected getFileExt() {
        return ".html"
    }
    /**
     * ## Adding TOC Entries
     * 
     * We add new pages to TOC, if the corresponding setting is on in the 
     * configuration, and if the file path is not defined to be excluded.
     */
    protected addTocEntry(relPath: string) {
        let opts = cfg.getOptions()
        if (opts.updateToc &&
            !opts.excludeFromToc.some(glob => minimatch(relPath, glob)))
            toc.addTocEntry(this.toc,
                path.basename(relPath, this.getFileExt()), relPath)
    }
    /**
     * ## Reprocess Changed Source File
     */
    protected reprocessSourceFile(sourceFile: ts.SourceFile) {
        let siteDir = path.resolve(cfg.getOptions().baseDir, "site/")
        if (sourceFile.fileName.startsWith(siteDir))
            tmp.initialize(siteDir)
        super.reprocessSourceFile(sourceFile)
    }
    /**
     * ## Saving Blocks
     * 
     * The HTML conversion is done before blocks are saved. The `outputBlocks` 
     * method overridde first renders the blocks to HTML using a subroutine 
     * defined below.
     */
    protected outputBlocks(blocks: bl.BlockList, outputFile: tr.OutputFile) {
        /**
         * Clear source file level front matter and get the template reference.
         * This ensures that template and project level front matter is loaded.
         */
        let opts = cfg.getOptions()
        this.frontMatter = null
        let contents = this.renderHtml(outputFile, blocks)
        let fm = this.frontMatter || opts.frontMatter
        /**
         * The translator fills in a list of render calls which is passed 
         * with the current `codeFile` to the `generateScripts` function. This 
         * function returns a script block that loads and calls the dynamic code. 
         */
        let [ scripts, styles ] = this.scriptsAndStyles(
            outputFile.relTargetPath, fm, opts.serve)
        /**
         * Front matter, TOC, page contents, file path, and scripts are then 
         * passed to the templating engine which constucts the outputted web page. 
         */
        let [main, path] = tmp.generate(fm, this.toc, contents, styles, scripts,
            outputFile.fullTargetPath, outputFile.relTargetPath, this.baseDir, 
            this.siteDir, this.outDir)
        this.entries[main] = path
        this.addTocEntry(outputFile.relTargetPath)
    }
    /**
     * ### Rendering HTML
     *
     * We use a custom markdown-it renderer to convert fenced TypeScript code
     * blocks to HTML.   
     */
    private renderHtml(outputFile: tr.OutputFile, blocks: bl.BlockList): string {
        /**
         * We save the default fence renderer in order to restore it afterwards.
         */
        let defaultFence = this.mdit.renderer.rules.fence
        /** 
         * Now we define our custom renderer. It checks if a fenced code
         * block has a language designator. If it has, we call a subroutine 
         * that converts the code to HTML and adds syntax hightlighting. 
         * Othwerwise we call the default renderer. 
         */
        this.mdit.renderer.rules.fence = (tokens, index, options, env, self) => {
            let token = tokens[index]
            let infos = token.info.trim().toLowerCase().split(/\s+/)
            if (infos.length > 0 && infos[0]) {
                try {
                    return this.syntaxHighlightFencedCode(outputFile,
                        token.content, infos[0])
                }
                catch (e) {
                    log.warn("Syntax highlighting failed: " + e.message)
                }
            }
            return defaultFence(tokens, index, options, env, self)
        }
        /**
         * We will also customize table rendering so that wide tables will work
         * in small screens (add scrolling).
         */
        this.mdit.renderer.rules.table_open = 
            (tokens, index, options, env, self) => 
                '<div style="overflow: auto">\n<table>'
        this.mdit.renderer.rules.table_close =
            (tokens, index, options, env, self) => '</table>\n</div>'
        /**
         * Before rendering the markdown we must concatenate the blocks together.
         */
        let markdown = [...blocks].map(b => b.contents).join("")
        let contents = this.mdit.render(markdown)
        /** 
         * Finally we restore the default renderer and return the result. 
         */
        this.mdit.renderer.rules.fence = defaultFence
        return contents
    }
    /**
     * We make use of [highlight.js][] when converting the code snippet 
     * defined in a fenced block to HTML. We map `jsonc` language to
     * `json` as highlight.js does not recognize it.
     */
    private syntaxHighlightFencedCode(outputFile: tr.OutputFile, code: string,
        language: string) {
        let opts = cfg.getOptions()
        if (language == "jsonc")
            language = "json"
        let res = hljs.highlight(code, { language })
        return bl.htmlHeader + res.value.trimEnd() + bl.htmlFooter
    }
    /**
     * ### Adding Modules and Styles
     * 
     * The helper function below adds the JS/TS modules and CSS style files
     * referenced by the front matter to a list of `script` and stylesheet
     * `link`s. It also adds both modules and styles to the `entries` dictionary 
     * maintained in this class. This dictionary is used to define the bundle
     * root files.
     */
    private scriptsAndStyles(relPath: string, frontMatter: fm.FrontMatter,
        live: boolean): [ string, string ] {
        let mainJs = `dist/${frontMatter.pageTemplate}.js`
        let mainCss = `dist/${frontMatter.pageTemplate}.css`
        let scripts: string[] = [ 
            `<script src="${tmp.relLink(relPath, mainJs)}"></script>` ]
        let styleSheets: string[] = [
            `<link rel="stylesheet" href="${tmp.relLink(relPath, mainCss)}" />` ]
        frontMatter.modules?.forEach(module => {
            let name = path.basename(module, '.ts')
            name = this.addEntry(name, module)
            let scriptFile = 'dist/' + name + '.js'
            scripts.push(
                `<script src="${tmp.relLink(relPath, scriptFile)}"></script>`)
        })
        if (live)
            scripts.push(this.liveReload)
        frontMatter.styles?.forEach(style => {
            let name = path.basename(style, '.css')
            name = this.addEntry(name, style)
            let cssFile = 'dist/' + name + '.css'
            styleSheets.push(
                `<link rel="stylesheet" href="${tmp.relLink(relPath, cssFile)}" />`)
        })
        return [scripts.join('\n'), styleSheets.join('\n')]
    }
    /**
     * Add new entry to the bundled roots. If there is already an entry with
     * the same name (but with different file), add a running number after
     * the name and return it.
     */
    private addEntry(name: string, file: string) {
        if (!Object.values(this.entries).includes(file)) {
            if (this.entries[name]) {
                let i = 1
                while (this.entries[name + i]) i++
                name = name + i
            }
            this.entries[name] = file
        }
        return name
    }

    private liveReload = `
    <script>
    new EventSource('/esbuild').addEventListener('change', e => {
        let { added, removed, updated } = JSON.parse(e.data)
      
        updated = updated.filter(f => !f.endsWith(".map"))
        if (added.length == 0 && removed.length == 0 && updated.length === 1) {
          for (const link of document.getElementsByTagName("link")) {
            const url = new URL(link.href)
      
            if (url.host === location.host && url.pathname === updated[0]) {
              const next = link.cloneNode()
              next.href = updated[0] + '?' + Math.random().toString(36).slice(2)
              next.onload = () => link.remove()
              link.parentNode.insertBefore(next, link.nextSibling)
              return
            }
          }
        }
        location.reload()
      })
    </script>`
}