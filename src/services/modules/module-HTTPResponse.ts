import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleHTTPResponseProperties extends ModuleGenericProperties {
    parameters: {
        inputVariable: {
            type: "literal" | "variable",
            value: "string"
        }
    };
}

class ModuleHTTPResponse {
    inputVariable: any;

    constructor(module: ModuleHTTPResponseProperties) {
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

export default ModuleHTTPResponse;