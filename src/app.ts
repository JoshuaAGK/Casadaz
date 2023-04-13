import triggers from "./services/triggers";

const cascade1 = [
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

const cascade3 = [
    {
        moduleType: "FilesToZip",
        outputVariableName: "Zip",
        parameters: {
            files: [
                {
                    type: "path",
                    value: "LICENSE.md"
                },
                {
                    type: "path",
                    value: "tsconfig.json"
                },
                {
                    type: "path",
                    value: "nonexistentfile.yeet"
                },
                {
                    type: "literal",
                    value: "ligmabeans"
                }
            ]
        }
    },
    {
        moduleType: "HTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Zip"
            }
        }
    },
]

const cascade4 = [
    {
        moduleType: "GetTriggerData",
        outputVariableName: "Trigger Data",
        parameters: {
            dataType: "images",
            triggerType: "http",
            range: "body"
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
                value: "Count"
            },
            comparison: ">",
            inputVariable2: {
                type: "literal",
                value: 2
            }
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
        moduleType: "FilesToZip",
        outputVariableName: "Zip",
        parameters: {
            files: [
                {
                    type: "variable",
                    value: "Trigger Data"
                },
                {
                    type: "path",
                    value: "license.md"
                }
            ]
        }
    },
    {
        moduleType: "HTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Zip"
            }
        }
    },
    {
        moduleType: "EndIf",
        reference: "3b960a6a-80de-488d-8932-ffc18169fbdd"
    }
]

let trigger2 = new triggers.TriggerHTTP("get", "/");
trigger2.cascades = [cascade2];

let trigger4 = new triggers.TriggerHTTP("post", "/test");
trigger4.cascades = [cascade4];