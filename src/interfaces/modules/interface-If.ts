import ModuleGenericProperties from "../module";

interface ModuleIfProperties extends ModuleGenericProperties {
    reference: string;
    parameters: {
        comparison: string;
        inputVariable1: any;
        inputVariable2: any;
    };
}

export default ModuleIfProperties;