import triggers from "./services/triggers";

const demoCascade = [
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
        moduleType: "ModuleIf",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd",
        parameters: {
            inputVariable1: {
                type: "variable",
                value: "Dictionary Data"
            },
            comparison: ">",
            inputVariable2: {
                type: "literal",
                value: 100
            }
        }
    },
    {
        moduleType: "ModuleText",
        outputVariableName: "Dictionary Data",
        parameters: {
            value: "Hello world!"
        }
    },
    {
        moduleType: "ModuleEndIf",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd"
    },
    {
        moduleType: "ModuleHTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Dictionary Data"
            }
        }
    },
]

let testTrigger = new triggers.TriggerHTTP("get", "/test");
testTrigger.cascades = [demoCascade];