import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleWaitProperties extends ModuleGenericProperties {
    parameters: {
        value: number
    };
}

class ModuleWait extends ModuleGeneric {
    delay!: number;

    constructor(module: ModuleWaitProperties) {
        super();
        this.delay = module.parameters.value;
    }

    async execute() {
        await this.sleep(this.delay);
    }

    sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}

export default ModuleWait;