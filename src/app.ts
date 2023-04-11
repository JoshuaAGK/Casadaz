import * as triggers from "./services/triggers";

const express = require('express');
const app = express();
app.listen(3000);

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

export { app };