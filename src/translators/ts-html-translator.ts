/**
 * # Augmenting Code Blocks for HTML Output
 * 
 * TypeScript Compiler API makes syntax highlighting easy by providing the AST 
 * for a source module. AST nodes keep their representive type in the `kind` 
 * property. We map the relevant enumeration options to CSS classes that provide
 * styles for code fragments.
 * 
 * We enhance the code block even further by utilizing the symbol and typing
 * information provided by the TypeChecker class. If that is available 
 * TsHtmlTranslator will also add tooltips to symbols showing their types
 * and produce hyperlinks to symbols' definitions.
 */
//#region -c ts-html-translator imports
import * as ts from 'typescript'
import * as tmp from '../templates/template'
import * as bt from './base-translator'
import * as tt from './ts-translator'
//#endregion
/**
 * ## Helper Functions
 * 
 * We define a few helper functions to make our work easier. The `between` 
 * function checks if a number is inside a range.
 */
function between(n: number, first: number, last: number): boolean {
    return n >= first && n <= last
}
/**
 * The function below replaces all characters in a string that cannot be 
 * written verbatim in HTML with their respective escape codes.
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
/**
 * ## TypeScript Translator for HTML Output
 * 
 * We inherit the TsTranslator class and add a few properties. They are 
 * both optional, the class will work even if they don't have values.
 */
export class TsHtmlTranslator extends tt.TsTranslator {
    /** 
     * This one contains the type checker provided by the compiler API. 
     */
    private checker: ts.TypeChecker
    /**
     * Map from source files to output files is needed for constructing links
     * to symbol definitions.
     */
    private outputMap: bt.OutputFileMap
    /**
     * Remember to call the inherited constructor.
     */
    constructor(checker?: ts.TypeChecker, outputMap?: bt.OutputFileMap) {
        super();
        this.checker = checker
        this.outputMap = outputMap
    }
    /**
     * we don't pass any language designator to blocks. They will be surrounded
     * by `<pre>` and `<code>` tags.
     */
    protected language() {
        return null
    }
    /**
     * ### Mapping SyntaxKind to CSS Class
     * 
     * We determine the CSS class for nodes that are not identifiers in the 
     * big `if` statement below.
     */
    private styleClassForSyntax(kind: ts.SyntaxKind): string {
        let className: string = null
        if (between(kind, ts.SyntaxKind.FirstPunctuation, ts.SyntaxKind.LastPunctuation))
            className = "punctuation"
        else if (between(kind, ts.SyntaxKind.FirstKeyword, ts.SyntaxKind.LastKeyword))
            className = "keyword"
        else if ([ts.SyntaxKind.StringLiteral, ts.SyntaxKind.RegularExpressionLiteral]
            .includes(kind) ||
            between(kind, ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateTail))
            className = "string"
        else if (kind === ts.SyntaxKind.NumericLiteral)
            className = "number"
        return className ? ` class="${className}"` : ""
    }
    /**
     * ### Decorating Symbols
     * 
     * The most involved part of the class is the method below. It returns
     * additional attributes and link references for a given AST node.
     */
    private identAttributes(node: ts.Node): [string, string] {
        /**
         * If the node is not an identifier or the type checker is not set,
         * we effectively do nothing and return empty strings. 
         */
        let attrs = ""
        let href = ""
        if (node.kind !== ts.SyntaxKind.Identifier || !this.checker)
            return [attrs, href]
        /**
         * Next we request symbol information from the type checker. If we
         * get back with nothing we bail out immediately.
         */
        let symbol = this.checker.getSymbolAtLocation(node);
        if (!symbol)
            return [attrs, href]
        let decls = symbol.getDeclarations()
        if (decls && decls.length > 0) {
            /**
             * Having the symbol's declaration information, we can now check
             * if the parent node *is* the declaration. If so, we set its 
             * source position the `id` attribute. That way we don't need an 
             * additional map from symbols to id's.
             */
            let decl = decls[0]
            if (node.parent == decl)
                attrs = ` id="${decl.pos}"`
            else {
                /**
                 * Otherwise we assign the declaration link to `href` result
                 * variable &mdash; provided that we find the target in our 
                 * file map. Obviously, symbols declared outside the project 
                 * are absent from the map. 
                 */
                let hrefFile = this.outputMap[decl.getSourceFile().fileName]
                if (hrefFile)
                    href = `${tmp.relLink(this.outputFile.relTargetPath, 
                        hrefFile.relTargetPath)}#${decl.pos}`
            }
            /**
             * If the declaration is for a type or function we give it a 
             * specific CSS class.
             */
            attrs += ts.isClassDeclaration(decl) || 
                ts.isInterfaceDeclaration(decl) ||
                ts.isTypeAliasDeclaration(decl) || 
                ts.isTypeParameterDeclaration(decl) ||
                ts.isEnumDeclaration(decl) ||
                ts.isImportTypeNode(decl) ? ' class="typename"' :
                ts.isFunctionLike(decl) ? ' class="member"' : ''
        }
        /**
         * Even if we don't find a declaration for a symbol, the type checker 
         * should know its type. We add the type into a tooltip by setting two
         * custom attributes before returning it along with the `href`.
         */
        let symType = this.checker.typeToString(
            this.checker.getTypeAtLocation(node), node.parent)
        if (symType && symType != "")
            attrs = `${attrs} data-toggle="tooltip" data-title="${escapeHtml(symType)}"`
        return [attrs, href]
    }
    /**
     * ### Overridden Append Methods
     * 
     * We analyze each outputted AST node and wrap it inside a `<span>` element,
     * if we recognize it. The helper methods defined above provide the 
     * appropriate attributes for the tag. If we get back a link target, we wrap
     * the span inside an `<a>` tag. Before any of that we escape the illegal 
     * characters.
     */
    protected appendCode(node: ts.Node, text: string) {
        let html = escapeHtml(text)
        if (!node)
            super.appendCode(node, html)
        else {
            let style = this.styleClassForSyntax(node.kind)
            let [attrs, href] = this.identAttributes(node)
            if (style !== "" || attrs !== "")
                html = `<span${style}${attrs}>${html}</span>`
            if (href !== "")
                html = `<a href="${href}">${html}</a>`
            super.appendCode(node, html)
        }
    }
    /** 
     * Comments don't need any analysis. We already know the CSS class to add. 
     */
    protected appendSingleLineComment(text: string, inner: string) {
        super.appendSingleLineComment(
            `<span class="comment">${escapeHtml(text)}</span>`, inner)
    }

    protected appendMultiLineComment(text: string, inner: string) {
        super.appendMultiLineComment(
            `<span class="comment">${escapeHtml(text)}</span>`, inner)
    }
}