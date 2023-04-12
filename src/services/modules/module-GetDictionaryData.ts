import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

interface ModuleGetDictionaryDataProperties extends ModuleGenericProperties {
    parameters: {
        inputDictionaryName: string;
        key: string;
    };
}

class ModuleGetDictionaryData {
    key: string;
    outputVariableName: string;
    inputDictionaryName: string;

    constructor(module: ModuleGetDictionaryDataProperties) {
        this.key = module.parameters.key;
        this.inputDictionaryName = module.parameters.inputDictionaryName;
        this.outputVariableName = module.outputVariableName;
    }

    execute(props: any) {
        let res = props.res;
        let dictionary = res.locals.variables[this.inputDictionaryName];
        let data = dictionary[this.key];
        res.locals.variables[this.outputVariableName] = data;
    }
}

export default ModuleGetDictionaryData;