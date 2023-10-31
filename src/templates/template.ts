/**
 * # Template API
 * 
 * When you want to create a template, you need implement the `Template`
 * interface. It is the main entry point to the library.
 */
//#region -c template.ts imports
import * as path from 'path'
import * as fs from 'fs'
import * as toc from './toc'
import * as fm from './front-matter'
import * as utils from '../utils'
import { HtmlTemplate, saveHtmlTemplate } from './html';
//#endregion
/**
 * ## Template Context
 * 
 * When generating HTML from a template a context is passed to the generator.
 * The context contains data needed for the outputted HTML and methods to add 
 * new files for the bundler.
 */
export class TemplateContext {
    modules: string[] = []

    constructor(
        readonly frontMatter: fm.FrontMatter,
        readonly toc: toc.Toc,
        readonly contents: string,
        readonly relFilePath: string,
        readonly fullFilePath: string,
        readonly baseDir: string,
        readonly siteDir: string,
        readonly outDir: string,
        readonly styles: string,
        readonly scripts: string) { }
    
    require(dir: string, modPath: string) {
        let module = path.resolve(dir, modPath)
        if (path.extname(module) == "")
            module += ".js"
        checkModuleExists(this)
        let mainDir = path.resolve(this.siteDir, "main/")
        let modpath = utils.toPosixPath(path.relative(mainDir, module))
        if (!this.modules.includes(modpath))
            this.modules.push(modpath)

        function checkModuleExists(ctx: TemplateContext) {
            if (fs.existsSync(module)) 
                return
            else if (module.startsWith(ctx.siteDir)) {
                let relPath = path.relative(ctx.siteDir, module)
                module = path.resolve(ctx.baseDir, "site/", relPath)
                checkModuleExists(ctx)
            }
            else
                throw new Error(`Cannot find module "${module}"`)
        }
    }
}
/**
 * ## Template Function
 * 
 * The main task of a template is to generate a HTML page for given content. 
 * A template is a function that gets the following data as argument in a 
 * TemplateContext object:
 * 
 * - Front matter as data structure.
 * - TOC as data structure.
 * - Contents of the page as string. This is already in HTML format.
 * - Additional style sheet imports in the `styles` string.
 * - Additional script imports in tje `scripts` string.
 * - The relative file path of the outputted page.
 * - The full, resolved file path of the outputted page.
 * 
 * The function returns a HtmlTemplate object which can be outputted to a file.
 */
export type Template = (ctx: TemplateContext) => HtmlTemplate

let templates: Record<string, Template> = {}

/**
 * ## Page Generator
 * 
 * HTML pages are built using template engine that you can find under 
 * the `components` directory. This is out of scope for the documentation,
 * but you can check the engine's implementation from code.
 * 
 * Depending on the front matter setting, we generate either a normal page
 * or landing page. They have separate templates.
 */    
export function initialize(siteDir: string) {
    let mainDir = path.resolve(siteDir, "main/")
    if (fs.existsSync(mainDir))
        utils.clearDir(mainDir)
}

export function clearCache(siteDir: string) {
    templates = {}
    for (let mod in require.cache)
        if (utils.isInsideDir(mod, siteDir))
            delete require.cache[mod]
}

export function generate(fm: fm.FrontMatter, toc: toc.Toc, contents: string, 
    styles: string, scripts: string, fullFilePath: string, relFilePath: string,
    baseDir: string, siteDir: string, outDir: string): [string, string] {
    let ctx = new TemplateContext(fm, toc, contents, relFilePath, fullFilePath,
        baseDir, siteDir, outDir, styles, scripts)
    let template = pageTemplate(siteDir, fm.pageTemplate)
    let htmlTemp = template(ctx)
    saveHtmlTemplate(htmlTemp, fullFilePath);
    return [fm.pageTemplate, saveMain(siteDir, fm.pageTemplate, ctx)]
}

function pageTemplate(siteDir: string, name: string): Template {
    let temp = templates[name]
    if (!temp) {
        let tempFile = path.resolve(siteDir, "pages/", name)   
        temp = require(tempFile).default as Template
        templates[name] = temp
    }
    return temp
}

function saveMain(siteDir: string, page: string, ctx: TemplateContext): 
    string {
    let jsPath = path.resolve(siteDir, `main/${page}.js`)
    if (!fs.existsSync(jsPath)) {
        utils.ensureDirExist(jsPath)
        let fd = fs.openSync(jsPath, 'w')
        try {
            fs.writeSync(fd, '"use strict";\n' +
                'Object.defineProperty(exports, "__esModule", { value: true });\n', 
                null, 'utf8')
            for (let mod of ctx.modules)
                fs.writeSync(fd, `require("${mod}");\n`, null, 'utf8')
        }
        finally {
            fs.closeSync(fd)
        }
    }
    return jsPath
}
/**
 * ## Helper Functions
 * 
 * The `relLink` function returns a relative path from an URL to another.
 */
export function relLink(from: string, to: string): string {
    return to.match(/^https?:\/\//) ? to :
        path.relative(path.dirname(from), to).replace(/\\/g, "/")
}