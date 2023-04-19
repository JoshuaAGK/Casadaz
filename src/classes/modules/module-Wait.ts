import ModuleGeneric from "../module";
import ModuleWaitProperties from "../../interfaces/modules/interface-Wait";

class ModuleWait extends ModuleGeneric {
    delay!: number;

    constructor(module: ModuleWaitProperties) {
        super();
        this.delay = module.value;
    }

    async execute() {
        await this.sleep(this.delay);
    }

    sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}

export default ModuleWait;