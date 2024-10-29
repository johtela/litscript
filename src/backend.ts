/**
 * # 🔙 Backend Support
 * 
 * LiTScript supports now also server-side backend JS modules. These are 
 * [Express.js applications][] which the LiTScript development server loads, and 
 * reloads when its source changes.
 * 
 * [Express.js applications]: https://expressjs.com/en/5x/api.html#app
 */
//#region -c backend imports
import * as exp from 'express'
//#endregion
/**
 * ## Express Middleware
 * 
 * The backend API is implemented as an Express middleware. We load the
 * bundle dynamically and invalidate it whenever the it's updated.
 * 
 * The full path to the bundled JS module is stored here. The bundler sets this
 * variable using the `setBackendBundle` function. The reference to the Express
 * app is stored in `instance`. Initially, it's not set.
 */
let bundle: string
let app: exp.Application | undefined

export function setBackendBundle(path: string) {
    bundle = path
}
/**
 * This is the middleware that the development server uses to hanlde requests
 * to backend. The backend is a bundled JS file, so it has no module entry
 * points. Therefore, it must store the reference to its express application
 * instance in the glabal variable `global.backend`.
 */
export function backend(req: exp.Request, res: exp.Response, 
    next: exp.NextFunction) {
    if (bundle) {
        if (!app)
            app = require(bundle).default
        app?.(req, res)
    }
    next()
}
/**
 * Invalidate the backend module after it has changed. Unset the `instance`
 * reference and remove the bundle from Node.js `require` cache.
 */
export function invalidateBackend() {
    if (app) {
        app = undefined
        delete require.cache[bundle] 
    }
}