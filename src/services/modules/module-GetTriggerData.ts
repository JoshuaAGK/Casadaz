interface ModuleProperties {
    moduleType: string;
    outputVariableName: string;
    parameters: parameters;
}

interface parameters {
    dataType: "text" | "images",
    triggerType: "http",
    range: "body" | "query" | "params"
}

class ModuleGetTriggerData {
    outputVariableName: string;
    params: parameters;

    constructor(module: ModuleProperties) {
        this.params.dataType = module.parameters.dataType;
        this.params.triggerType = module.parameters.triggerType;
        this.params.range = module.parameters.range;
        this.outputVariableName = module.outputVariableName;
    }

    execute(props: any) {
        let res = props.res;
        let data: any;

        switch (this.params.triggerType) {
            case "http":
                data = this.getTriggerHTTPData(res.locals.reqData, this.params);
                break;
        }

        res.locals.variables[this.outputVariableName] = data;
    }

    getTriggerHTTPData(reqData: any, params: parameters) {
        let rawData: any;
        let data: any;

        if (params.range === "query") {
            rawData = reqData.query;
        } else if (params.range === "params") {
            rawData = reqData.params;
        } else {
            rawData = reqData.body;
        }

        if (params.dataType === "text") {
            data = rawData;
        } else if (params.dataType === "images") {
            data = reqData.files
        } else {
            data = rawData
        }

        return data;
    }
}

export default ModuleGetTriggerData;