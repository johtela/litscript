/**
 * # Bundling JS and CSS Files
 * 
 * [![](../images/webpack.svg =200x200)][Webpack]
 * HTML files need auxiliary JavaScript and style files to function properly. 
 * The template package provides these files but does not deploy them. There 
 * might be dozens of CSS and JS files needed by various elements in a page.
 * To make the deployment simpler we use [Webpack][] to bundle the files.
 * 
 * Bundling takes a root file, typically a JS or TS file, finds all the 
 * dependencies of the root file no matter how deep they are, and packs them
 * to output file(s). There will be a bundled JS file for each root file.
 * If you have CSS or [Less][] files in your dependency graph, those will be 
 * combined to a single CSS file.
 * 
 * The goal is to have fewer JS and CSS files to deploy, thus making the 
 * page loading times faster. To learn more about Webpack operation refer to
 * the excellent documentation on its [home page][Webpack]. 
 * 
 * [Webpack]: https://webpack.js.org/
 * [Less]: http://lesscss.org/
 */
//#region -c bundler imports
import * as path from 'path'
import * as fs from 'fs'
import * as webpack from 'webpack'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as cfg from './config'
import * as log from './logging'
import CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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
const nmdir = "node_modules"

const config: webpack.Configuration = {
    module: {
        /**
         * The rules specify how files of different types are loaded. Each file
         * type uses one or more loaders to transform it from the source format
         * to Webpack's "native" format Javascript. 
         */
        rules: [
            {
                /**
                 * For TypeScript files we use the [ts-loader][] to transpile TS 
                 * to JS. The loader does not perform type checking; typing 
                 * errors are reported by LiTScript when it is compiling the 
                 * project.  
                 */
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
            {
                /**
                 * Style files are handled by a queue of loaders. First 
                 * [less-loader][] transforms Less files to CSS. Since Less is a 
                 * superset of CSS, vanilla CSS files will be moved as-is to
                 * the next loader. The next one is the standard [css-loader][]
                 * which transforms CSS to JS. The last loader is provided by
                 * [MiniCssExtractPlugin][]. It extracts CSS into separate files 
                 * and creates a separate CSS file for each root file that 
                 * imports style files.
                 */
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                /**
                 * Images in SVG, PNG, GIF, and JPG format will be loaded by the 
                 * [url-loader][]. It will inline files which are small enough 
                 * to further improve loading times.
                 */
                test: /\.(svg|png|gif|jpg)$/,
                type: 'asset'
            }
        ]
    },
    /**
     * The resolve setting specifies which extensions are appended to import
     * statements when dependencies are resolved and in which order.
     */
    resolve: {
        extensions: ['.ts', '.js', '.less']
    },
    /**
     * We need to set absolute path for loader modules so Webpack can find 
     * them when running the tool from different project directory. We find
     * the correct directory using an auxiliary function.
     */
    resolveLoader: {
        modules: [ findNodeModulesDir() ]
    },
    /**
     * The plugins section instantiates plugins used in the bundle. We use only
     * the [MiniCssExtractPlugin][]. We configure it to write to `css/` 
     * subfolder under the output directory. The body of the CSS file name will 
     * be the same as for the root file.
     */
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ],
    /**
     * The output setting specifies where the packed JS file will be saved. We
     * put them into `js/` subfolder in the output directory. The name of the
     * output file is copied from the root file.
     */
    output: {
        filename: 'js/[name].js',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    /**
     * Optimization settings instruct the bundler to minimize generated JS and 
     * CSS. JS minimizer is included with Webpack, but for CSS minimization we
     * need additional plugin.
     */
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ]
    }
}
/**
 * Resolving the location of the `node_modules` directory requires to look into 
 * couple of places. The relative path is different when LiTScript is installed 
 * locally vs. globally. 
 */
function findNodeModulesDir(): string {
    let res = path.resolve(__dirname, "..", nmdir)
    if (fs.existsSync(res)) 
        return res
    res = path.resolve(__dirname, "../..")
    if (path.basename(res) == nmdir)
        return res
    throw Error(`Could not find "${nmdir}" directory`)
}
/**
 * [ts-loader]: https://github.com/TypeStrong/ts-loader
 * [less-loader]: https://github.com/webpack-contrib/less-loader
 * [css-loader]: https://github.com/webpack-contrib/css-loader
 * [MiniCssExtractPlugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
 * [url-loader]: https://github.com/webpack-contrib/url-loader
 * 
 * ## Initializing Dynamic Configuration
 * 
 * The rest of the Webpack configuration is initialized by the function below.
 * It gets the list of root files as an argument.
 */
function initConfig(codeFiles: CodeFiles) {
    let opts = cfg.getOptions()
    /**
     * Running LiTScript in development mode, will produce source maps for JS 
     * files to aid debugging. In production mode the outputted JS files are
     * minified and debugging info is omitted.
     */
    config.mode = opts.deployMode == 'dev' ?
        'development' : 'production'
    if (opts.deployMode == 'dev')
        config.devtool = 'inline-source-map'
    /**
     * The context setting contains the absolute path of the project base 
     * directory.
     */
    config.context = path.resolve(opts.baseDir)
    /**
     * We get the root code files as an argument, but the main JS file comes
     * from the template. This contains all the JavaScript code needed by the
     * template. The other ones are brought in by the user. They contain 
     * [visualizers](visualizer.html) and their dependencies.
     */
    let template = cfg.getTemplate()
    codeFiles.main = template.mainTSFile()
    config.entry = codeFiles
    /**
     * Templates can also define aliases, i.e variables that can dynamically
     * change which files are imported. Aliases are used to choose the correct
     * style file for selected syntax highlighting scheme, and to import 
     * user-defined themes.
     */
    config.resolve.alias = template.pathAliases(opts.frontMatter)
    /**
     * Last, we set the output directory, which comes staight from the 
     * LiTScript options.
     */
    config.output.path = path.isAbsolute(opts.outDir) ?
        opts.outDir :
        path.resolve(config.context, opts.outDir)
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
export function bundle(codeFiles: CodeFiles) {
    done = false
    log.info(log.Colors.Cyan + "Bundling...")
    initConfig(codeFiles)
    let compiler = webpack(config)
    if (cfg.getOptions().watch)
        compiler.watch({}, handler)
    else
        compiler.run(handler)
}
/**
 * Both `run` and `watch` methods take the handler callback which will be 
 * called when an error occurs or when the bundling is finished. We log
 * the error/status information to console, and set the `done` flag when
 * bundle is ready.
 */
function handler(err: Error, stats: webpack.Stats) {
    if (err)
        log.error(err)
    if (stats) {
        log.reportBundleStats(stats)
        done = true
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
