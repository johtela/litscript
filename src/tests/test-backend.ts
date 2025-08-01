import * as http from 'http'

function createApp(): http.RequestListener {
    return (req, res) => {
        if (req.url === "/api/test") {
            let host = req.headers["host"]
            res.end("Haloo " + host + "!")
        }
    }
}

export default createApp()