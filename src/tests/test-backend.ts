import { Application } from "express"
import express = require('express')

function createApp(): Application {
    let app = express()
    app.get("/api/test", (req, res) => {
        let host = req.headers["host"]
        res.send("Haloo " + host + "!")
    })
    return app
}

export default createApp()