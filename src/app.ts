const express = require('express');
const app = express();
app.listen(3000);

app.get("/", (req: any, res: any) => {
    res.send("Hello world!");
})

class HTTPTrigger {
    constructor(method: string, path: string) {
        let context = this;

        if (String(method).toUpperCase() === "GET") {
            app.get(path, (req: any, res: any) => {
                context.trigger(req, res);
            })
        }
    }

    async trigger(req: any, res: any) {
        res.send("This is some data.")
    }
}

let testTrigger = new HTTPTrigger("get", "/test");