/**
 * # Configuration
 * 
 * LiTScript shares configuration with the TypeScript compiler wherever possible.
 * It needs, however, some additional settings to control what files are included in 
 * the documentation, what format is outputted, and such.
 * 
 * These settings can be defined in a configuration file called `litsconfig.json`
 * which resides in the project root folder along with the standard `tsconfig.json`
 * file. The same settings can also be specified as the command line switches. The
 * name of a switch is the same as the corresponding property in the JSON file.
 * 
 * An example command line could look like this (each settings is described in the
 * [Options](#options) section):
 * ``` dos
 * lits --baseDir . --outDir temp  --updateToc
 * ```
 * If a setting is not defined in the configuration or on command line, default values 
 * are in effect. These are defined in the [Defaults](#defaults) section. The order of 
 * precedence is:
 * 
 *  1. Command line
 *  2. `litsconfig.json` file
 *  3. Default value
 */

//#region -c
import * as fs from 'fs'
import * as ts from 'typescript'
import * as path from 'path'
import * as fm from './templates/front-matter'
//#endregion

/**
 * ## Configuration files
 * 
 * The names of the configuration files are exported constants.
 */
export const tsconfig = "tsconfig.json"
export const litsconfig = "litsconfig.json"
/**
 * ## Options
 * 
 * The available settings are defined in the `Options` interface. Options 
 * specified in JSON and command line are case-insensitive. Keys are converted 
 * to lowercase before comparing them.
 */
export interface Options {
    /**
     * ### Base Directory
     * 
     * This setting specifies the project root folder. LiTScript expects to find
     * the [configuration files](#configuration-files) there.
     */
    baseDir: string
    /**
     * ### Output Directory
     * 
     * This property points to the directory where the output files are placed. A 
     * typical value for this is the `docs/` folder under the base directory. From 
     * that directory the documentation files can be easily published to 
     * [GitHub Pages][] if the repository is hosted there.
     */
    outDir: string
    /**
     * ### Output Format
     * 
     * The output format is either `markdown` or `html`. If markdown output is chosen
     * the settings in the front matter are not used.
     */
    outputFormat: 'markdown' | 'html'
    /**
     * ### Included Files
     * 
     * The included TypeScript files are defined in the `tsconfig.json` file, 
     * so these don't have to be specified again. Files of other types that you 
     * want to include have to specified explicitly. The property below contains 
     * a list of [glob][] wildcard patterns that are relative to the `baseDir`. 
     * As an example, to include all files with the `.md` extension under 
     * directory `instructions/`, add pattern `instructions/**.md` to the list. 
     * The double asterisk wild card will find all the files, no matter how 
     * deep they are in the directory tree.
     */
    files: string[]
    /**
     * ### Excluded Files
     * 
     * Sometimes you want to omit some files from the documentation. You may want to
     * skip TypeScript files that don't contain any comments, for example. To allow this,
     * it is possible to specify a list of glob patterns for files to be excluded. This 
     * list is checked after all the included files have been identified. Note that all 
     * the TypeScript files in the project are always compiled, only the documentation 
     * output is skipped. You can exclude markdown files as well with this setting, 
     * although it is generally simpler to use the `files` setting for that purpose.
     */
    exclude: string[]
    /**
     * ### Silent Mode
     * 
     * Set the following flag to suppress console output during operation.
     */
    silent: boolean
    /**
     * ### TOC File
     * 
     * The name of the table of contents a.k.a. _TOC_ file is specified in the following
     * field. The TOC file has to be placed in the `outDir` folder as the paths defined 
     * in it are relative to that directory.
     */
    tocFile: string
    /**
     * ### Automatic TOC Update
     * 
     * LiTScript can automatically add new pages in the TOC file, if it finds any.
     * To enable this functionality, set the `updateToc` property to `true`. If you
     * want to omit some files from TOC, you can add a glob pattern matching those
     * files to the `excludeFromToc` array.
     */
    updateToc: boolean
    excludeFromToc: string[]
    /**
     * ### Dependency Graph
     * 
     * LiTScript can also create dependency graph that outlines the module 
     * dependency hierarchy and save it in a JSON file. The name of the file
     * is defined below. If undefined, the file is not produced.
     */
    dependencyGraph: string
    /**
     * ### Bundle
     * 
     * If you want to skip the [bundling](bundler.html) phase for HTML output, 
     * unset the following flag.
     */
    bundle: boolean
    /**
     * ### Watch Mode
     * 
     * In watch mode LiTScript compiler runs in background and automatically 
     * regenerates documentation for changed files.
     */
    watch: boolean
    /**
     * ### Serve Mode
     * 
     * LiTScript also contains a development web server now (through esbuild).
     * When the `serve` setting is on, a web server for the HTML pages is 
     * started. Note that the watch mode automatically turned on the when serve 
     * mode is on.
     * 
     * You can customize the network options by changing the `serveOptions`
     * object (defined below).
     */
    serve: boolean
    serveOptions: ServeOptions
    /**
     * ### Deployment Mode
     * 
     * The deployment mode controls whether debugging information needed for 
     * development is included with the generated JavaScript files.
     */
    deployMode: 'dev' | 'prod'
    /**
    * ### Front Matter
     * 
     * Front matter is a template-specific configuration object that is defined
     * in the template package. Front matter is settings for the default
     * template can be found [here][].
     */
    frontMatter: fm.FrontMatter
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
    host: string
    /**
     * Port number listened. If omitted, port 8000 is used.
     */
    port?: number
    /**
     * The key file used for HTTPS connections. Both `keyFile` and `certFile`
     * settings need to be defined to enable HTTPS protocol. See 
     * [esbuild documentation][] documentation for more information.
     */
    keyFile?: string
    /**
     * The certificate file used for HTTPS. See above.
     */
    certFile?: string
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
 * The following global variable contains the settings currently in effect.
 */
var options: Options
/**
 * The default values defined below it are used, if a setting is not overridden
 * in the configuration file or on the command line.
 */
export const defaults: Options = {
    baseDir: ".",
    outDir: "./docs",
    outputFormat: 'html',
    files: ["**.md"],
    exclude: [ ".git", "node_modules" ],
    silent: false,
    tocFile: "toc.json",
    updateToc: false,
    excludeFromToc: [],
    dependencyGraph: "dependencies.json",
    bundle: true,
    watch: false,
    serve: false,
    serveOptions: {
        host: "127.0.0.1"
    },
    deployMode: 'dev',
    frontMatter: fm.defaults
}
/**
 * We provide a getter to see the effective settings from outside the module.
 */
export function getOptions(): Options {
    return options
}
/**
 * The following function returns the path to the given file relative to the 
 * base directory.  
 */
export function getBaseRelativePath(filePath: string) {
    return path.relative(path.resolve(options.baseDir), filePath)
}
/**
 * ## Setting Options
 * 
 * To set the options directly from outside the module, we provide this
 * helper function. Note that we use the Partial<T> utility type to make all
 * properties optional, and merge the default values to them. After setting
 * the options, we load the template.
 */
export function setOptions(opts: Partial<Options>) {
    options = opts as Options
    mergeOptions(defaults, options)
}
/**
 * ### Reading Configuration File
 * 
 * The configuration file is read from JSON file into the global `options` 
 * object. After that default values are merged to the object. Lastly,
 * we load the template.
 */
export function readOptionsFromFile(baseDir: string = "./") {
    let litsfile = path.resolve(baseDir, litsconfig)
    if (!fs.existsSync(litsfile))
        options = defaults
    else {
        let cont = fs.readFileSync(litsfile, 'utf8')
        options = JSON.parse(cont)
        mergeOptions(defaults, options)
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
            let val = source[key]
            if (target.hasOwnProperty(key)) {
                let valType = typeof val
                if (typeof target[key] !== valType)
                    throw new SyntaxError(
                        `Invalid value for option "${key}". Expected ${valType}.`)
                if (valType === 'object' && !(val instanceof Array))
                    mergeOptions(val, target[key])
            }
            else {
                if (val === undefined)
                    throw new Error(`Mandatory option "${key}" missing.`)
                target[key] = val
            }
        }
}
/**
 * ## TypeScript Compiler Options
 * 
 * We store the compiler options read from `tsconfig.json` in a global variable.
 * This variable can be read and written using the functions below.
 */
var compilerOptions: ts.CompilerOptions

export function getCompilerOptions(): ts.CompilerOptions {
    return compilerOptions
}

export function setCompilerOptions(opts: ts.CompilerOptions) {
    compilerOptions = opts
}
/**
 * ## Command Line Parsing
 * 
 * The following function finds the field in the `options` object that corresponds
 * to the specified command line switch. The search is case-insensitive. If no match
 * is found, a `CommandLineError` exception is thrown.
 */
function getOptionKey(option: string, optObj: object): string {
    for (const key in optObj)
        if (optObj.hasOwnProperty(key) &&
            key.toLowerCase() === option.toLowerCase())
            return key
    throw new CommandLineError("Unknown option: --" + option)
}
/**
 * Command line parsing is done generically using the `options` object as the 
 * schema. Command line switches have the same names as the fields of the object. 
 * Depending on the type of the field the parsing works a bit differently. 
 * Strings are inputted as-is, booleans don't need an argument at all, and other
 * types are read in as JSON.
 */
export function parseCommandLine(args: string[], optObj: object) {
    let i = 0
    while (i < args.length) {
        let opt = args[i++]
        if (opt[0] != '-' || opt[1] != '-')
            throw new CommandLineError("Invalid command line argument: " + opt)
        let key = getOptionKey(opt.slice(2), optObj)
        let optype = typeof optObj[key]
        if (optype === 'boolean')
            optObj[key] = true
        else if (i == args.length)
            throw new CommandLineError("Value missing for option " + opt)
        else {
            let value = args[i++]
            optObj[key] = optype === 'string' ? value : JSON.parse(value)
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
            console.log(`\t--${key} (default: ${JSON.stringify(optObj[key])})`)
}

/**
 * ### Command Line Errors
 * 
 * To distinguish command line errors from other types of errors, we define a
 * new class extending the `Error` class.
 */
export class CommandLineError extends Error {
    constructor(message: string) {
        super(message)
    }
}
