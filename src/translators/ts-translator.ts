/**
 * # Translating TypeScript Files
 * 
 * This module contains common code  needed for translating TypeScript files 
 * into block lists. It works as a stand-alone translator for markdown output, 
 * and as a base class for translator used in context of HTML output.
 */
//#region -c ts-translator imports
import * as path from 'path'
import * as ts from 'typescript'
import * as bl from '../block-list'
import * as bt from './base-translator'
import * as reg from '../region'
import * as dg from '../dependency-graph'
import * as cfg from '../config'
//#endregion

export class TsTranslator extends bt.Translator {
    /**
     * Regions can be nested, thus, a stack of open regions is maintained in an
     * array. 
     */
    private regions: reg.Region[]
    /**
     * ## Processing Source Files
     * 
     * TypeScript files are processed by traversing the leafs of the 
     * *abstract syntax tree* (AST) in order. We are deliberately skipping the 
     * nonterminals because we only want to output the source fragments. 
     * TypeScript compiler provides us the JSDoc comments already concatenated
     * and cleaned up. This saves us from the work of parsing them.
     * 
     * However, we still need to check the *trivia* fragments ignored by the
     * TypeScript parser, because they contain normal comments and processing
     * instructions which we want to show and process. To do this, we maintain
     * a position in the source file in the `prevEnd` variable. The variable
     * contains the ending position of the previous AST node. If the current
     * node lies on a further position, we know that there is some trivia in
     * between that we need to parse.
     */
    protected createBlocks() {
        this.regions = []
        let srcFile = this.outputFile.source as ts.SourceFile
        let module = dg.addModule(cfg.getBaseRelativePath(srcFile.fileName),
            "/" + this.outputFile.relTargetPath)
        let src = srcFile.getFullText()
        let prevEnd = 0
        for (const node of this.iterateAst(srcFile)) {
            let start = node.getStart(srcFile)
            if (start > prevEnd)
                this.parseTrivia(src.slice(prevEnd, start))
            if (ts.isJSDoc(node)) {
                let inner = (<ts.JSDoc>node).comment
                this.splitMdFile(inner, srcFile.fileName)
            }
            else {
                let text = node.getText(srcFile)
                this.appendCode(node, text)
                this.checkDependency(module, node, text)
            }
            prevEnd = node.getEnd()
        }
    }
    /**
     * ## Updating Dependency Graph
     * 
     * While traversing the AST, we check if we encounter import statements.
     * When we do, we add a dependendency to the graph. We need to normalize
     * the name of the imported module, so we remove the quotes from it and
     * make its path relative to the base directory.
     */
    private checkDependency(module: dg.Module, node: ts.Node, text: string) {
        if (node.kind == ts.SyntaxKind.StringLiteral && node.parent &&
            node.parent.kind == ts.SyntaxKind.ImportDeclaration) {
            let fileName = text.replace(/['"]+/g, '')
            if ([".", ".."].includes(path.basename(fileName)))
                fileName += "/index"
            if (fileName.search(/[\/\\]/) >= 0)
                fileName = cfg.getBaseRelativePath(path.resolve(
                    path.dirname(this.outputFile.source.fileName), fileName))
            dg.addModule(fileName)
            dg.addDependency(module, fileName)
        }
    }
    /**
     * ## Iterating the AST
     * 
     * AST iteration is implemented as a recursive [generator][]. It traverses
     * the tree in post-order (children are processed before their parents) and
     * checks for each node, if it is of a correct type. Iteration only returns
     * JSDoc nodes, tokens, and identifiers, i.e. the nonterminals of the
     * abstract syntax tree.
     * 
     * [generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
     */
    private *iterateAst(root: ts.Node): Iterable<ts.Node> {
        function validNode(node: ts.Node) {
            return ts.isJSDoc(node) || ts.isToken(node) || ts.isIdentifier(node)
        }
        let srcFile = this.outputFile.source as ts.SourceFile
        for (let i = 0; i < root.getChildCount(srcFile); ++i)
            for (let node of this.iterateAst(root.getChildAt(i, srcFile)))
                if (validNode(node))
                    yield node
        if (validNode(root))
            yield root
    }
    /**
     * ## Parsing Trivia
     * 
     * Whitespace, comments and directives that are not included in the AST
     * are called *trivia*. The method below gets a piece of trivia (no pun
     * intended) and runs a regex to extract comments from it. If it finds
     * a "normal" single-line or multi-line comment, it outputs it as code.
     * The method has to be quite careful to preserve the whitespace in the 
     * code and output the text not inside comments as-is. 
     */
    private parseTrivia(text: string) {
        this.ensureBlock(bl.BlockKind.code)
        this.scan(text, /(\/\/([^\r\n]*))|(\/\*(.*)\*\/)/gs,
            match => {
                if (match[1]) {
                    if (!this.isRegionMarker(match[2]))
                        this.appendSingleLineComment(match[1], match[2])
                }
                else
                    this.appendMultiLineComment(match[3], match[4])
            },
            t => this.currBlock.append(t))
    }
    /**
     * ## Creating Regions
     * 
     * The `isRegionMarker` method checks if a single line comment contains
     * a `#region` or `#endregion` directive and opens or closes a region if it 
     * finds either. It returns true, if a region directive was found. 
     */
    private isRegionMarker(inner: string): boolean {
        let startRegionRE = /^\s*#region\s+(-h|-c)?(.*)$/
        let endRegionRE = /^\s*#endregion($|\s)/
        let mt: RegExpExecArray
        if (mt = startRegionRE.exec(inner)) {
            this.openRegion(mt[1], mt[2].trim())
            return true
        }
        else if (mt = endRegionRE.exec(inner)) {
            this.closeRegion()
            return true
        }
        return false
    }
    /**
     * A region can have an additional flag which controls whether it is 
     * included in the output or not. There are three options:
     * 
     *   1. With no flags the text and code inside the region is shown 
     *      normally in the output.
     *   2. With the `-c` flag the region is collapsed by default. This is 
     *      implemented using a `<details>` tag. This is of course a HTML
     *      feature, but it works also on GitHub wiki. So, it is implemented
     *      here and not in the [TsHtmlTranslator][] subclass.
     *   3. A region with the `-h` flag is hidden in output. This is also
     *      implemented as HTML using comment tags, so it works with markdown 
     *      wikis.
     * 
     * [TsHtmlTranslator]: ts-html-translator.html
     */
    private openRegion(flags: string, regionName: string) {
        let vis = reg.Visibility.Visible
        if (flags) {
            if (flags[1] == 'c') {
                this.appendMarkdown(`\n\n<details>\n<summary>${regionName ||
                    "Click to show / hide..."}</summary>\n\n`)
                vis = reg.Visibility.Collapsed
            }
            else {
                this.appendMarkdown('\n<!--\n\n')
                vis = reg.Visibility.Hidden
            }
        }
        this.openCodeBlock()
        this.regions.push(reg.Region.add(regionName, this.currBlock,
            (this.outputFile.source as ts.SourceFile).fileName, vis))
    }
    /**
     * When a region is closed we pop it from the stack and append the
     * appropriate closing tag to the output, if the region is collapsed or 
     * hidden.
     */
    private closeRegion() {
        let region = this.regions.pop()
        if (region.visibility == reg.Visibility.Visible)
            this.openCodeBlock()
        else {
            this.openCodeBlock()
            if (region.visibility == reg.Visibility.Collapsed)
                this.appendMarkdown("\n</details>\n")
            else
                this.appendMarkdown('\n-->\n')
        }
        region.close(this.currBlock)
    }
}