import ModuleText from "./module-Text";
import ModuleHTTPResponse from "./module-HTTPResponse";
import ModuleGetTriggerData from "./module-GetTriggerData";
import ModuleGetDictionaryData from "./module-GetDictionaryData";
import ModuleIf from "./module-If";
import ModuleElse from "./module-Else";
import ModuleEndIf from "./module-EndIf";
import ModuleCount from "./module-Count";
import ModuleWait from "./module-Wait";
import ModuleReadFile from "./module-ReadFile";

const moduleDictionary = {
    "text": ModuleText,
    "httpresponse": ModuleHTTPResponse,
    "gettriggerdata": ModuleGetTriggerData,
    "getdictionarydata": ModuleGetDictionaryData,
    "if": ModuleIf,
    "else": ModuleElse,
    "endif": ModuleEndIf,
    "count": ModuleCount,
    "wait": ModuleWait,
    "readfile": ModuleReadFile
}

export default moduleDictionary;