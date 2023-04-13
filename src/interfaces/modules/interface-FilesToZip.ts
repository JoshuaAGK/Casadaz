import ModuleGenericProperties from "../module";

interface ModuleFilesToZipProperties extends ModuleGenericProperties {
    outputVariableName: string,
    parameters: {
        files: Array<File>;
    };
}

type File = {
    type: "variable" | "path" | "literal",
    value: string
}

export { ModuleFilesToZipProperties, File };