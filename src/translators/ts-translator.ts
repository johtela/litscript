/**
 * # Translating TypeScript Files
 *
 * This module contains common code  needed for translating TypeScript files
 * into block lists. It works as a stand-alone translator for markdown output,
 * and as a base class for translator used in context of HTML output.
 */
//#region -c ts-translator imports
import * as path from "path";
import * as ts from "typescript";
import * as bl from "../block-list";
import * as bt from "./base-translator";
import * as reg from "../region";
import * as dg from "../dependency-graph";
import * as cfg from "../config";
//#endregion

export class TsTranslator extends bt.Translator {
  /**
   * Regions can be nested, thus, a stack of open regions is maintained in an
   * array.
   */
  private regions: reg.Region[];
  /**
   * ## Extracting JSDoc Comment Text
   *
   * The `.comment` property of a JSDoc node is unreliable
   * because TypeScript treats any `@symbol` in the text as a JSDoc tag, even
   * if it appears in regular markdown text (e.g., "@param, @returns" work properly
   * or email addresses like "test@example.com"). When TypeScript parses these
   * as tags, the `.comment` property only contains the text BEFORE the first tag,
   * truncating the rest.
   *
   * The solution is to use `node.getText()` to extract the full source text,
   * then strip the `/**` and `*\/` delimiters and the leading ` * ` from each line.
   * We also need to filter out lines that are actual JSDoc tags (starting with @
   * at the beginning of a line after stripping the asterisk).
   */
  private getJSDocCommentText(node: ts.JSDoc): string {
    let text = node.getText();
    // Remove /** at start and */ at end
    text = text.replace(/^\/\*\*/, "").replace(/\*\/$/, "");
    // Remove leading * and whitespace from each line
    const lines = text.split("\n").map((line) => line.replace(/^\s*\*\s?/, ""));

    // If showJSDocTags is false, filter out all tag lines
    if (!cfg.getOptions().showJSDocTags) {
      return lines.filter((line) => !line.match(/^\s*@\w+/)).join("\n");
    }

    // If showJSDocTags is true, separate prose from tags
    // We need to handle multi-line tags like @example
    const proseLines: string[] = [];
    const tagBlocks: string[] = [];
    let currentTag: string | null = null;
    let currentTagLines: string[] = [];

    for (const line of lines) {
      const tagMatch = line.match(/^\s*@(\w+)/);

      if (tagMatch) {
        // Save previous tag block if any
        if (currentTag && currentTagLines.length > 0) {
          tagBlocks.push(currentTagLines.join("\n"));
        }
        // Start new tag block
        currentTag = tagMatch[1];
        currentTagLines = [line.trim()];
      } else if (currentTag) {
        // This line belongs to the current tag
        currentTagLines.push(line);
      } else {
        // This is prose (not part of any tag)
        proseLines.push(line);
      }
    }

    // Don't forget the last tag block
    if (currentTag && currentTagLines.length > 0) {
      tagBlocks.push(currentTagLines.join("\n"));
    }

    // Build result: prose first, then tags in simple format
    let result = proseLines.join("\n");
    if (tagBlocks.length > 0) {
      result += "\n\n";

      for (const block of tagBlocks) {
        // Filter out empty lines and code fence markers
        const cleanedBlock = block
          .split("\n")
          .filter((line) => line.trim() !== "" && !line.trim().match(/^```/))
          .join(" ");

        if (cleanedBlock) {
          result += `\`${cleanedBlock}\`  \n`;
        }
      }
    }

    return result;
  }
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
  protected scanFileForRegions() {
    this.regions = [];
    let srcFile = this.outputFile.source as ts.SourceFile;
    let src = srcFile.getFullText();

    // Scan trivia for region markers without creating blocks
    let prevEnd = 0;
    for (const node of this.iterateAst(srcFile)) {
      let start = node.getStart(srcFile);
      if (start > prevEnd) {
        this.scanTriviaForRegions(src.slice(prevEnd, start));
      }
      prevEnd = node.getEnd();
    }
  }

  /**
   * Scan trivia text for region markers and register them.
   * This is a lightweight version of parseTrivia that only looks for #region directives.
   */
  private scanTriviaForRegions(text: string) {
    const regionRE = /\/\/([^\r\n]*)/g;
    let match: RegExpExecArray | null;

    while ((match = regionRE.exec(text)) !== null) {
      let inner = match[1];
      let startRegionRE = /^\s*#region\s+(-h|-c)?(.*)$/;
      let endRegionRE = /^\s*#endregion($|\s)/;
      let mt: RegExpExecArray;

      if ((mt = startRegionRE.exec(inner))) {
        this.openRegionScan(mt[1], mt[2].trim());
      } else if ((mt = endRegionRE.exec(inner))) {
        this.closeRegionScan();
      }
    }
  }

  /**
   * Open a region during scanning phase (without creating blocks).
   */
  private openRegionScan(flags: string, regionName: string) {
    let vis = reg.Visibility.Visible;
    if (flags) {
      vis = flags[1] == "c" ? reg.Visibility.Collapsed : reg.Visibility.Hidden;
    }
    let of = this.outputFile;
    // Create a placeholder block for region start - we just need a marker
    let placeholder = new bl.BlockList(bl.BlockKind.code, "typescript");
    this.regions.push(
      reg.Region.add(
        regionName,
        placeholder,
        (of.source as ts.SourceFile).fileName,
        of.relTargetPath,
        vis
      )
    );
  }

  /**
   * Close a region during scanning phase.
   */
  private closeRegionScan() {
    let region = this.regions.pop();
    if (region) {
      // Create a placeholder block for region end
      let placeholder = new bl.BlockList(bl.BlockKind.code, "typescript");
      region.close(placeholder);
    }
  }

  protected createBlocks() {
    this.regions = [];
    let srcFile = this.outputFile.source as ts.SourceFile;
    let module = dg.addModule(
      cfg.getBaseRelativePath(srcFile.fileName),
      this.outputFile.relTargetPath
    );
    let src = srcFile.getFullText();

    // First pass: collect all JSDoc comment ranges to exclude from trivia
    const jsdocRanges: Array<{ start: number; end: number }> = [];
    for (const node of this.iterateAst(srcFile)) {
      if (ts.isJSDoc(node)) {
        jsdocRanges.push({ start: node.pos, end: node.end });
      }
    }

    // Helper to check if a range overlaps with any JSDoc comment
    const isInJSDoc = (start: number, end: number) => {
      return jsdocRanges.some(
        (range) =>
          (start >= range.start && start < range.end) ||
          (end > range.start && end <= range.end) ||
          (start <= range.start && end >= range.end)
      );
    };

    // Second pass: process nodes
    let prevEnd = 0;
    for (const node of this.iterateAst(srcFile)) {
      let start = node.getStart(srcFile);
      let end = node.getEnd();

      // Skip nodes that are inside JSDoc comments
      if (isInJSDoc(start, end) && !ts.isJSDoc(node)) {
        continue;
      }

      if (start > prevEnd && !isInJSDoc(prevEnd, start)) {
        this.parseTrivia(src.slice(prevEnd, start));
      }
      if (ts.isJSDoc(node)) {
        let inner = this.getJSDocCommentText(<ts.JSDoc>node);
        this.splitMdFile(inner, srcFile.fileName);
        // Add blank line after JSDoc to ensure proper paragraph spacing
        this.appendMarkdown("\n\n");
      } else {
        let text = node.getText(srcFile);
        this.appendCode(node, text);
        this.checkDependency(module, node, text);
      }
      prevEnd = node.getEnd();
    }
  }
  /**
   * ## Updating Dependency Graph
   *
   * While traversing the AST, we check if we encounter import or export
   * statements. When we do, we add a dependendency to the graph. We need to
   * normalize the name of the imported module, so we remove the quotes from
   * it and make its path relative to the base directory.
   */
  private checkDependency(module: dg.Module, node: ts.Node, text: string) {
    if (
      node.kind == ts.SyntaxKind.StringLiteral &&
      node.parent &&
      (node.parent.kind == ts.SyntaxKind.ImportDeclaration ||
        node.parent.kind == ts.SyntaxKind.ExportDeclaration)
    ) {
      let fileName = text.replace(/['"]+/g, "");
      if ([".", ".."].includes(path.basename(fileName))) fileName += "/index";
      if (fileName[0] == "." || fileName[0] == "/" || fileName[0] == "\\")
        fileName = cfg.getBaseRelativePath(
          path.resolve(path.dirname(this.outputFile.source.fileName), fileName)
        );
      dg.addModule(fileName);
      dg.addDependency(module, fileName);
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
      return ts.isJSDoc(node) || ts.isToken(node) || ts.isIdentifier(node);
    }
    let srcFile = this.outputFile.source as ts.SourceFile;
    for (let i = 0; i < root.getChildCount(srcFile); ++i)
      for (let node of this.iterateAst(root.getChildAt(i, srcFile)))
        if (validNode(node)) yield node;
    if (validNode(root)) yield root;
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
   *
   * Note: We exclude JSDoc comments (slash-star-star ... star-slash) from
   * this regex because they are handled separately as JSDoc nodes and
   * extracted as markdown.
   */
  private parseTrivia(text: string) {
    this.ensureBlock(bl.BlockKind.code);
    this.scan(
      text,
      /(\/\/([^\r\n]*))|(\/\*(?!\*)(.|\n)*?\*\/)/gs,
      (match) => {
        if (match[1]) {
          if (!this.isRegionMarker(match[2]))
            this.appendSingleLineComment(match[1], match[2]);
        } else this.appendMultiLineComment(match[3], match[4]);
      },
      (t) => this.currBlock.append(t)
    );
  }
  /**
   * ## Creating Regions
   *
   * The `isRegionMarker` method checks if a single line comment contains
   * a `#region` or `#endregion` directive and opens or closes a region if it
   * finds either. It returns true, if a region directive was found.
   */
  private isRegionMarker(inner: string): boolean {
    let startRegionRE = /^\s*#region\s+(-h|-c)?(.*)$/;
    let endRegionRE = /^\s*#endregion($|\s)/;
    let mt: RegExpExecArray;
    if ((mt = startRegionRE.exec(inner))) {
      this.openRegion(mt[1], mt[2].trim());
      return true;
    } else if ((mt = endRegionRE.exec(inner))) {
      this.closeRegion();
      return true;
    }
    return false;
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
    let vis = reg.Visibility.Visible;
    if (flags) {
      if (flags[1] == "c") {
        this.appendMarkdown(
          `\n\n<details>\n<summary>${
            regionName || "Click to show / hide..."
          }</summary>\n\n`
        );
        vis = reg.Visibility.Collapsed;
      } else {
        this.appendMarkdown("\n<!--\n\n");
        vis = reg.Visibility.Hidden;
      }
    }
    this.openCodeBlock();
    let of = this.outputFile;
    this.regions.push(
      reg.Region.add(
        regionName,
        this.currBlock,
        (of.source as ts.SourceFile).fileName,
        of.relTargetPath,
        vis
      )
    );
  }
  /**
   * When a region is closed we pop it from the stack and append the
   * appropriate closing tag to the output, if the region is collapsed or
   * hidden.
   */
  private closeRegion() {
    let region = this.regions.pop();
    if (region.visibility == reg.Visibility.Visible) {
      this.openCodeBlock();
      region.close(this.currBlock);
    } else {
      this.openCodeBlock();
      region.close(this.currBlock);
      if (region.visibility == reg.Visibility.Collapsed)
        this.appendMarkdown("\n</details>\n");
      else this.appendMarkdown("\n-->\n");
    }
  }
}
