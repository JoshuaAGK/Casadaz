import ModuleText from "../../classes/modules/module-Text";
import ModuleHTTPResponse from "../../classes/modules/module-HTTPResponse";
import ModuleGetTriggerData from "../../classes/modules/module-GetTriggerData";
import ModuleGetDictionaryData from "../../classes/modules/module-GetDictionaryData";
import ModuleIf from "../../classes/modules/module-If";
import ModuleElse from "../../classes/modules/module-Else";
import ModuleEndIf from "../../classes/modules/module-EndIf";
import ModuleCount from "../../classes/modules/module-Count";
import ModuleWait from "../../classes/modules/module-Wait";
import ModuleReadFile from "../../classes/modules/module-ReadFile";
import ModuleFilesToZip from "../../classes/modules/module-FilesToZip";

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
    "readfile": ModuleReadFile,
    "filestozip": ModuleFilesToZip
}

export default moduleDictionary;