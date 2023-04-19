import ModuleGeneric from "../module";
import { ModuleGetTriggerDataProperties, Parameters } from "../../interfaces/modules/interface-GetTriggerData";

class ModuleGetTriggerData extends ModuleGeneric {
    outputVariableName!: string;
    params!: Parameters;

    constructor(module: ModuleGetTriggerDataProperties) {
        super();
        this.params = {
            dataType: module.dataType,
            triggerType: module.triggerType,
            range: module.range
        };
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

    getTriggerHTTPData(reqData: any, params: Parameters) {
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