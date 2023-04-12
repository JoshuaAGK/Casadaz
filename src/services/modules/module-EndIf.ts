import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleEndIfProperties extends ModuleGenericProperties {
    reference: string;
}

class ModuleEndIf extends ModuleGeneric {
    reference: string;

    constructor(module: ModuleEndIfProperties) {
        super();
        this.reference = module.reference;
    }
}

export default ModuleEndIf;