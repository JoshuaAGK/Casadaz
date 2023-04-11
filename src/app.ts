import * as triggers from "./services/triggers";

const demoCascade = [
    {
        moduleType: "ModuleText",
        outputVariableName: "Text",
        parameters: {
            value: "Hello world!"
        }
    },
    {
        moduleType: "ModuleHTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Text"
            }
        }
    }
]

let testTrigger = new triggers.TriggerHTTP("get", "/test");
testTrigger.cascades = [demoCascade];