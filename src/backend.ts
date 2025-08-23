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
 * The full path to the bundled JS module is stored in the BackendModule object. 
 * The `app` contains the exported RequestListener, if it's loaded.
 */
export interface BackendModule {
    path: string
    app?: http.RequestListener
}
let modules: BackendModule[] = []
/**
 * Add a new the backend module to the list. If it's already there, unset the 
 * `app` reference and remove the bundle from Node.js `require` cache.
 */
export function addOrUpdateBackendModule(path: string) {
    let mod = modules.find(m => m.path == path)
    if (mod) {
        mod.app = undefined
        delete require.cache[mod.path] 
    }
    else
        modules.push({ path })
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
    for (let i = 0; i < modules.length && !res.writableEnded; ++i) {
        let mod = modules[i]
        if (!mod.app)
            mod.app = require(mod.path).default
        await Promise.resolve(mod.app?.(req, res))
    }
}