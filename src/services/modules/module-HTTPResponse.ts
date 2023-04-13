import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleHTTPResponseProperties extends ModuleGenericProperties {
    parameters: {
        inputVariable: {
            type: "literal" | "variable",
            value: "string"
        }
    };
}

class ModuleHTTPResponse extends ModuleGeneric {
    inputVariable!: any;

    constructor(module: ModuleHTTPResponseProperties) {
        super();
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

        if (typeof data === "number") {
            data = String(data);
        }

        if (typeof data === "object" && data.hasOwnProperty("buffer") && data.hasOwnProperty("originalname")) {
            res.set({
                'Content-Disposition': `attachment; filename="${data.originalname}"`,
            });
            res.send(data.buffer)
            return;
        }

        res.send(data);
    }
}

export default ModuleHTTPResponse;