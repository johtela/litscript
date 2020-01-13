import * as tt from 'taitto'
let svg = tt.svg
let anim = tt.anim

export class Scene {
    svgelem: tt.svg.GraphElem<SVGSVGElement>
    view: tt.anim.AnimatedView
    baseFolder: tt.anim.Animated
    baseFoldInner: tt.FolderIcon
    inputFiles: tt.anim.Animated[]
    termInner: tt.TerminalIcon
    term: tt.anim.Animated
    caption: tt.svg.GraphElem<SVGTextElement>
    nextBtn: tt.svg.GraphElem<SVGTextElement>
    nextAnim: tt.anim.KeyframeAnim
    outFolder: tt.anim.Animated
    outFoldInner: tt.FolderIcon
    outputFiles: tt.anim.Animated[]
    outputPos: tt.svg.Vector = [850, 200]

    constructor(parent: HTMLElement) {
        this.svgelem = tt.fileDiagram(parent, 600, 300)
    }

    setup() {
        this.view = anim.animatedView(this.svgelem)
        this.term = anim.animated(this.view).position([550, 100]).hide()
        this.termInner = tt.terminal(this.term, "")
        this.createInputFiles()
        this.createOutputFiles()
        this.nextBtn = svg.text(this.svgelem, "Next ≫")
            .addClass("button").attrs({ x: "95%", y: "95%" }).hide()
        this.nextAnim = anim.fadeInOut(this.nextBtn, 500,
            Number.POSITIVE_INFINITY).stopOn("click")
    }
    
    teardown() {
        this.svgelem.deleteChildren()
    }

    createInputFiles() {
        let folderPos: tt.svg.Vector = [200, 200]
        this.baseFolder = anim.animated(this.view).hide().position(folderPos)
        this.baseFoldInner = tt.folder(this.baseFolder, "BaseDir")
        this.inputFiles = Array.from({ length: 4 }, () =>
            anim.animated(this.view).hide().position(folderPos))
        tt.file(this.inputFiles[0], "TS", "index.ts")
        tt.file(this.inputFiles[1], "M↓", "README.md")
        tt.file(this.inputFiles[2], "{}", "tsconfig.json")
        tt.file(this.inputFiles[3], "{}", "litsconfig.json").addClass("green")
    }

    createOutputFiles() {
        this.outFolder = anim.animated(this.view).hide()
            .position(this.term.state.position)
        this.outFoldInner = tt.folder(this.outFolder, "OutDir")
        this.outputFiles = Array.from({ length: 4 }, () =>
            anim.animated(this.view).hide().position(this.outputPos))
        tt.file(this.outputFiles[0], "<>", "index.html")
        tt.file(this.outputFiles[1], "<>", "README.html")
        tt.file(this.outputFiles[2], "#", "main.css")
        tt.file(this.outputFiles[3], "JS", "main.js")
    }

    get openBaseFolder() {
        this.caption = svg.wordWrapText(this.svgelem, 280, 200, 200,
            "This is your project's base directory. It contains your " +
            "code, documentation, and configuration files.")
            .addClass("caption").hide()
        return new anim.AnimSequence()
            .addAt([anim.slideInRight(this.baseFolder, 4, 1000),
                anim.fadeIn(this.baseFolder)], 1000)
            .addToEnd(this.baseFoldInner.open, 1000)
            .addToEnd(anim.spreadAround(this.inputFiles, 170, 500).concat(
                this.inputFiles.slice(0, 3).map(e => anim.fadeIn(e, 500))))
            .addToEnd(anim.fadeIn(this.caption))
            .addToEnd(this.nextAnim)
    }

    private changeCaption(value: string, x: number = 280, 
        wrapAfter: number = 200) {
        return [
            anim.customAnim(this.caption, _ => 
                svg.changeWordWrapText(this.caption, value, x, wrapAfter)),
            anim.fadeIn(this.caption)
        ]
    }

    get addLitsConfig() {
        return new anim.AnimSequence()
            .addToEnd(anim.fadeOut(this.caption))
            .addToEnd(this.changeCaption(
                "Add one more configuration file for LiTScript."))
            .addToEnd([anim.zoomIn(this.inputFiles[3]),
                anim.fadeIn(this.inputFiles[3])])
            .addToEnd(this.nextAnim)
    }

    get openTerminal() {
        return new anim.AnimSequence()
            .addToEnd([anim.fadeOut(this.caption),
                this.view.pan(50, 0, 500)])
            .addToEnd(this.changeCaption(
                "Open a command line terminal and run LiTScript."))
            .addToEnd([anim.slideInTop(this.term, 2, 1000),
                anim.fadeIn(this.term)])
            .addToEndStaggered(this.termInner.setCaption("lits"), 200)
            .addToEnd(this.nextAnim)
    }

    get processFiles() {
        let slides = this.inputFiles.map(e => 
            anim.slideTo(e, this.term.state.position, 1000))
        let fadeOuts = this.inputFiles.map(e => anim.fadeOut(e, 1000))
        this.nextBtn.text = "Replay ⟲"
        return new anim.AnimSequence()
            .addToEnd(anim.fadeOut(this.caption))
            .addToEnd(slides.concat(fadeOuts))
            .addToEnd(this.view.pan(400, 0))
            .addToEnd([anim.slideTo(this.outFolder, this.outputPos),
                anim.fadeIn(this.outFolder)])
            .addToEnd(this.outFoldInner.open)
            .addToEnd(anim.spreadAround(this.outputFiles, 170, 500).concat(
                this.outputFiles.map(e => anim.fadeIn(e, 500))))
            .addToEnd(this.changeCaption(
                "LiTScript extracts documentation from the source files, " +
                "converts them to HTML, and creates a static web site for " + 
                "your project in the output folder.", 50, 250))
            .addToEnd(this.nextAnim)
    }
}