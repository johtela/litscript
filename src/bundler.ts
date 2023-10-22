/**
 * # Bundling JS and CSS Files
 * 
 * HTML files need auxiliary JavaScript and style files to function properly. 
 * The template package provides these files but does not deploy them. There 
 * might be dozens of CSS and JS files needed by various elements in a page.
 * To make the deployment simpler we use [esbuild][] to bundle the files.
 * 
 * Bundling takes a root file, typically a JS or TS file, finds all the 
 * dependencies of the root file no matter how deep they are, and packs them
 * to output file(s). There will be a bundled JS file for each root file.
 * If you have CSS or files in your dependency graph, those will be combined to 
 * a single CSS file.
 * 
 * The goal is to have fewer JS and CSS files to deploy, thus making the 
 * page loading times faster. To learn more about Webpack operation refer to
 * the excellent documentation on its [home page][esbuild]. 
 * 
 * [esbuild]: https://esbuild.github.io/
 */
//#region -c bundler imports
import * as path from 'path'
import * as eb from 'esbuild'
import * as cfg from './config'
import * as log from './logging'
import { time } from 'console'
//#endregion
/**
 * ## Gathering Root Files
 * 
 * The set of root files for the bundle are maintained in a dictionary in the
 * [HtmlWeaver class](html-weaver.html). The dictionary is defined here.
 */
export interface CodeFiles {
    [name: string]: string
}
/**
 * ## Webpack Configuration
 * 
 * The static part of the Webpack configuration is defined in the constant 
 * object below.
 */
function buildOptions(opts: cfg.Options, entries: CodeFiles): eb.BuildOptions {
    return {
        bundle: true,
        entryPoints: entries,
        /**
         * The resolve setting specifies which extensions are appended to import
         * statements when dependencies are resolved and in which order.
         */
        resolveExtensions: ['.ts', '.js', '.css'],
        /**
         * The output setting specifies where the packed JS file will be saved. 
         * We put them into `dist/` subfolder in the output directory. The name 
         * of the output file is copied from the root file.
         */
        outdir: path.resolve(opts.outDir, "dist"),
        /**
         * Optimization settings instruct the bundler to minimize generated JS 
         * and CSS. JS minimizer is included with Webpack, but for CSS 
         * minimization we need additional plugin.
         */
        minify: opts.deployMode == 'prod'
    }
}
/**
 * ## Bundling Files
 * 
 * Webpack runs asynchronously, it returns before it has done the bunding. We
 * provide a callback function which Webpack calls when it has completed. The
 * callback will set the `done` flag, so we can wait for the completion.
 */
var done = false
/**
 * The bundling function is straightforward. We initialize the configuration 
 * and create the Webpack compiler passing it the configuration. Depending on 
 * whether we are in watch mode we call eiher `watch` or `run`. The former runs 
 * forever in the background monitoring the input files. It reruns automatically 
 * whenever any file in the dependency graph changes. The latter runs only one 
 * time. 
 */
export async function bundle(codeFiles: CodeFiles) {
    let opts = cfg.getOptions()
    done = false
    log.info(log.Colors.Cyan + "Bundling...")
    let buildOpts = buildOptions(opts, codeFiles)
    if (opts.watch) {
        let ctx = await eb.context(buildOpts)
        ctx.watch()
    }
    else {
        let result = await eb.build(buildOptions(opts, codeFiles))
        log.reportBuildResults(result)
    }
}
/**
 * To be able to wait the bundle completion, we export a function that polls 
 * the `done` flag once per second. 
 */
export async function finished() {
    while (!done)
        await new Promise(resolve => setTimeout(resolve, 1000))
}
