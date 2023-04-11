interface ModuleProperties {
    moduleType: string;
    outputVariableName: string;
    parameters: {
        value: string
    };
}

class ModuleText {
    value!: string;
    outputVariableName!: string;

    constructor(module: ModuleProperties) {
        this.outputVariableName = module.outputVariableName;
        this.value = module.parameters.value;
    }

    execute(props: any) {
        let res = props.res;
        res.locals.variables[this.outputVariableName] = this.value;
    }
}

export default ModuleText;