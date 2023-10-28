import * as exp from 'express'
import * as cfg from './config'
import * as log from './logging'

interface Client {
    id: number
    response: exp.Response
}
let clients: Client[] = []
let lastId = 0

export function start(opts: cfg.Options) {
    let app = exp();
    app.use(exp.static(opts.outDir))
    app.get('/litscript', notifyHandler)
    let { host, port } = opts.serveOptions
    app.listen(port, host, () => console.log(
        `${log.Colors.Reset}Development server started at ${
        log.Colors.Green}http://${host}:${port}`))
}

export function notifyChanges(files: string[]) {
    clients.forEach(c => 
        c.response.write(`data: ${JSON.stringify(files)}\n\n`))
}

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