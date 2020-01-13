/**
 * # Markdown Weaver
 * 
 * Customizing the Weaver class for markdown format is a simple exercise. We 
 * just provide implementations for all the abstract methods.
 */
//#region -c md-weaver imports
import * as fs from 'fs'
import * as ts from 'typescript'
import * as bl from './block-list'
import * as tr from './translators/translators'
import * as wv from './weaver'
//#endregion
export class MarkdownWeaver extends wv.Weaver {
    /**
     * The extension of the output files is `.md`
     */
    protected getFileExt() {
        return ".md"
    }
    /**
     * Saving a block list is also easy. Blocks already contain markdown, so we 
     * just write them as-is to a text file.
     */
    protected outputBlocks(blocks: bl.BlockList, outputFile: tr.OutputFile,
        visulizerCalls: tr.VisualizerCall[]) {
        let fd = fs.openSync(outputFile.fullTargetPath, 'w');
        try {
            for (let block of blocks)
                fs.writeSync(fd, block.contents, null, 'utf8');
        }
        finally {
            fs.closeSync(fd);
        }
    }
}