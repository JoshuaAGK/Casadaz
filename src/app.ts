import triggers from "./services/triggers";

const demoCascade = [
    {
        moduleType: "GetTriggerData",
        outputVariableName: "Trigger Data",
        parameters: {
            dataType: "text",
            triggerType: "http",
            range: "query"
        }
    },
    {
        moduleType: "GetDictionaryData",
        outputVariableName: "Dictionary Data",
        parameters: {
            inputDictionaryName: "Trigger Data",
            key: "data",
        }
    },
    {
        moduleType: "If",
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
        moduleType: "Text",
        outputVariableName: "Dictionary Data",
        parameters: {
            value: "Hello world!"
        }
    },
    {
        moduleType: "Count",
        outputVariableName: "Dictionary Data",
        parameters: {
            countType: "items",
            inputVariable: {
                type: "variable",
                value: "Dictionary Data"
            }
        }
    },
    {
        moduleType: "Wait",
        parameters: {
            value: 500
        }
    },
    {
        moduleType: "EndIf",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd"
    },
    {
        moduleType: "HTTPResponse",
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