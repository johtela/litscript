/**
 * # 🔙 Backend Support
 * 
 * LiTScript supports now building server-side (backend) JS modules. These are 
 * [Express.js applications][] which the LiTScript development server loads, and 
 * reloads when its source changes. In a standalone deployment scenario, you
 * include the built module in a node.js application. An example backend module
 * can be found in `tests/test-backend.ts`.
 * 
 * [Express.js applications]: https://expressjs.com/en/5x/api.html#app
 */
//#region -c backend imports
import * as path from 'path'
import * as fs from 'fs'
import * as exp from 'express'
import * as cfg from './config'
import * as log from './logging'
//#endregion
/**
 * ## Express Middleware
 * 
 * The backend API is implemented as an Express middleware. We load the
 * bundle dynamically and invalidate it whenever it's updated.
 * 
 * The full path to the bundled JS module is stored here. The bundler sets this
 * variable using the `setBackendBundle` function. The reference to the Express
 * `app` is initially not set.
 */
let bundle: string
let app: exp.Application | undefined

export function setBackendBundle(path: string) {
    bundle = path
}
/**
 * This is the middleware that the development server uses to hanlde requests
 * to backend. The backend is a bundled JS file whose default export should 
 * return an Express Application object.
 */
export function backend(req: exp.Request, res: exp.Response, 
    next: exp.NextFunction) {
    if (bundle) {
        if (!app)
            app = require(bundle).default
        app?.(req, res, next)
    }
    else
        next()
}
/**
 * Invalidate the backend module after it has changed. Unset the `app` reference 
 * and remove the bundle from Node.js `require` cache.
 */
export function invalidateBackend() {
    if (app) {
        app = undefined
        delete require.cache[bundle] 
    }
}
/**
 * ## Read `.env` file
 * 
 * If the root folder contains a file called `.env` load environment variables
 * from it.
 */
const varDefRE = /^([A-Za-z]\w*)\s*\=\s*(.+)$/

export function loadEnvFile() {
    let envpath = path.resolve(cfg.getOptions().baseDir, ".env")
    if (fs.existsSync(envpath)) {
        let content = fs.readFileSync(envpath, 'utf-8').split(/\r?\n/)
        for (let i = 0; i < content.length; ++i) {
            let line = content[i].trim()
            if (line && !line.startsWith("#")) {
                let match = line.match(varDefRE)
                if (match)
                    process.env[match[1]] = match[2]
                else {
                    log.warn("Invalid line skipped in .env file:\n" + line)
                    log.info("Correct format is <VARNAME>=<VARVALUE><newline>\n")
                }
            }
        }
    }
}