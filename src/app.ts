import triggers from "./services/triggers";

const demoCascade = [
    // {
    //     moduleType: "ModuleText",
    //     outputVariableName: "Text",
    //     parameters: {
    //         value: "Hello world!"
    //     }
    // },
    {
        moduleType: "ModuleGetTriggerData",
        outputVariableName: "Trigger Data",
        parameters: {
            dataType: "text",
            triggerType: "http",
            range: "query"
        }
    },
    {
        moduleType: "ModuleGetDictionaryData",
        outputVariableName: "Dictionary Data",
        parameters: {
            inputDictionaryName: "Trigger Data",
            key: "data",
        }
    },
    {
        moduleType: "ModuleHTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Dictionary Data"
            }
        }
    }
]

let testTrigger = new triggers.TriggerHTTP("get", "/test");
testTrigger.cascades = [demoCascade];