import ModuleGenericProperties from "../module";

interface ModuleIfProperties extends ModuleGenericProperties {
    reference: string;
    comparison: string;
    inputVariable1: string;
    inputVariable2: string;
}

export default ModuleIfProperties;