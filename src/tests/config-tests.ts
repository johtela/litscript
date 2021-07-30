import * as path from 'path'
import * as fs from 'fs'
import * as lits from '../index'
import * as utils from './utils'
import * as tmp from 'lits-template'
import { test } from 'lits-extras/lib/tester'

const testOut = "./testOut"

utils.ensureDirExist(testOut)

test("Configuration tests", async t => {
    await t.test("Change outDir", async t => {
        utils.clearDir(testOut)
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "markdown",
            silent: true
        })
        lits.run()
        t.ok(utils.findFiles(testOut, "**/*.md").length > 0, 
            "Output files generated")        
    })

    await t.test("Include and exclude files", async t => {
        utils.clearDir(testOut)
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "markdown",
            silent: true,
            files: [ "index.md" ],
            exclude: [ "**/*html*.ts" ]
        })
        lits.run()
        let mdFiles = utils.findFiles(testOut, "*/*.md")
        t.ok(mdFiles.includes(path.join(testOut, "index.md")), "Index.md found")
        t.ok(!mdFiles.includes(path.join(testOut, "License.md")), 
            "License.md not found")
        let srcFiles = utils.findFiles(testOut, "*/src/*.md")
        t.ok(srcFiles.includes(path.join(testOut, "src", "weaver.md")), 
            "weaver.md found")
        t.ok(!srcFiles.includes(path.join(testOut, "src", "html-weaver.md")),
            "html-weaver.md not found")
    })

    await t.test("Create HTML, update TOC and bundle", async t => {
        utils.clearDir(testOut)
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "html",
            silent: true,
            tocFile: "mytoc.json",
            updateToc: true,
            excludeFromToc: ["**/tests/*"],
            bundle: true
        })
        lits.run()
        let opts = lits.getOptions()
        t.ok(utils.findFiles(testOut, "**/*.html").length > 0, 
            "HTML files generated")
        let tocPath = path.join(opts.outDir, opts.tocFile)
        t.ok(fs.existsSync(tocPath), "TOC file generated")
        let toc = JSON.parse(fs.readFileSync(tocPath, 'utf-8')) as tmp.Toc
        t.ok(toc.length > 0, "TOC is not empty")
        t.ok(toc.every(te => te.file.endsWith(te.page + ".html")), 
            "TOC entries point to HTML files")
        t.ok(!toc.some(te => te.file.match(/\/tests\//)),
            "No test files in TOC")
        await lits.finished()
        t.ok(utils.findFiles(testOut, "*/js/*.js").length > 0, 
            "JS files bundled")
        t.ok(utils.findFiles(testOut, "*/css/*.css").length > 0, 
            "CSS files bundled")
    })
})