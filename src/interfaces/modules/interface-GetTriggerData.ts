import ModuleGenericProperties from "../module";

interface ModuleGetTriggerDataProperties extends ModuleGenericProperties {
    parameters: Parameters;
}

interface Parameters {
    dataType: "text" | "images",
    triggerType: "http",
    range: "body" | "query" | "params"
}

export { ModuleGetTriggerDataProperties, Parameters };