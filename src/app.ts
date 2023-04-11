const express = require('express');
const app = express();
app.listen(3000);

app.get("/", (req: any, res: any) => {
    res.send("Hello world!");
})

class HTTPTrigger {
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

interface CascadeComponent {
    moduleType: string;
    outputVariableName: string;
    parameters: any;
}

class ModuleHTTPResponse {
    inputVariable: any;

    constructor(module: CascadeComponent) {
        this.inputVariable = module.parameters.inputVariable;
    }

    execute(props: any) {
        let res = props.res;
        let data;

        if (this.inputVariable.type === "variable") {
            data = res.locals.variables[this.inputVariable.value];
        } else {
            data = this.inputVariable.value;
        }

        res.send(data);
    }
}

class ModuleText {
    value!: string;
    outputVariableName!: string;

    constructor(module: CascadeComponent) {
        this.outputVariableName = module.outputVariableName;
        this.value = module.parameters.value;
    }

    execute(props: any) {
        let res = props.res;
        res.locals.variables[this.outputVariableName] = this.value;
    }
}

const demoCascade = [
    {
        moduleType: "ModuleText",
        outputVariableName: "Text",
        parameters: {
            value: "Hello world!"
        }
    },
    {
        moduleType: "ModuleHTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Text"
            }
        }
    }
]

let testTrigger = new HTTPTrigger("get", "/test");
testTrigger.cascades = [demoCascade];

const moduleDictionary = {
    "ModuleText": ModuleText,
    "ModuleHTTPResponse": ModuleHTTPResponse
}