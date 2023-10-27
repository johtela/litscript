import * as express from 'express'
import * as cfg from './config'
import * as log from './logging'

export function start(opts: cfg.Options) {
    let app = express();
    app.use(express.static(opts.outDir))
    let { host, port } = opts.serveOptions
    app.listen(port, host, () => console.log(
        `${log.Colors.Reset}Development server started at ${
        log.Colors.Green}http://${host}:${port}`))
}