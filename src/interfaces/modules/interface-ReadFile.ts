import ModuleGenericProperties from "../module";

interface ModuleReadFileProperties extends ModuleGenericProperties {
    outputVariableName: string,
    path: string
}

export default ModuleReadFileProperties;