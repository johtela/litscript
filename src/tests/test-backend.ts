import { Application } from "express"
import express = require('express')

function createApp(): Application {
    let app = express()
    app.get("/test", (req, res) => {
        let referer = req.headers["host"]
        res.send("Hello " + referer + "!")
    })
    return app
}

export default createApp()