/**
 * # Embedding Regions of Code in Markdown
 *
 * Regions are snippets of code surrounded by `#region` and `#endregion`
 * directives. Regions are not natively supported by TypeScript but for example
 * VSCode recognizes them and allow folding them. You need to put the directives
 * inside single line comments, though, for TypeScript compiler to ignore them.
 * ```ts
 * //#region [-h|-c] <name>
 * ... some code here ...
 * //#endregion
 * ```
 * To attach a region elsewhere in the documentation you need to give it a name.
 * After that you can insert the region anywhere in your markdown using the
 * following syntax. Don't put any other text on the same line.
 *
 * <pre><code>&lt;&lt;r:name&gt;&gt;</code></pre>
 *
 * Note that the name may contain spaces and tabs. So, you can use descriptive
 * names that tell clearly what a regions does. As an example, the following
 * import statements are embedded in a region. With the `-c` option they appear
 * collapsed when outputted to HTML.
 */
//#region -c regions imports
import * as path from "path";
import * as bl from "./block-list";
//#endregion
/**
 * We are storing all the regions in a dictionary, so their names must be
 * unique. It is possible to omit the name completely, but in that case the
 * region is not stored in the dictionary at all.
 */
interface RegionMap {
  [name: string]: Region;
}
/**
 * Why would you define a region without a name? You might want to hide
 * parts of the code in the documentation. This is possible by specifying an
 * additional flag which controls how region _definitions_ appear in the
 * documentation. If you _call_ or _expand_ a region in markdown using the
 * `<<r:...>>` syntax, the region will of course be visible.
 *
 * The enumeration below lists the possible ways how a region definition is
 * presented in the HTML output.
 */
export enum Visibility {
  Visible,
  Hidden,
  Collapsed,
}
/**
 *  * The default state (if you don't specify any flags) is `Visible`.
 *  * If you specify a `-h` flag after the `#region` directive, the definition
 *    will be removed from the output. This corresponds to the `Hidden` state.
 *  * If you specify a `-c` flag, the definition will be collapsed as above.
 *    The enumeration is set to `Collapsed` then.
 *
 * ## Region Class
 *
 * An instance of the following class is created for each region encountered in
 * the code. The properties of the class specify region's name, the file it was
 * defined, and its visibility.
 */
export class Region {
  readonly name: string;
  readonly definedInFile: string;
  readonly relOutputDir: string;
  readonly visibility: Visibility;
  /**
   * We also need to store markers designating where the region starts and
   * ends. We use [blocks](block-list.html) for that. [TsTranslator][]
   * class will ensure that a region aligns with block boundaries.
   *
   * [TsTranslator]: translators/ts-translator.html
   */
  private start: bl.BlockList;
  private end: bl.BlockList;
  /**
   * The dictionary of all defined regions is stored in a static member.
   */
  private static regions: RegionMap = {};
  /**
   * ### Creating a Region
   *
   * The constructor just initializes all the properties. When a region is
   * created it is effectively in "open" state. The missing value in the
   * `end` property signifies that.
   */
  constructor(
    name: string,
    start: bl.BlockList,
    definedInFile: string,
    relOutputFile: string,
    visibility: Visibility
  ) {
    this.name = name;
    this.start = start;
    this.end = null;
    this.definedInFile = definedInFile;
    this.relOutputDir = path.dirname(relOutputFile);
    this.visibility = visibility;
  }
  /**
   * ### Closing a Region
   *
   * Closing a region sets the last block, after which the regions is ready
   * for use. If the region already has an end block (from a previous pass),
   * this updates it.
   */
  close(end: bl.BlockList) {
    this.updateEnd(end);
  }
  /**
   * ### Adding a region
   *
   * Instead of calling the constructor directly, the users of the class call
   * the static `add` method to open a new region and to add it in the
   * dictionary. The method makes sure that the region name is unique.
   */
  static add(
    name: string,
    start: bl.BlockList,
    definedInFile: string,
    relOutputFile: string,
    mode: Visibility
  ): Region {
    let region = this.regions[name];
    if (region) {
      // Region already exists (from scanning phase), update the blocks
      region.updateStart(start);
      return region;
    }
    region = new Region(name, start, definedInFile, relOutputFile, mode);
    if (name) this.regions[name] = region;
    return region;
  }
  /**
   * ### Updating Region Blocks
   *
   * During the scanning phase, placeholder blocks are used. These methods
   * allow updating the region with the actual blocks during processing.
   */
  updateStart(start: bl.BlockList) {
    this.start = start;
  }

  updateEnd(end: bl.BlockList) {
    this.end = end;
  }
  /**
   * ### Retrieving a Region
   *
   * Later on the users can request a region from the dictionary. If it is
   * not found we throw an error, which is probably cought only by the top
   * level exeption handler. So, specifying a wrong name will stop the
   * operation.
   */
  static get(name: string, usedInFile: string): Region {
    let region = this.regions[name];
    if (!region)
      throw Error(`Region <<${name}>> used in file '${usedInFile}' is not defined.
            Make sure that the name is correct and that the source file where it is 
            defined is included in the project.`);
    return region;
  }
  /**
   * ### Getting All Regions
   *
   * Returns the entire region dictionary for graph building.
   */
  static getAllRegions(): RegionMap {
    return this.regions;
  }
  /**
   * ### Accessors for Region Properties
   *
   * These getters allow external code to access region blocks and properties.
   */
  getStart(): bl.BlockList {
    return this.start;
  }

  getEnd(): bl.BlockList {
    return this.end;
  }

  getDefinedInFile(): string {
    return this.definedInFile;
  }

  getRelOutputDir(): string {
    return this.relOutputDir;
  }
  /**
   * ### Expanding a Region
   *
   * When region is expanded we provide the blocks to be inserted in an
   * iterator. Relative links in the source blocks do not work when blocks
   * are expanded to a new host file. We need to fix them by prepending the
   * relative path from the host directory to the target directory of the
   * source file.
   */
  private hrefRE = /href="([^\/][^:."]*\.html?(#[0-9]*)?)"/gi;

  *expand(relHostPath: string): Iterable<bl.BlockList> {
    let relHostDir = path.dirname(relHostPath);
    let redir = path.relative(relHostDir, this.relOutputDir);
    for (let b = this.start; b && b !== this.end; b = b.next) {
      yield bl.BlockList.copy(
        b,
        b.contents.replace(this.hrefRE, `href="${redir}/$1"`)
      );
    }
  }
  /**
   * ### Clearing Regions
   *
   * In watch mode regions will be created again when the same file will be
   * reprocessed. To prevent duplicate regions to be added in the dictionary,
   * we provide a method to remove all the regions defined in a specified
   * file. If no file is given, we clear the whole dictionary.
   */
  static clear(definedInFile?: string) {
    if (!definedInFile) this.regions = {};
    else
      Object.values(this.regions)
        .filter((m) => m?.definedInFile == definedInFile)
        .forEach((m) => (this.regions[m.name] = undefined), this);
  }
}
