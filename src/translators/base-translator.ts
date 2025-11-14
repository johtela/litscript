/**
 * # Translator Base Class and Interfaces
 */
//#region -c translator imports
import * as path from "path";
import * as ts from "typescript";
import * as bl from "../block-list";
import * as reg from "../region";
//#endregion
/**
 * This module contains few definitions for objects created elsewhere in the
 * application. First we define an interface that represents an input-output
 * file pair.
 *
 * We categorize source files to tho groups: TypeScript and other.
 */
export enum SourceKind {
  typescript,
  other,
}
/**
 * For other kind of source files we need both the file name and its contents.
 */
export interface OtherFile {
  fileName: string;
  contents: string;
}
/**
 * The OutputFile interface stores the kind of the source file, a reference to
 * the source file (either TypeScript `SourceFile` object or `OtherFile`
 * object defined above), and the target path both in relative and full format.
 */
export interface OutputFile {
  sourceKind: SourceKind;
  source: ts.SourceFile | OtherFile;
  fullTargetPath: string;
  relTargetPath: string;
}
/**
 * The OutputFileMap interface is a dictionary that maps source files to the
 * OutputFile objects.
 */
export interface OutputFileMap {
  [sourcePath: string]: OutputFile;
}
/**
 * ## Base Class for Translators
 *
 * Translator gets an OutputFile object as a parameter and maintains internal
 * state that helps constructing block lists.
 */
export abstract class Translator {
  protected outputFile: OutputFile;
  /**
   * The head of the block list is stored here.
   */
  private blocks: bl.BlockList;
  /**
   * The currently last block is here.
   */
  protected currBlock: bl.BlockList;
  /**
   * The abstract method below should be implemented to extract a block list
   * from a file.
   */
  protected abstract createBlocks();
  /**
   * This method returns the language designator (e.g. js, ts, css) used when
   * creating code blocks. The default language designator is extracted from
   * the file extension of the source file, but this can be overridden in
   * subclasses.
   */
  protected language(): string {
    return path.extname(this.outputFile.source.fileName).substring(1);
  }
  /**
   * ## Main Methods
   *
   * To run the translator, you call the following method.
   */
  getBlocksForFile(outputFile: OutputFile): bl.BlockList {
    this.initialize(outputFile);
    this.createBlocks();
    return this.finalize();
  }
  /**
   * Scan a file for region definitions without generating blocks.
   * This allows regions to be collected in a first pass before they are
   * needed for expansion in a second pass.
   */
  scanForRegions(outputFile: OutputFile) {
    this.initialize(outputFile);
    this.scanFileForRegions();
  }
  /**
   * Abstract method that should be implemented to scan for regions.
   * Default implementation does nothing (for non-TypeScript files).
   */
  protected scanFileForRegions() {
    // Default: no-op, overridden in TsTranslator
  }
  /**
   * ## Initialization and Finalization
   *
   * Before starting the operation, the internal state of the translator needs
   * to be reset.
   */
  private initialize(outputFile: OutputFile) {
    this.outputFile = outputFile;
    this.blocks = null;
    this.currBlock = null;
  }
  /**
   * Finalization only involves closing the current block and returning
   * the head.
   */
  private finalize() {
    if (this.currBlock) this.currBlock.close();
    return this.blocks;
  }
  /**
   * ## Markdown Processing
   *
   * We split markdown text using a regex that recognizes region and
   * visualizer calls. We expand each region/visualizer call and open
   * a new block after that.
   */
  protected splitMdFile(text: string, fileName: string) {
    this.scan(
      text,
      /^\s*<<(r|v):(.+?)>>\s*$/gims,
      (match) => {
        let command = match[1].toLowerCase();
        let params = match[2];
        if (command == "r") this.expandRegion(params.trim(), fileName);
      },
      (t) => this.openMarkdownBlock(t)
    );
  }
  /**
   * ### Expanding Regions and Visualizers
   *
   * Instead of expanding regions immediately, we create a placeholder block
   * that references the region. The actual expansion happens later after
   * all files are parsed, using topological sorting to handle dependencies.
   */
  private expandRegion(regionName: string, fileName: string) {
    if (!regionName) throw SyntaxError("No region name specified.");

    // Create a region reference block instead of expanding immediately
    let refBlock = new bl.BlockList(bl.BlockKind.regionRef, regionName);
    refBlock.append(regionName); // Store region name in contents
    refBlock.close(); // Finalize the block
    this.openNewBlock(refBlock);
  }
  /**
   * ## Adding Blocks
   *
   * The following helper method adds a block at the end of the list and
   * assigns it to the `currentBlock` property. It also closes the previous
   * block, if needed. If this is the first block, we assign it to the
   * `blocks` property.
   */
  protected openNewBlock(block: bl.BlockList) {
    if (!this.blocks) this.blocks = block;
    else {
      this.currBlock.next = block;
      this.currBlock.close();
    }
    this.currBlock = block;
  }
  /**
   * We can quickly add a new markdown block with specified content with the
   * method below.
   */
  protected openMarkdownBlock(text: string) {
    let block = new bl.BlockList(bl.BlockKind.markdown, null);
    block.append(text);
    this.openNewBlock(block);
  }
  /**
   * Similarly we can add a new code block with the method below.
   */
  protected openCodeBlock(text?: string) {
    let block = new bl.BlockList(bl.BlockKind.code, this.language());
    if (text) block.append(text);
    this.openNewBlock(block);
  }
  /**
   * If we just need to make sure that a specific kind of block is current,
   * we can call this method. It opens a new block, if the current block is
   * not of a given type.
   */
  protected ensureBlock(kind: bl.BlockKind) {
    if (!this.blocks || this.currBlock.kind !== kind)
      this.openNewBlock(new bl.BlockList(kind, this.language()));
  }
  /**
   * ## Scanning Text
   *
   * Translator base class provides a helper function that scans text using
   * the given regex. It calls the first function for each regex match, and
   * the second one for the text fragments in-between.
   */
  protected scan(
    text: string,
    regex: RegExp,
    matchFn: (matches: RegExpExecArray) => void,
    gapFn: (gap: string) => void
  ) {
    let match: RegExpExecArray;
    let start = 0;
    while ((match = regex.exec(text))) {
      let i = match.index;
      if (start < i) gapFn(text.slice(start, i));
      matchFn(match);
      start = regex.lastIndex;
    }
    if (start == 0) gapFn(text);
    else if (start < text.length) gapFn(text.slice(start, text.length));
  }
  /**
   * ## Overrideable Methods
   *
   * The rest of the methods in the translator class can be overridden by a
   * subclass. By default the methods just output code and markdown as-is to
   * the current code block.
   */
  protected appendMarkdown(text: string) {
    this.ensureBlock(bl.BlockKind.markdown);
    this.currBlock.append(text);
  }

  protected appendCode(node: ts.Node, text: string) {
    this.ensureBlock(bl.BlockKind.code);
    this.currBlock.append(text);
  }

  protected appendSingleLineComment(text: string, inner: string) {
    this.ensureBlock(bl.BlockKind.code);
    this.currBlock.append(text);
  }

  protected appendMultiLineComment(text: string, inner: string) {
    this.ensureBlock(bl.BlockKind.code);
    this.currBlock.append(text);
  }
}
