import ModuleGenericProperties from "../module";

interface ModuleFilesToZipProperties extends ModuleGenericProperties {
    outputVariableName: string,
    files: Array<string>;
}

// type File = {
//     type: "variable" | "path" | "literal",
//     value: string
// }

export { ModuleFilesToZipProperties };