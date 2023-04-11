import moduleDictionary from "../../config/moduleDictionary";
import { app } from "../../server.js";

class TriggerHTTP {
    cascades!: Array<any>;

    constructor(method: string, path: string) {
        let context = this;

        if (String(method).toUpperCase() === "GET") {
            app.get(path, (req: any, res: any) => {
                res.locals.variables = {};
                context.trigger(req, res);
            })
        }
    }

    async trigger(req: any, res: any) {
        for (let i = 0; i < this.cascades.length; i++) {
            for (let needle = 0; needle < this.cascades[i].length; needle++) {
                let module = this.cascades[i][needle];
                let moduleType: string = module.moduleType;
                let moduleClass = moduleDictionary[moduleType as keyof typeof moduleDictionary];
                let currentModule = new moduleClass(module);

                currentModule.execute({
                    "cascade": this.cascades[i],
                    "req": req,
                    "res": res
                });
            }
        }
    }
}

export default TriggerHTTP;