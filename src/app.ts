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
        moduleType: "ModuleHTTPResponse",
        parameters: {
            inputVariable: {
                type: "variable",
                value: "Trigger Data"
            }
        }
    }
]

let testTrigger = new triggers.TriggerHTTP("get", "/test");
testTrigger.cascades = [demoCascade];