import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleElseProperties extends ModuleGenericProperties {
    reference: string;
}

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