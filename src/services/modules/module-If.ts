import { ModuleGenericProperties } from ".";

interface ModuleIfProperties extends ModuleGenericProperties {
    reference: string;
    parameters: {
        comparison: string;
        inputVariable1: any;
        inputVariable2: any;
    };
}

class ModuleIf {
    reference: string;
    comparison: string;
    inputVariable1: any;
    inputVariable2: any;

    constructor(module: ModuleIfProperties) {
        this.comparison = module.parameters.comparison;
        this.inputVariable1 = module.parameters.inputVariable1;
        this.inputVariable2 = module.parameters.inputVariable2;
        this.reference = module.reference;
    }

    execute(props: any) {
        let res = props.res;
        let variable1: any;
        let variable2: any;
        let outputBool: boolean;


        if (this.inputVariable1.type === "variable") {
            variable1 = res.locals.variables[this.inputVariable1.value];
        } else {
            variable1 = this.inputVariable1.value;
        }

        if (this.inputVariable2.type === "variable") {
            variable1 = res.locals.variables[this.inputVariable2.value];
        } else {
            variable2 = this.inputVariable2.value;
        }

        switch (this.comparison) {
            case ">":
                outputBool = (parseInt(variable1) > parseInt(variable2));
                break;
            case ">=":
                outputBool = (parseInt(variable1) >= parseInt(variable2));
                break;
            case "<":
                outputBool = (parseInt(variable1) < parseInt(variable2));
                break;
            case "<=":
                outputBool = (parseInt(variable1) <= parseInt(variable2));
                break;
            case "==":
                outputBool = (parseInt(variable1) == parseInt(variable2));
                break;
            case "!=":
                outputBool = (parseInt(variable1) != parseInt(variable2));
                break;
        }

        if (!outputBool!) {
            return this.reference;
        } else {
            res.locals.variables[this.reference] = true;
        }
    }
}

export default ModuleIf;