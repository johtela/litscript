/**
 * # Configuration
 *
 * LiTScript shares configuration with the TypeScript compiler wherever possible.
 * Additionally, it needs some settings to control what files are included in
 * the documentation, what format is outputted, and so on.
 *
 * These settings are defined in a configuration file called `litsconfig.json`
 * which resides in the project root folder along with the usual `tsconfig.json`
 * file. The same settings can also be specified as command line switches. These
 * switches have the same names as the corresponding properties in the JSON file.
 *
 * An example command line could look like this (each settings is described in
 * the [Options](#options) section):
 * ```powershell
 * lits --baseDir . --outDir temp  --updateToc
 * ```
 * If a setting is not defined in the configuration or on command line, the
 * default value takes effect. These are defined in the [Defaults](#defaults)
 * section. The precedence order for settings is thus:
 *
 *  1. Command line
 *  2. `litsconfig.json` file
 *  3. Default value
 */

//#region -c
import * as fs from "fs";
import * as ts from "typescript";
import * as path from "path";
import * as fm from "./templates/front-matter";
//#endregion

/**
 * ## Configuration files
 *
 * The names of the configuration files are constants.
 */
export const tsconfig = "tsconfig.json";
export const litsconfig = "litsconfig.json";
/**
 * ## Node.js Outputs
 *
 * LiTScript can build JS bundles to be run in the browser or by Node.js.
 * Root modules for web bundles are declared in the front matter. Node.js root
 * modules are defined in the Options interface using the following interface.
 */
export interface NodeModule {
  /**
   * Path to the root module.
   */
  path: string;
  /**
   * Output directory for the bundle.
   */
  outDir: string;
  /**
   * ### Backend Modules
   *
   * Backend modules are loaded by the LiTScript development server or by the
   * included node.js web server when application is deployed.
   */
  backend?: boolean;
  /**
   * You can define a list of external dependencies which bundler will skip.
   */
  external?: string[];
}
/**
 * ## Deploy Mode
 *
 * Type of the deployment: development or production build.
 */
export type DeployMode = "dev" | "prod";
/**
 * ## Options
 *
 * The available settings are defined in the `Options` interface. Options
 * are case-insensitive both in JSON and command line. Keys are converted to
 * lowercase before comparing them.
 */
export interface Options {
  /**
   * ### Base Directory
   *
   * We refer to the project root folder shortly as base directory. LiTScript
   * expects to find the [configuration files](#configuration-files) there.
   */
  baseDir: string;
  /**
   * ### Output Directory
   *
   * The output directory is stored in the `outDir` property. A typical value
   * for this is the `docs/` folder under the base directory. From there the
   * documentation files can be easily published to [GitHub Pages][].
   */
  outDir: string;
  /**
   * ### Output Format
   *
   * The output format is either `markdown` or `html`. If markdown output is
   * chosen the settings in the front matter are not used.
   */
  outputFormat: "markdown" | "html";
  /**
   * ### Included Files
   *
   * The processed TypeScript files are defined in `tsconfig.json`,  so they
   * need not to be specified here. Other types of input files you need to add
   * to the `files` property. It contains a list of [glob][] patterns that are
   * relative to the base directory.
   *
   * As an example, to include all files with the `.md` extension under
   * directory `instructions/`, add pattern `instructions/**.md` to the list.
   * The double asterisk wild card will find all the files, no matter how
   * deep they are in the directory tree.
   */
  files: string[];
  /**
   * ### Excluded Files
   *
   * Sometimes you want to omit some files from the documentation. For
   * example, you may want to skip TypeScript files that don't contain
   * documentation. To achieve this you can list files to be excluded in the
   * `exclude` array as glob patterns. This array is checked after the input
   * files have been collected.
   *
   * Note that all the TypeScript files in the project are compiled, only the
   * documentation output is skipped. You can put other types of files in the
   * exclude list, but usually it is simpler just to omit them from the
   * `files` array.
   */
  exclude: string[];
  /**
   * ### Silent Mode
   *
   * Set the following flag to suppress output of status messages.
   */
  silent: boolean;
  /**
   * ### TOC File
   *
   * The name of the table of contents a.k.a. _TOC_ file is specified in the
   * `tocFile` property. TOC file has to be placed in the `outDir` folder as
   * the paths defined in it are relative to that directory.
   */
  tocFile: string;
  /**
   * ### Automatic TOC Update
   *
   * LiTScript can automatically add new pages to the TOC file. To enable
   * this, set the `updateToc` property to `true`. If you want to omit some
   * files from TOC, you can add glob patterns that match their names to the
   * `excludeFromToc` array.
   */
  updateToc: boolean;
  excludeFromToc: string[];
  /**
   * ### Dependency Graph
   *
   * LiTScript can also create module dependency graph and save it in a JSON
   * file. The name of the file is defined below. If undefined, the file is
   * not produced.
   */
  dependencyGraph: string;
  /**
   * ### Bundle
   *
   * If you want to skip the [bundling](bundler.html) phase for HTML output,
   * unset the following flag.
   */
  bundle: boolean;
  /**
   * ### Watch Mode
   *
   * In watch mode LiTScript compiler runs in background and automatically
   * regenerates documentation for changed files.
   */
  watch: boolean;
  /**
   * ### Show JSDoc Tags
   *
   * When set to `false`, JSDoc tag lines (like @param, @returns, @throws)
   * are filtered out from the prose output. This is useful for literate
   * programming where you want narrative documentation without API-style
   * tags cluttering the text.
   *
   * When set to `true`, all JSDoc content including tags is preserved in
   * the output. Use this when you want full JSDoc comments to appear as
   * documentation.
   *
   * Default: `false` (tags are hidden)
   */
  showJSDocTags: boolean;
  /**
   * ### Serve Mode
   *
   * LiTScript contains also a development web server that supports live
   * reloading of changed files. When the `serve` setting is on, the web
   * server is started. Note that the watch mode automatically turned on along
   * with the serve mode.
   *
   * You can customize the network options by changing the [`serveOptions`
   * object below](#serve-options).
   */
  serve: boolean;
  serveOptions: ServeOptions;
  /**
   * ### Node.js modules
   *
   * List of modules that are built to be run by Node.js.
   */
  nodeModules: NodeModule[];
  /**
   * ### Deployment Mode
   *
   * The deployment mode controls whether debugging information needed for
   * development is included with the generated JavaScript files.
   */
  deployMode: DeployMode;
  /**
   * ### Front Matter
   *
   * Front matter is a template-specific configuration object that is defined
   * in the template package. Front matter is settings for the default
   * template can be found [here][].
   */
  frontMatter: fm.FrontMatter;
}
/**
 * ### Serve Options
 *
 * The network options used in serve mode are defined below.
 */
export interface ServeOptions {
  /**
   * Host name or IP address. Typically `127.0.0.1` or `localhost`.
   */
  host: string;
  /**
   * Listened port number. If omitted, port 8000 is used.
   */
  port: number;
}
/**
 * [GitHub Pages]: https://pages.github.com/
 * [default template]: /lits-template
 * [glob]: https://github.com/isaacs/minimatch/blob/master/README.md
 * [here]: /lits-template/src/front-matter.html
 * [esbuild documentation]: https://esbuild.github.io/api/#https
 *
 * ## Current Options and Defaults
 *
 * The settings currently in effect can be read from this global variable.
 */
var options: Options;
/**
 * Default values defined below are used for the settings that are not
 * overridden in the configuration file or with the command line.
 */
export const defaults: Options = {
  baseDir: ".",
  outDir: "./docs",
  outputFormat: "html",
  files: ["**.md"],
  exclude: [".git", "node_modules"],
  silent: false,
  tocFile: "toc.json",
  updateToc: false,
  excludeFromToc: [],
  dependencyGraph: "dependencies.json",
  bundle: true,
  watch: false,
  showJSDocTags: false,
  serve: false,
  serveOptions: {
    host: "127.0.0.1",
    port: 8000,
  },
  nodeModules: [],
  deployMode: "dev",
  frontMatter: fm.defaults,
};
/**
 * Other modules can access the effective settings using the function below.
 */
export function getOptions(): Options {
  return options;
}
/**
 * The following function returns the path to the given file relative to the
 * base directory.
 */
export function getBaseRelativePath(filePath: string) {
  return path.relative(path.resolve(options.baseDir), filePath);
}
/**
 * ## Setting Options
 *
 * To set the options directly from outside the module, we provide this
 * helper function. Note that we use the Partial<T> utility type to make all
 * properties optional, and merge the default values to them.
 */
export function setOptions(opts: Partial<Options>) {
  options = opts as Options;
  mergeOptions(defaults, options);
}
/**
 * ### Reading Configuration File
 *
 * The configuration file is read from JSON file into the global `options`
 * object. After that, default values are merged to the object.
 */
export function readOptionsFromFile(baseDir: string = "./") {
  let litsfile = path.resolve(baseDir, litsconfig);
  if (!fs.existsSync(litsfile)) options = defaults;
  else {
    let cont = fs.readFileSync(litsfile, "utf8");
    options = JSON.parse(cont);
    mergeOptions(defaults, options);
  }
}
/**
 * ### Merging Configuration Objects
 *
 * The following function recursively merges object properties. It only sets
 * properties of the `target` object which are undefined. So, it does not
 * override any properties already set.
 */
export function mergeOptions(source: object, target: object) {
  for (const key in source)
    if (source.hasOwnProperty(key)) {
      let val = source[key];
      if (target.hasOwnProperty(key)) {
        let valType = typeof val;
        if (typeof target[key] !== valType)
          throw new SyntaxError(
            `Invalid value for option "${key}". Expected ${valType}.`
          );
        if (valType === "object" && !(val instanceof Array))
          mergeOptions(val, target[key]);
      } else {
        if (val === undefined)
          throw new Error(`Mandatory option "${key}" missing.`);
        target[key] = val;
      }
    }
}
/**
 * ## TypeScript Compiler Options
 *
 * We store the compiler options read from `tsconfig.json` in a global variable.
 * This variable can be read and written using the functions below.
 */
var compilerOptions: ts.CompilerOptions;

export function getCompilerOptions(): ts.CompilerOptions {
  return compilerOptions;
}

export function setCompilerOptions(opts: ts.CompilerOptions) {
  compilerOptions = opts;
}
/**
 * ## Command Line Parsing
 *
 * This helper function finds the field in the `options` object that corresponds
 * to the specified command line switch. The search is case-insensitive. If no
 * match is found, a `CommandLineError` exception is thrown.
 */
function getOptionKey(option: string, optObj: object): string {
  for (const key in optObj)
    if (
      optObj.hasOwnProperty(key) &&
      key.toLowerCase() === option.toLowerCase()
    )
      return key;
  throw new CommandLineError("Unknown option: --" + option);
}
/**
 * Command line parsing is done generically using the `options` object as the
 * schema. Command line switches have the same names as the fields of the object.
 * Depending on the type of the field the parsing works a bit differently.
 * Strings are inputted as-is, booleans don't need an argument at all, and other
 * types are read in as JSON.
 */
export function parseCommandLine(args: string[], optObj: object) {
  let i = 0;
  while (i < args.length) {
    let opt = args[i++];
    if (opt[0] != "-" || opt[1] != "-")
      throw new CommandLineError("Invalid command line argument: " + opt);
    let key = getOptionKey(opt.slice(2), optObj);
    let optype = typeof optObj[key];
    if (optype === "boolean") optObj[key] = true;
    else if (i == args.length)
      throw new CommandLineError("Value missing for option " + opt);
    else {
      let value = args[i++];
      optObj[key] = optype === "string" ? value : JSON.parse(value);
    }
  }
}
/**
 * Outputting command line options works also generically based on the options
 * object.
 */
export function printCommandLineOptions(optObj: object) {
  for (const key in optObj)
    if (optObj.hasOwnProperty(key))
      console.log(
        `--${key} \x1b[90m${JSON.stringify(optObj[key], undefined, 4)}\x1b[0m`
      );
}

/**
 * ### Command Line Errors
 *
 * To distinguish command line errors from other types of errors, we define a
 * new class extending the `Error` class.
 */
export class CommandLineError extends Error {
  constructor(message: string) {
    super(message);
  }
}
