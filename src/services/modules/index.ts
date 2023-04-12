import ModuleText from "./module-Text";
import ModuleHTTPResponse from "./module-HTTPResponse";
import ModuleGetTriggerData from "./module-GetTriggerData";
import ModuleGetDictionaryData from "./module-GetDictionaryData";
import ModuleIf from "./module-If";
import ModuleEndIf from "./module-EndIf";
import ModuleCount from "./module-Count";
import ModuleWait from "./module-Wait";

const moduleDictionary = {
    "text": ModuleText,
    "httpresponse": ModuleHTTPResponse,
    "gettriggerdata": ModuleGetTriggerData,
    "getdictionarydata": ModuleGetDictionaryData,
    "if": ModuleIf,
    "endif": ModuleEndIf,
    "count": ModuleCount,
    "wait": ModuleWait
}

export default moduleDictionary;