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
import * as fs from 'fs'
import * as eb from 'esbuild'
import * as cfg from './config'
import * as log from './logging'
import * as srv from './server'
//#endregion
/**
 * ## Gathering Root Files
 * 
 * The set of root files for the bundle are maintained in a dictionary in the
 * [HtmlWeaver class](html-weaver.html). The dictionary is defined here.
 */
export interface EntryPoints {
    [name: string]: string
}
/**
 * ## Tracking Bundle Output
 * 
 * To see what files have changed during bundling we maintain a dictionary
 * of output files and timestamps when they were last saved.
 */
interface BundleOutputs {
    [name: string]: Date | undefined
}
var bundleOutputs: BundleOutputs = {}
/**
 * The following function is called when a bundle is finished. It checks which
 * output files have changed since the last run, and calls server to trigger
 * live reload of the files. 
 */
function reloadChanged(metaFile: eb.Metafile) {
    let changed: string[] = []
    let outDir = cfg.getOptions().outDir
    for (let file in metaFile.outputs) {
        if (path.extname(file) != ".map") {
            let modified = fs.statSync(file).mtime
            let lastModified = bundleOutputs[file]
            if (!lastModified || modified > lastModified) {
                bundleOutputs[file] = modified
                changed.push("/" + path.relative(outDir, file)
                    .replace("\\", "/"))
            }
        }
    } 
    if (changed.length > 0)
        srv.notifyChanges(changed)
}
/**
 * By default, esbuild watch mode does not notify the user when the bundle is 
 * ready. We need to define a plugin that hooks to the `onEnd` event and outputs 
 * info to the console.
 */
let readyPlugin: eb.Plugin = {
    name: "bundleReady",
    setup(build: eb.PluginBuild) {
        build.initialOptions.metafile = true
        build.onEnd(res => {
            reloadChanged(res.metafile)
            log.reportBuildResults(res)
        })
    }
}
/**
 * ## Esbuild Configuration
 * 
 * The esbuild configuration is returned by the function below.
 */
function buildOptions(opts: cfg.Options, entries: EntryPoints): eb.BuildOptions {
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
        minify: opts.deployMode == 'prod',
        /**
         * Setup the ready plugin.
         */
        plugins: [ readyPlugin ],
        /**
         * Source map enabled for dev builds
         */
        sourcemap: opts.deployMode == 'dev'
    }
}
/**
 * ## Bundling Files
 * 
 * The bundling function is straightforward. We initialize the configuration 
 * passing the configuration and code files to the function above. Depending on 
 * whether we are in watch mode we call eiher `watch` or `build`. The former runs 
 * forever in the background monitoring the input files. It reruns automatically 
 * whenever any file in the dependency graph changes. The latter runs only one 
 * time. 
 */
var done = false

export async function bundle(entries: EntryPoints) {
    let opts = cfg.getOptions()
    done = false
    try {
        log.info(log.Colors.Cyan + "Bundling...")
        let buildOpts = buildOptions(opts, entries)
        if (opts.watch || opts.serve) {
            let ctx = await eb.context(buildOpts)
            await ctx.watch()
            if (opts.serve)
                srv.start(opts)
        }
        else {
            let result = await eb.build(buildOptions(opts, entries))
            log.reportBuildResults(result)
        }
        done = true
    }
    catch (e) {
        log.error(e)            
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
