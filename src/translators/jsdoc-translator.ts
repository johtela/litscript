/**
 * # Generic JSDoc Translator
 * 
 * This translator extracts JSDoc comments from any file format and splits the 
 * file along the comments. It treats the text between `/**` and 
 * <code>&#42;/</code> as markdown. Other comments it leaves alone.
 */
//#region -c jsdoc-translator imports
import * as bt from './base-translator'
//#endregion
export class JsDocTranslator extends bt.Translator {
    protected createBlocks() {
        let cssFile = this.outputFile.source as bt.OtherFile
        this.splitFile(cssFile.contents, cssFile.fileName)
    }

    private splitFile(text: string, fileName: string) {
        this.scan(text, /\/\*\*(.*?)\*\//gs,
            match => this.openMarkdownBlock(match[1]),
            code => this.openCodeBlock(code))
    }
}