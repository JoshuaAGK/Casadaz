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
        console.log("Beginning sleep");
        await this.sleep(this.delay);
        console.log("Ending sleep");
    }

    sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}

export default ModuleWait;