import ModuleGenericProperties from "../module";

interface ModuleHTTPResponseProperties extends ModuleGenericProperties {
    parameters: {
        inputVariable: {
            type: "literal" | "variable",
            value: "string"
        }
    };
}

export default ModuleHTTPResponseProperties;