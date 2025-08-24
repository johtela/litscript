/**
 * # Bundling JS and CSS Files
 * 
 * Starting with version 2 LiTScript uses now [esbuild][] as the bundler. 
 * esbuild supports bundling TS and CSS modules out-of-the-box. No additional
 * plug-ins or dependencies are needed.
 * 
 * Bundling takes a root module; a JS or TS file, finds all its dependencies, 
 * and packs them to a single output file. There will be a bundled JS file for 
 * each root module. If there are style files in the dependency graph, they will 
 * be bundled to a CSS file with the same base name as the JS file.
 * 
 * The goal is to have fewer JS and CSS files to deploy, making the page loading 
 * times faster. To learn more about esbuild refer to the documentation on its 
 * [home page][esbuild]. 
 * 
 * [esbuild]: https://esbuild.github.io/
 */
//#region -c bundler imports
import * as path from 'path'
import * as fs from 'fs'
import { gzip } from 'node:zlib'
import * as eb from 'esbuild'
import * as cfg from './config'
import * as log from './logging'
import * as srv from './server'
import * as bak from './backend'
//#endregion
/**
 * ## Gathering Root Files
 * 
 * The set of root files for the bundle are maintained in a dictionary in the
 * [HtmlWeaver class](html-weaver.html). The dictionary is defined here. Its
 * keys are bundle base names and values are paths to root modules.
 */
export interface EntryPoints {
    [name: string]: string
}
/**
 * Add new entry to the bundled roots. If there is already an entry with
 * the same name (but with different file), add a running number after
 * the name and return it.
 */
export function addEntry(entries: EntryPoints, name: string, file: string) {
    if (!Object.values(entries).includes(file)) {
        if (entries[name]) {
            let i = 1
            while (entries[name + i]) i++
            name = name + i
        }
        entries[name] = file
    }
    return name
}
/**
 * ## Tracking Bundle Outputs
 * 
 * To see what files have changed during bundling we maintain a dictionary
 * of output files and timestamps when they were last saved.
 */
interface BundleOutputs {
    [name: string]: Date | undefined
}
var bundleOutputs: BundleOutputs = {}
/**
 * This helper function determines, if the given bundle output is a client side 
 * bundled JS file. Map files and the backend bundle are excluded when 
 * processing results.
 */
function isClientBundle(file: string) {
    return path.extname(file) != ".map"
}
/**
 * The following function is called when a bundle is finished. It checks which
 * output files have changed since the last run, and calls server to trigger
 * live reload of the files. 
 */
function reloadChanged(metaFile: eb.Metafile) {
    let opts = cfg.getOptions()
    if (opts.serve) {
        let changed: string[] = []
        for (let file in metaFile.outputs) {
            if (isClientBundle(file)) {
                let modified = fs.statSync(file).mtime
                let lastModified = bundleOutputs[file]
                if (!lastModified || modified > lastModified) {
                    bundleOutputs[file] = modified
                    changed.push("/" + path.relative(opts.outDir, file)
                        .replace("\\", "/"))
                }
            }
        } 
        if (changed.length > 0)
            srv.notifyChanges(changed)
    }
}
/**
 * If we ar bundling in the production mode, we also gzip the outputted CSS and
 * JS files. We use node.js library for compressing the files. If the gzipping
 * fails, we report the error.
 */
function compressResult(metaFile: eb.Metafile) {
    let opts = cfg.getOptions()
    if (opts.deployMode == 'prod')
        for (let file in metaFile.outputs)
            if (isClientBundle(file)) {
                let content = fs.readFileSync(file, 'utf8')
                gzip(content, (error, result) => {
                    if (error)
                        log.error(error)
                    else
                        fs.writeFileSync(file + '.gz', result)
                })
            }
}
/**
 * By default, esbuild watch mode does not notify the user when the bundle is 
 * ready. We need to define a plugin that hooks to the `onEnd` event and outputs 
 * info to the console.
 */
let webPlugin: eb.Plugin = {
    name: "bundleReady",
    setup(build: eb.PluginBuild) {
        build.initialOptions.metafile = true
        build.onEnd(res => {
            if (res.metafile) {
                reloadChanged(res.metafile)
                compressResult(res.metafile)
            }
            log.reportBuildResults(res, "Web")
        })
    }
}
/**
 * ## Esbuild Web Configuration
 * 
 * The esbuild configuration for web modules is constructed below.
 */
function webBuildOptions(opts: cfg.Options, entries: EntryPoints): 
    eb.BuildOptions {
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
         * Define raw loaders for file types unsupported by esbuild.
         */
        loader: {
            ".ttf": "copy",
            ".otf": "copy"
        },
        /**
         * We minify the generated JS and CSS files when the deployment mode is
         * `prod`. 
         */
        minify: opts.deployMode == 'prod',
        /**
         * Install the web plugin defined above.
         */
        plugins: [ webPlugin ],
        /**
         * Source maps are generated for dev builds.
         */
        sourcemap: opts.deployMode == 'dev'
    }
}
/**
 * ### Node.js Configuration
 * 
 * For node modules, we need a separate plugin that sets the bundle file and 
 * invalidates it when the underlying cde changes.
 */
function nodePlugin(backend: boolean): eb.Plugin {
    return {
        name: "bundleReady",
        setup(build: eb.PluginBuild) {
            build.initialOptions.metafile = true
            build.onEnd(res => {
                if (res.metafile && backend) {
                    for (let file in res.metafile.outputs)
                        if (file.endsWith(".js"))
                            bak.addOrUpdateBackendModule(path.resolve(file))
                }
                log.reportBuildResults(res, "Backend")
            })
        }
    }
}
/**
 * The esbuild configuration for backend modules is constructed below.
 */
function nodeBuildOptions(module: cfg.NodeModule, deployMode: cfg.DeployMode): 
    eb.BuildOptions {
    return {
        bundle: true,
        entryPoints: [ module.path ],
        /**
         * The resolve setting specifies which extensions are appended to import
         * statements when dependencies are resolved and in which order.
         */
        resolveExtensions: ['.ts', '.js'],
        /**
         * The output setting specifies where the bundled JS file will be saved. 
         */
        outdir: path.resolve(module.outDir),
        /**
         * Set the platform to node.js
         */
        platform: 'node',
        /**
         * We minify the generated JS and CSS files when the deployment mode is
         * `prod`. 
         */
        minify: deployMode == 'prod',
        /**
         * Install the backend plugin defined above.
         */
        plugins: [ nodePlugin(module.backend) ],
        /**
         * Source maps are generated for dev builds.
         */
        sourcemap: deployMode == 'dev',
        /**
         * You can ignore external dependencies so that bundler will not try to 
         * include them.
         */
        external: module.external
    }
}
/**
 * ## Bundling Files
 * 
 * The bundling function is straightforward. We initialize esbuild passing the 
 * configuration and code files to the function above. Depending on whether we 
 * are in watch mode we call either `watch` or `build`. The former runs forever 
 * in the background monitoring the input files. It reruns automatically 
 * whenever any file in the dependency graph changes. The latter runs only one 
 * time.
 * 
 * If the `serve` mode is on, we automatically go into the watch branch and
 * start the development server as the last step.
 */
var done = false

export async function bundle(entries: EntryPoints) {
    let opts = cfg.getOptions()
    done = false
    try {
        log.info(log.Colors.Cyan + "Bundling...")
        let webOpts = webBuildOptions(opts, entries)
        if (opts.watch || opts.serve) {
            for (let i = 0; i < opts.nodeModules.length; ++i) 
                await (await eb.context(nodeBuildOptions(opts.nodeModules[i], 
                    opts.deployMode))).watch()
            await (await eb.context(webOpts)).watch()
            if (opts.serve)
                srv.start(opts)
        }
        else {
            for (let i = 0; i < opts.nodeModules.length; ++i) 
                await eb.build(nodeBuildOptions(opts.nodeModules[i], 
                    opts.deployMode))
            await eb.build(webOpts)
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