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
        let testModule = new HTTPResponse(res, "This is some awd");
        testModule.execute();
    }
}

class HTTPResponse {
    res: any;
    data: string;

    constructor(res: any, data: string) {
        this.res = res;
        this.data = data;
    }

    execute() {
        this.res.send(this.data);
    }
}

let testTrigger = new HTTPTrigger("get", "/test");
