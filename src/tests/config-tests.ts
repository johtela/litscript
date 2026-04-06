import * as path from 'path'
import * as fs from 'fs'
import * as lits from '../index'
import * as utils from '../utils'
import * as toc from '../templates/toc'
import { test } from 'lits-extras/lib/tester'
import { runTests } from 'lits-extras/lib/node-runner'

const testOut = "./testOut"

utils.ensureDirExist(testOut)

test("Change outDir", async t => {
    utils.clearDir(testOut)
    lits.setOptions({
        outDir: testOut,
        outputFormat: "markdown",
        silent: true
    })
    await lits.run()
    t.isTrue("Output files generated",
        utils.findFiles(testOut, "**/*.md").length > 0)        
})

test("Include and exclude files", async t => {
    utils.clearDir(testOut)
    lits.setOptions({
        outDir: testOut,
        outputFormat: "markdown",
        silent: true,
        files: [ "index.md" ],
        exclude: [ "**/*html*.ts" ]
    })
    await lits.run()
    let mdFiles = utils.findFiles(testOut, "*/*.md")
    t.isTrue("Index.md found", mdFiles.includes(path.join(testOut, "index.md")))
    t.isTrue("License.md not found",
        !mdFiles.includes(path.join(testOut, "License.md")))
    let srcFiles = utils.findFiles(testOut, "*/src/*.md")
    t.isTrue("weaver.md found", 
        srcFiles.includes(path.join(testOut, "src", "weaver.md")))
    t.isTrue("html-weaver.md not found", 
        !srcFiles.includes(path.join(testOut, "src", "html-weaver.md")))
})

test("Create HTML, update TOC and bundle", async t => {
    utils.clearDir(testOut)
    lits.setOptions({
        outDir: testOut,
        outputFormat: "html",
        silent: true,
        tocFile: "mytoc.json",
        updateToc: true,
        excludeFromToc: ["**/tests/*"],
        bundle: true
    })
    await lits.run()
    let opts = lits.getOptions()
    t.isTrue("HTML files generated",
        utils.findFiles(testOut, "**/*.html").length > 0)
    let tocPath = path.join(opts.outDir, opts.tocFile)
    t.isTrue("TOC file generated", fs.existsSync(tocPath))
    let toc = JSON.parse(fs.readFileSync(tocPath, 'utf-8')) as toc.Toc
    t.isTrue("TOC is not empty", toc.length > 0)
    t.isTrue("TOC entries point to HTML files",
        toc.every(te => te.file.endsWith(te.page + ".html")))
    t.isTrue("No test files in TOC",
        !toc.some(te => te.file.match(/\/tests\//)))
    t.isTrue("JS files bundled", 
        utils.findFiles(testOut, "*/dist/*.js").length > 0)
    t.isTrue("CSS files bundled",
        utils.findFiles(testOut, "*/dist/*.css").length > 0)
})

runTests().then(res => process.exit(res))