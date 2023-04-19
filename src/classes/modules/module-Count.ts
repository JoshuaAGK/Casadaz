import ModuleGeneric from "../module";
import { ModuleCountProperties, CountType } from "../../interfaces/modules/interface-Count";

class ModuleCount extends ModuleGeneric {
    countType!: CountType;
    inputVariable!: any;
    outputVariableName!: string;

    constructor(module: ModuleCountProperties) {
        super();
        this.countType = module.countType;
        this.inputVariable = module.inputVariable;
        this.outputVariableName = module.outputVariableName;
    }

    execute(props: any) {
        let res = props.res;
        let variable: any;
        let count = 0;

        if (this.inputVariable.charAt(0) === "$") {
            variable = res.locals.variables[this.inputVariable.substring(1)];
        } else {
            variable = this.inputVariable;
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