/** 
 * # Main Program
 * 
 * The main module contains the high-level entry points to the project and 
 * exports the public functions and interfaces. 
 * 
 * ## Imports
 * 
 * First we need to import TypeScript compiler API. It is used to parse and type-check
 * the TypeScript project we are working on.
 */
import * as ts from 'typescript'
/**
 * We need also `path.resolve` from Node libraries.
 */
import * as path from 'path'
/**
 * Then we need to import definitions for loading configuration data.
 */
import * as cfg from './config'
/**
 * Weavers that generate the documentation from source files.
 * We have two variants: one for Markdown and other for HTML output.
 */
import * as mw from './md-weaver'
import * as hw from './html-weaver'
/**
 * This module we need for logging errors to console.
 */
import * as log from './logging'
/**
 * ## Exports
 * 
 * We export configuration and visualizer APIs out from the package.
 */
export * from './config'
export { finished } from './bundler'
/**
 * ## Running the Tool
 * 
 * The `run` function loads the `tsconfig.json` file with the TypeScript 
 * API, and starts the compiler in the desired mode. Note that the function
 * assumes that configuration is already loaded/initialized when it's called.
 */
export function run() {
    /**
     * First we create the correct weaver based on the configuration.
     */
    let opts = cfg.getOptions()
    let weaver = opts.outputFormat === 'markdown' ?
        new mw.MarkdownWeaver() :
        new hw.HtmlWeaver()
    /**
     * TypeScript compiler can locate the `tsconfig.json` file for us. If it is
     * not found, we will throw an error and abort.
     */
    let configPath = ts.findConfigFile(opts.baseDir, ts.sys.fileExists,
        cfg.tsconfig)
    if (!configPath)
        throw Error(`Could not find '${cfg.tsconfig}'.`)
    let configFile = ts.readConfigFile(configPath, ts.sys.readFile)
    if (configFile.error)
        throw Error(`Error parsing '${cfg.tsconfig}': ${configFile.error}`)
    /**
     * We need a `ParseConfigHost` object, which is an abstraction layer over 
     * the file system to load and parse the tsconfig file.
     */
    const parseConfigHost: ts.ParseConfigHost = {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
        useCaseSensitiveFileNames: true
    }
    let cl = ts.parseJsonConfigFileContent(configFile.config, parseConfigHost,
        path.resolve(opts.baseDir))
    cfg.setCompilerOptions(cl.options)
    if (opts.watch) {
        /**
         * When we are in watch mode, we create the watch compiler host, 
         * which automatically wakes up when source files are changed and
         * calls the weaver to regenerate them.
         */
        let host = ts.createWatchCompilerHost(configPath, {}, ts.sys,
            ts.createSemanticDiagnosticsBuilderProgram, log.reportDiagnostic,
            log.reportWatchStatusChanged)
        let origPostProgramCreate = host.afterProgramCreate
        host.afterProgramCreate = program => {
            weaver.programChanged(program)
            origPostProgramCreate(program)
        }
        /**
         * Weaver monitors markdown files and recreates the documentation
         * when they change.
         */
        ts.createWatchProgram(host)
        weaver.watchOtherFiles(host)
    }
    else {
        /**
         * Opening a project in normal mode involves creating a `Program` 
         * object and checking if the compilation gave any errors. We 
         * generate the documentation once for the whole project and exit.
         */
        let prg = ts.createProgram(cl.fileNames, cl.options)
        for (let diag of ts.getPreEmitDiagnostics(prg))
            log.reportDiagnostic(diag)
        weaver.generateDocumentation(prg)
    }
}
/**
 * ## Command Line Entry Point
 * 
 * The main program starts by reading LiTScript options from the 
 * `litsconfig.json` file and parsing the command line arguments. If any
 * errors occur during those operations, they are shown on the console, and 
 * processing is aborted. Then the document generation process is kicked off
 * by calling the `run` function.
 */

//#region Main program
export async function main(args: string[]) {
    try {
        await cfg.readOptionsFromFile()
        cfg.parseCommandLine(args, cfg.getOptions())
    }
    catch (e) {
        log.error(e instanceof Error ? e.message : e)
        if (e instanceof cfg.CommandLineError) {
            console.log("USAGE: lits <options>\n\nOPTIONS:")
            cfg.printCommandLineOptions(cfg.getOptions())
        }
        process.exit()
    }
    run()
}
//#endregion