import ModuleGenericProperties from "../module";

interface ModuleGetTriggerDataProperties extends ModuleGenericProperties {
    dataType: "text" | "images",
    triggerType: "http",
    range: "body" | "query" | "params"
}

type Parameters = {
    dataType: "text" | "images",
    triggerType: "http",
    range: "body" | "query" | "params"
}

export { ModuleGetTriggerDataProperties, Parameters };