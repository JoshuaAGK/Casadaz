const moduleContext = {
    "gettriggerdata": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "dataType",
                label: "Data type",
                element: "select",
                options: [ "Dictionary", "Images" ]
            },
            {
                name: "triggerType",
                label: "Trigger type",
                element: "select",
                options: [ "HTTP" ]
            },
            {
                name: "range",
                label: "Get data from",
                element: "select",
                options: [ "Body", "Query", "Parameters" ]
            }
        ]
    },
    "count": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "countType",
                label: "Count type",
                element: "select",
                options: [ "Length", "Items" ]
            },
            {
                name: "inputVariable",
                label: "Input",
                placeholder: "Input",
                element: "input",
                type: "text"
            },
        ],
        format: {
            moduleType: "",
            outputVariableName: "",
            countType: "",
            inputVariable: "",
            id: ""
        }
    },
    "readfile": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "path",
                label: "File path",
                placeholder: "Path",
                element: "input",
                type: "text"
            }
        ]
    },
    "httpresponse": {
        fields: [
            {
                name: "inputVariable",
                label: "Input",
                placeholder: "Input",
                element: "input",
                type: "text"
            }
        ]
    },
    "if": {
        fields: [
            {
                name: "reference",
                label: "Reference",
                placeholder: "Reference",
                element: "input",
                type: "text"
            },
            {
                name: "inputVariable1",
                label: "Input 1",
                placeholder: "Input 1",
                element: "input",
                type: "text"
            },
            {
                name: "comparison",
                label: "Comparison",
                placeholder: "Comparison",
                element: "select",
                options: [ ">", ">=", "<", "<=", "==", "!=" ]
            },
            {
                name: "inputVariable2",
                label: "Input 2",
                placeholder: "Input 2",
                element: "input",
                type: "text"
            }
        ],
        format: {
            reference: "",
            inputVariable1: "",
            comparison: "",
            inputVariable2: ""
        }
    },
    "else": {
        fields: [
            {
                name: "reference",
                label: "Reference",
                placeholder: "Reference",
                element: "input",
                type: "text"
            }
        ],
        format: {
            reference: ""
        }
    },
    "endif": {
        fields: [
            {
                name: "reference",
                label: "Reference",
                placeholder: "Reference",
                element: "input",
                type: "text"
            }
        ],
        format: {
            reference: ""
        }
    },
    "filestozip": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "files",
                label: "Files",
                placeholder: "Files",
                element: "input",
                type: "text"
            }
        ],
        format: {
            outputVariableName: "",
            files: ""
        }
    },
    "text": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "value",
                label: "Value",
                placeholder: "Text",
                element: "input",
                type: "text"
            }
        ],
        format: {
            outputVariableName: "",
            value: ""
        }
    },
    "getdictionarydata": {
        fields: [
            {
                name: "outputVariableName",
                label: "Save output as",
                placeholder: "Output variable",
                element: "input",
                type: "text"
            },
            {
                name: "inputDictionaryName",
                label: "Dictionary name",
                element: "input",
                type: "text"
            },
            {
                name: "key",
                label: "Key",
                element: "input",
                type: "text"
            }
        ],
        format: {
            outputVariableName: "",
            inputDictionaryname: "",
            key: ""
        }
    },
    "wait": {
        fields: [
            {
                name: "value",
                label: "Wait time",
                element: "input",
                type: "number"
            }
        ],
        format: {
            value: 0,
        }
    }
}