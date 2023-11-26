/**
 * # Development Server
 * 
 * Also new in 2 is that LiTScript comes with an integrated web server that
 * eliminites need for additional tools and makes development experience nicer.
 * The server supports live reloading of changed files. We use the [Express][]
 * web server to provide the basic functionality.
 * 
 * [Express]: http://expressjs.com/
 */
//#region -c server imports
import * as exp from 'express'
import * as cfg from './config'
import * as log from './logging'
//#endregion
/**
 * ## Tracking Open Pages
 * 
 * We track opened pages with the Client objects. When the serve mode is on
 * ouputted pages are augmented with a snippet of JS code that connects to the
 * server side events. That enables us to track which pages are open and send
 * events to them when output files change.
 * 
 * Each client is given an unique id that allows us to dispose it when the
 * SSE connection is closed. The connection keeps open until client closes it.
 * To send new data to the client, we also store the Response object.
 */
interface Client {
    id: number
    response: exp.Response
}
let clients: Client[] = []
let lastId = 0
/**
 * ## Start Server
 * 
 * Server configuration is dead simple. We create an express app and make it
 * serve static pages from the output directory. The other endpoint we set up
 * is the event stream under the `/litscript` route. 
 * 
 * Finally, we get the host and port from the config and start listening to it.
 */
export function start(opts: cfg.Options) {
    let app = exp();
    app.use(exp.static(opts.outDir))
    app.get('/litscript', notifyHandler)
    let { host, port } = opts.serveOptions
    app.listen(port, host, () => console.log(
        `${log.Colors.Reset}Development server started at ${
        log.Colors.Green}http://${host}:${port}`))
}
/**
 * Send each client a message that specified files have changed.
 */
export function notifyChanges(files: string[]) {
    clients.forEach(c => 
        c.response.write(`data: ${JSON.stringify(files)}\n\n`))
}
/**
 * The handler for event stream returns headers and registers a new client.
 * Then it sets up a `close` event handler that removes the client when it
 * disconnects.
 */
function notifyHandler(request: exp.Request, response: exp.Response) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }
    response.writeHead(200, headers);
    let id = ++lastId
    clients.push({ id, response })
    log.info(`Client ${id} connected`)
    request.on('close', () => {
        log.info(`Client ${id} disconnected.`)
        clients = clients.filter(c => c.id != id)
    })
}