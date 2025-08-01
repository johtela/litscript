/**
 * # 🔙 Backend Support
 * 
 * LiTScript supports now building server-side (backend) JS modules. These are 
 * request listener modules which the LiTScript development server loads, and 
 * reloads when its source changes. In a standalone deployment scenario, you
 * include the built module in a node.js application. An example backend module
 * can be found in `tests/test-backend.ts`.
 */
//#region -c backend imports
import * as http from 'http'
//#endregion
/**
 * ## Express Middleware
 * 
 * The backend API is implemented as a single functionn reference whose type is
 * `RequestListener` which is defined in the `http` module of node.js. We load
 * the bundle dynamically and invalidate it whenever it's updated.
 * 
 * The full path to the bundled JS module is stored here. The bundler sets this
 * variable using the `setBackendBundle` function. The reference to the `app` is 
 * initially not set.
 */
let bundle: string
let app: http.RequestListener | undefined

export function setBackendBundle(path: string) {
    bundle = path
}
/**
 * This is the middleware that the development server uses to hanlde requests
 * to backend. The backend is a bundled JS file whose default export should 
 * return an Express Application object.
 */
export function backend(req: http.IncomingMessage, res: http.ServerResponse) {
    if (bundle) {
        if (!app)
            app = require(bundle).default
        app?.(req, res)
    }
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