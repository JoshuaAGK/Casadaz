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
import ModuleMailchimp from "../../classes/modules/module-Mailchimp";

import ModuleTidyNames from "../../interfaces/module-tidy-names";

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
    "filestozip": ModuleFilesToZip,
    "mailchimp": ModuleMailchimp
}

const moduleTidyNames: ModuleTidyNames = {
    "text": "Text",
    "httpresponse": "HTTP Response",
    "gettriggerdata": "Get Trigger Data",
    "getdictionarydata": "Get Dictionary Data",
    "if": "If",
    "else": "Else",
    "endif": "End If",
    "count": "Count",
    "wait": "Wait",
    "readfile": "Read File",
    "filestozip": "Files to .zip",
    "mailchimp": "Mailchimp"
}

export { moduleDictionary, moduleTidyNames };