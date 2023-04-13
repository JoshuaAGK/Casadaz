import ModuleGeneric from "../module";
import ModuleElseProperties from "../../interfaces/modules/interface-Else";

class ModuleElse extends ModuleGeneric {
    reference!: string;

    constructor(module: ModuleElseProperties) {
        super();
        this.reference = module.reference;
    }

    execute(props: any) {
        let res = props.res;
        if (res.locals.variables[this.reference] === true) {
            return this.reference;
        }
    }
}

export default ModuleElse;