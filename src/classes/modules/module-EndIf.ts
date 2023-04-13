import ModuleGeneric from "../module";
import ModuleEndIfProperties from "../../interfaces/modules/interface-EndIf";

class ModuleEndIf extends ModuleGeneric {
    reference!: string;

    constructor(module: ModuleEndIfProperties) {
        super();
        this.reference = module.reference;
    }
}

export default ModuleEndIf;