import { ModuleGenericProperties } from ".";

interface ModuleEndIfProperties extends ModuleGenericProperties {
    reference: string;
}

class ModuleEndIf {
    reference: string;

    constructor(module: ModuleEndIfProperties) {
        this.reference = module.reference;
    }

    execute(props: any) {
        // Do nothing
    }
}

export default ModuleEndIf;