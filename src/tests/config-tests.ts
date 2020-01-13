import * as path from 'path'
import * as fs from 'fs'
import * as assert from 'assert';
import * as lits from '../index'
import * as utils from './utils'
import * as tmp from 'lits-template'

const testOut = "./testOut"

before(() => 
    utils.ensureDirExist(testOut)
)

beforeEach(() =>
    utils.clearDir(testOut)
)

describe("Configuration Tests", () => {
    it("Change outDir", async () => {
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "markdown",
            silent: true
        })
        lits.run()
        assert(utils.findFiles(testOut, "**/*.md").length > 0)        
    })

    it("Include and exclude files", async () => {
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "markdown",
            silent: true,
            files: [ "index.md" ],
            exclude: [ "**/*html*.ts" ]
        })
        lits.run()
        let mdFiles = utils.findFiles(testOut, "*/*.md")
        assert(mdFiles.includes(path.join(testOut, "index.md")))
        assert(!mdFiles.includes(path.join(testOut, "License.md")))
        let srcFiles = utils.findFiles(testOut, "*/src/*.md")
        assert(srcFiles.includes(path.join(testOut, "src", "weaver.md")))
        assert(!srcFiles.includes(path.join(testOut, "src", "html-weaver.md")))
    })

    it("Create HTML, update TOC and bundle", async () => {
        await lits.setOptions({
            outDir: testOut,
            outputFormat: "html",
            silent: true,
            tocFile: "mytoc.json",
            updateToc: true,
            excludeFromToc: [ "**/tests/*" ],
            bundle: true
        })
        lits.run()
        let opts = lits.getOptions()
        assert(utils.findFiles(testOut, "**/*.html").length > 0)
        let tocPath = path.join(opts.outDir, opts.tocFile)
        assert(fs.existsSync(tocPath))
        let toc = JSON.parse(fs.readFileSync(tocPath, '')) as tmp.Toc
        assert(toc.length > 0)
        assert(toc.every(te => te.file.endsWith(te.page + ".html")))
        assert(!toc.some(te => te.file.match(/\/tests\//)))
        await lits.finished()
        assert(utils.findFiles(testOut, "*/js/*.js").length > 0)
        assert(utils.findFiles(testOut, "*/css/*.css").length > 0)
    })
})