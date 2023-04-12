import ModuleText from "./module-Text";
import ModuleHTTPResponse from "./module-HTTPResponse";
import ModuleGetTriggerData from "./module-GetTriggerData";
import ModuleGetDictionaryData from "./module-GetDictionaryData";
import ModuleIf from "./module-If";
import ModuleEndIf from "./module-EndIf";
import ModuleCount from "./module-Count";

const moduleDictionary = {
    "moduletext": ModuleText,
    "modulehttpresponse": ModuleHTTPResponse,
    "modulegettriggerdata": ModuleGetTriggerData,
    "modulegetdictionarydata": ModuleGetDictionaryData,
    "moduleif": ModuleIf,
    "moduleendif": ModuleEndIf,
    "modulecount": ModuleCount
}

export default moduleDictionary;