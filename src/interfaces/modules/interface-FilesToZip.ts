import ModuleGenericProperties from "../module";

interface ModuleFilesToZipProperties extends ModuleGenericProperties {
    outputVariableName: string,
    filesList: Array<string>;
}

export { ModuleFilesToZipProperties };