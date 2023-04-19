import ModuleGenericProperties from "../module";

interface ModuleCountProperties extends ModuleGenericProperties {
    countType: CountType,
    inputVariable: string
}

type CountType = "length" | "items";

export { ModuleCountProperties, CountType}