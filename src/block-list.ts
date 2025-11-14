/**
 * # Source Blocks
 *
 * Source files are split into blocks that contain either documentation or code
 * fragments. This module defines the data structure that stores these blocks.
 * The type of the block is defined as an enumeration.
 */
export enum BlockKind {
  markdown,
  code,
  regionRef,
}
/**
 * We add a header and a footer to the code blocks when they are complete. The
 * header and footer used in HTML output is defined below.
 */
export const htmlHeader =
  '\n<pre class="syntaxhighlight narrow-scrollbars"><code>';
export const htmlFooter = "\n</code></pre>\n";
/**
 * The blocks are stored in [singly linked lists][] which implements the
 * [Iterable interface][]. The nodes of the list contain the kind specifier,
 * contents string (which is initialized after the block is ready), and
 * reference to the next block.
 *
 * [singly linked lists]: https://en.wikipedia.org/wiki/Linked_list
 * [Iterable interface]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */
export class BlockList implements Iterable<BlockList> {
  public readonly kind: BlockKind;
  public contents: string;
  public next: BlockList;
  /**
   * To speed up the construction of the contents string, we build it from
   * smaller substring which are stored in the `builder` array.
   */
  private builder: string[];
  /**
   * The designator of the programming language comes in as a parameter. It
   * is needed in markdown output and only for a code block. For a markdown
   * block the value can be `null`.
   */
  private language: string;
  /**
   * ## Construction and Copying
   *
   * Constructor initializes only the `kind` field. The reference to next block
   * is set later. For now it is initialized to `null`.
   */
  constructor(kind: BlockKind, language: string) {
    this.kind = kind;
    this.next = null;
    this.language = language;
  }
  /**
   * Copying a block takes `kind` and `language` from the source block and
   * uses the `contents` given as parameter.
   */
  static copy(block: BlockList, contents: string): BlockList {
    let res = new BlockList(block.kind, block.language);
    res.contents = contents;
    return res;
  }
  /**
   * ## Appending Text
   *
   * `builder` array is used to construct the contents in a piecewise manner.
   * The `append` method pushes text at the end of the array. We reserve the
   * first item in the array to the header string, so it is left empty.
   */
  append(text: string) {
    if (!this.builder) this.builder = [""];
    this.builder.push(text);
  }
  /**
   * ## Closing a Block
   *
   * When a block is closed, the text fragments in the `builder` array are
   * concatenated to the `contents` string . If the `contents` is already set
   * or `builder` is empty, we do nothing. Otherwise we trim whitespace from
   * the beginning and end of the block, add the correct header and footer,
   * and finally join the strings together.
   */
  close() {
    if (this.contents || !this.builder) return;
    if (this.kind === BlockKind.code) {
      if (!this.trim()) {
        this.contents = "";
        this.builder = null;
        return;
      }
      if (this.language) {
        this.builder[0] = `\n\`\`\`${this.language}\n`;
        this.builder.push("\n```\n");
      } else {
        this.builder[0] = htmlHeader;
        this.builder.push(htmlFooter);
      }
    }
    this.contents = this.builder.join("");
    this.builder = null;
  }
  /**
   * ## Trimming Code Blocks
   *
   * Blank lines are removed from the beginning and end of the code blocks to
   * keep the documentation tidy. Trimming is easier to do before the fragments
   * in the `builder` array are flattened to the `contents` string.
   *
   * We must be careful, thought, to preserve the indentation of the first
   * non-blank line. Therefore we use a regex to check whether a line is
   * blank before trimming it. Trimming at the end is easier, since we don't
   * care about the whitespace after the last visible character.
   *
   * The function returns `true`, if any text remains after trimming. Otherwise
   * it concludes that the block is empty and returns `false`.
   */
  private trim() {
    function trimStart(builder: string[]): boolean {
      for (let i = 1; i < builder.length; ++i)
        if (builder[i]) {
          let trimmed = builder[i].replace(/^[\t ]*[\r\n]+/g, "");
          if (builder[i] == trimmed) return true;
          builder[i] = trimmed;
        }
      return false;
    }
    function trimEnd(builder: string[]): boolean {
      for (let i = builder.length - 1; i > 0; --i) {
        let trimmed = builder[i].trim();
        if (trimmed != "") return true;
        builder[i] = trimmed;
      }
      return false;
    }
    let start = trimStart(this.builder);
    let end = trimEnd(this.builder);
    return start || end;
  }
  /**
   * ## Implementing Iterable
   *
   * The implementation of the Iterable interface is trivial using a generator.
   */
  *[Symbol.iterator](): Iterator<BlockList> {
    for (let b: BlockList = this; b; b = b.next) yield b;
  }
}
