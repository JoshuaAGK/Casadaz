import { moduleDictionary } from "../../services/dictionaries/module-dictionary";
import app from "../../server";
const multer = require('multer');

class TriggerHTTP {
    cascades!: Array<any>;
    id = "";
    teamName = "";
    path = "";
    method = "";

    constructor(method: string, path: string, teamName: string) {
        let context = this;

        this.teamName = teamName;
        this.path = path;
        this.method = method;

        if (method.toUpperCase() === "GET") {
            app.get(path, (req: any, res: any) => {
                res.setHeader("X-Powered-By", "Casadaz");
                res.locals.variables = {};
                context.trigger(req, res);
                console.log(`Executed trigger ${this.id}`);
            })
        }

        if (method.toUpperCase() === "POST") {
            app.post(path, multer().any(), (req: any, res: any) => {
                res.setHeader("X-Powered-By", "Casadaz");
                res.locals.variables = {};
                context.trigger(req, res);
                console.log(`Executed trigger ${this.id}`);
            })
        }
    }

    async trigger(req: any, res: any) {
        res.locals.reqData = {
            "query": req.query,
            "params": req.params,
            "body": req.body,
            "files": req.files
        };

        for (let i = 0; i < this.cascades.length; i++) {
            for (let needle = 0; needle < this.cascades[i].modules.length; needle++) {
                let module = this.cascades[i].modules[needle];
                let moduleType: string = module.moduleType.toLowerCase();
                let moduleClass = moduleDictionary[moduleType as keyof typeof moduleDictionary];
                let currentModule = new moduleClass(module);
                currentModule.teamName = this.teamName;

                // If module execution returns a value, skip to next module with that reference value
                let moduleReference = await currentModule.execute({
                    "cascade": this.cascades[i],
                    "req": req,
                    "res": res
                });

                // Skip to next module with reference value
                if (moduleReference) {
                    for (let j = needle + 1; j < this.cascades[i].modules.length; j++) {
                        if (this.cascades[i].modules[j].reference === moduleReference) {
                            // Found it - decrement the needle by 1 so it's executed
                            needle = j - 1;
                            break;
                        }
                    }
                }
            }
        }
    }

    deleteRoute() {
        // Find Express route matching path and method
        const routeIndex = app._router.stack.findIndex((layer: any) =>
            layer.route &&
            layer.route.path === this.path &&
            layer.route.methods[this.method]
        )

        // Delete route if exists
        if (routeIndex > -1) {
            app._router.stack.splice(routeIndex, 1);
        }
    }
}

export default TriggerHTTP;