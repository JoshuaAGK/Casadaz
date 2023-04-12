import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleTextProperties extends ModuleGenericProperties {
    parameters: {
        value: string
    };
}

class ModuleText extends ModuleGeneric {
    value!: string;
    outputVariableName!: string;

    constructor(module: ModuleTextProperties) {
        super();
        this.outputVariableName = module.outputVariableName;
        this.value = module.parameters.value;
    }

    execute(props: any) {
        let res = props.res;
        res.locals.variables[this.outputVariableName] = this.value;
    }
}

export default ModuleText;