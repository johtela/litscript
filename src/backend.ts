/**
 * # 🔙 Backend Support
 * 
 * The backend module is a class that inherits from Backend base class. It's
 * constructor is the default export of the module. The base class contains
 * abstract methods for setting up and tearing down the backend.
 */
//#region -c backend imports
import * as exp from 'express'
//#endregion
/**
 * ## Express Middleware
 * 
 * The backend API is implemented as an Express middleware. We manage the
 * loading of the backend bundle and invalidate it whenever the bundle is
 * updated.
 */
let bundle: string
let instance: exp.Application | undefined

export function setBackendBundle(path: string) {
    bundle = path
}

export function backend(req: exp.Request, res: exp.Response, 
    next: exp.NextFunction) {
    if (!bundle)
        next()
    if (!instance)
        require(bundle)
    instance = global.backend
}

export function invalidateBackend() {
    if (instance) {
        instance = undefined
        delete require.cache[bundle] 
    }
}