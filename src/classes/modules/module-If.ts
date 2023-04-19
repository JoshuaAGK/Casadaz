import ModuleGeneric from "../module";
import ModuleIfProperties from "../../interfaces/modules/interface-If";

class ModuleIf extends ModuleGeneric {
    reference!: string;
    comparison!: string;
    inputVariable1!: string;
    inputVariable2!: string;

    constructor(module: ModuleIfProperties) {
        super();
        this.comparison = module.comparison;
        this.inputVariable1 = module.inputVariable1;
        this.inputVariable2 = module.inputVariable2;
        this.reference = module.reference;
    }

    execute(props: any) {
        let res = props.res;
        let variable1: any;
        let variable2: any;
        let outputBool: boolean;


        if (typeof this.inputVariable1 === "string" && this.inputVariable1.charAt(0) === "$") {
            variable1 = res.locals.variables[this.inputVariable1.substring(1)];
        } else {
            variable1 = this.inputVariable1;
        }

        if (typeof this.inputVariable2 === "string" && this.inputVariable2.charAt(0) === "$") {
            variable2 = res.locals.variables[this.inputVariable2.substring(1)];
        } else {
            variable2 = this.inputVariable2;
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
                outputBool = (variable1 == variable2);
                break;
            case "!=":
                outputBool = (variable1 != variable2);
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