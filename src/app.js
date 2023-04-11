const express = require('express');
const app = express();
app.listen(3000);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

class HTTPTrigger {
    constructor(method, path) {
        let context = this;

        if (String(method).toUpperCase() === "GET") {
            app.get(path, (req, res) => {
                context.trigger(req, res);
            })
        }
    }

    async trigger(req, res) {
        res.send("This is some data.")
    }
}

let testTrigger = new HTTPTrigger("get", "/test");