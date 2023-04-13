import ModuleGenericProperties from "../module";

interface ModuleGetDictionaryDataProperties extends ModuleGenericProperties {
    parameters: {
        inputDictionaryName: string;
        key: string;
    };
}

export default ModuleGetDictionaryDataProperties;