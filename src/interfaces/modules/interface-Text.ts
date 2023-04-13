import ModuleGenericProperties from "../module";

interface ModuleTextProperties extends ModuleGenericProperties {
    parameters: {
        value: string
    };
}

export default ModuleTextProperties;