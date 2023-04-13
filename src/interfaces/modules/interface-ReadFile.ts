import ModuleGenericProperties from "../module";

interface ModuleReadFileProperties extends ModuleGenericProperties {
    outputVariableName: string,
    parameters: {
        path: string
    };
}

export default ModuleReadFileProperties;