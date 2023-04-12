interface ModuleGenericProperties {
    moduleType: string;
    outputVariableName: string;
    parameters: {};
}

class ModuleGeneric {
    execute(props: any) {
        // Overwrite me!
    }
}

export { ModuleGenericProperties, ModuleGeneric }