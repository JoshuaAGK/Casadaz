import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleCountProperties extends ModuleGenericProperties {
    parameters: {
        countType: countType;
        inputVariable: {};
    };
}

type countType = "length" | "items";

class ModuleCount extends ModuleGeneric {
    countType!: countType;
    inputVariable!: any;
    outputVariableName!: string;

    constructor(module: ModuleCountProperties) {
        super();
        this.countType = module.parameters.countType;
        this.inputVariable = module.parameters.inputVariable;
        this.outputVariableName = module.outputVariableName;
    }

    execute(props: any) {
        let res = props.res;
        let variable: any;
        let count = 0;

        if (this.inputVariable.type === "variable") {
            variable = res.locals.variables[this.inputVariable.value];
        } else {
            variable = this.inputVariable.value;
        }

        if (this.countType === "length") {
            count = variable.length;
        } else if (this.countType === "items") {
            switch (typeof variable) {
                case "string":
                    count = variable.length;
                    break;
                case "object":
                    count = Object.keys(variable).length;
                    break;
                case "number":
                case "boolean":
                case "bigint":
                case "symbol":
                case "function":
                    count = 1;
                    break;
            }
        }

        res.locals.variables[this.outputVariableName] = count;
    }
}

export default ModuleCount;