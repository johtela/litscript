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
 * ## Request Listener
 * 
 * The backend API is implemented as a single function reference whose type is
 * `RequestListener` defined in the `http` module of node.js. We load the bundle 
 * dynamically and invalidate it whenever it's updated.
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
 * This is the function that the development server calls to hanlde requests
 * to backend. The backend is a bundled JS file whose default export should 
 * return the request listener callback. The callback can be asynchronous,
 * and return a Promise. We must wait the promise to be resolved, if this is 
 * the case. Otherwise we might prematurely exit from the function before the 
 * request handler has completed.
 */
export async function backend(req: http.IncomingMessage, 
    res: http.ServerResponse) {
    if (bundle) {
        if (!app)
            app = require(bundle).default
        await Promise.resolve(app?.(req, res))
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