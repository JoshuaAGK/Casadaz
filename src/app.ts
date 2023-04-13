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
        moduleType: "Text",
        outputVariableName: "Text",
        parameters: {
            value: "Hello world!"
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
        moduleType: "Count",
        outputVariableName: "Count",
        parameters: {
            countType: "items",
            inputVariable: {
                type: "variable",
                value: "Trigger Data"
            }
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
        moduleType: "Wait",
        parameters: {
            value: 500
        }
    },
    {
        moduleType: "HTTPResponse",
        parameters: {
            inputVariable: {
                type: "literal",
                value: "Too high!"
            }
        }
    },
    {
        moduleType: "Else",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd"
    },
    {
        moduleType: "HTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Count"
            }
        }
    },
    {
        moduleType: "EndIf",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd"
    },
]

const cascade2 = [
    {
        moduleType: "ReadFile",
        outputVariableName: "fileContents",
        parameters: {
            path: "README.md"
        }
    },
    {
        moduleType: "HTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "fileContents"
            }
        }
    },
]

let testTrigger = new triggers.TriggerHTTP("get", "/test");
testTrigger.cascades = [cascade2];