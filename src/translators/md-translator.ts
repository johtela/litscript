/**
 * # Markdown Translator
 * 
 * Translator for markdown files is dead simple. All the necessary 
 * functionality is already defined in the base class. We just implement the
 * abstract method and that's it.
 */
//#region -c md-translator imports
import * as bt from './base-translator'
//#endregion

export class MdTranslator extends bt.Translator {
    protected createBlocks() {
        let mdFile = this.outputFile.source as bt.OtherFile
        this.splitMdFile(mdFile.contents, mdFile.fileName)
    }
}