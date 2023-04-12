import ModuleText from "./module-Text";
import ModuleHTTPResponse from "./module-HTTPResponse";
import ModuleGetTriggerData from "./module-GetTriggerData";
import ModuleGetDictionaryData from "./module-GetDictionaryData";

const moduleDictionary = {
    "ModuleText": ModuleText,
    "ModuleHTTPResponse": ModuleHTTPResponse,
    "ModuleGetTriggerData": ModuleGetTriggerData,
    "ModuleGetDictionaryData": ModuleGetDictionaryData
}

interface ModuleGenericProperties {
    moduleType: string;
    outputVariableName: string;
    parameters: {};
}

export default moduleDictionary;
export { ModuleGenericProperties };