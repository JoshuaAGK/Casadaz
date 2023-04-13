import ModuleGenericProperties from "../module";

interface ModuleWaitProperties extends ModuleGenericProperties {
    parameters: {
        value: number
    };
}

export default ModuleWaitProperties;