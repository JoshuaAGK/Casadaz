import ModuleGenericProperties from "../module";

interface ModuleCountProperties extends ModuleGenericProperties {
    parameters: {
        countType: CountType;
        inputVariable: {};
    };
}

type CountType = "length" | "items";

export { ModuleCountProperties, CountType}