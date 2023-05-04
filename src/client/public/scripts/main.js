let localModel = [];
let cascadeVariables = [];
let cascadeID = "";

window.addEventListener('load', async () => {
    const origin = window.location.origin;

    cascadeID = window.location.pathname.split("/")[2];

    const cascadeContent = await axios.get(origin + `/cascade-content/${cascadeID}`);
    const cascadeModules = await axios.get(origin + `/cascade-modules/${cascadeID}`);
    localModel = cascadeModules.data;
    //console.log(localModel);

    document.querySelector("#cascade-container").innerHTML = cascadeContent.data;
});

class Module {
    _properties = undefined;

    set properties(props) {
        const propertiesContainer = document.querySelector("#properties-container");

        if (props) {
            propertiesContainer.classList.add("module-selected");
            propertiesContainer.classList.remove("hidden-panel");
        } else {
            propertiesContainer.classList.remove("module-selected");
            propertiesContainer.classList.add("hidden-panel");
            document.querySelector("#properties-form").innerHTML = null;
        }
        this._properties = props;
    }

    get properties() {
        return this._properties;
    }
}
let selectedModule = new Module;

function closeProperties() {
    selectedModule.properties = undefined;
}

function selectModule(that) {
    const moduleID = that.getAttribute("module-id");

    let foundModule = false;

    for (thisModule of localModel) {
        if (thisModule.id == moduleID) {
            selectedModule.properties = thisModule;
            foundModule = true;
            break;
        }
    }

    if (!foundModule) {
        selectModule.properties = undefined;
    }

    const context = moduleContext[selectedModule.properties.moduleType.toLowerCase()];
    buildPropertiesForm(selectedModule.properties, context.fields);
}

function buildPropertiesForm(module, context) {
    //console.log("Module:", module);
    //console.log("Context:", context);

    const moduleType = module.moduleType;
    document.querySelector("#properties-module-type").innerHTML = moduleType;

    let newForm = document.createElement("div");
    newForm.id = "properties-form";

    

    for (field of context) {

        let newThing = document.createElement("div");
        newThing.classList.add("properties-input");

        let newField = document.createElement(field.element);
        //newField.id = field.name;
        newField.name = field.name;


        let value = findValue(module, field.name);




        switch (field.element) {
            case "input":
                newField.type = field.type;
                newField.placeholder = field.placeholder;
                if (value) {
                    newField.setAttribute("value", value);
                }
                break;
            case "select":
                for (option of field.options) {
                    let newOption = document.createElement("option");
                    newOption.value = option.toLowerCase();
                    newOption.innerHTML = option;
                    if (newOption.value == value) {
                        newOption.setAttribute("selected", "");
                    }
                    newField.appendChild(newOption);
                }
                break;
        }

        let label = `<label for="${value}">${field.label}</label>`;
        newThing.innerHTML += label;
        newThing.appendChild(newField);
        
        newForm.appendChild(newThing);
    }

    //newForm.appendChild(newField);

    let oldElement = document.querySelector("#properties-form");
    oldElement.innerHTML = newForm.innerHTML;
}

function findValue(obj, key) {
    // todo: this is no longer necessary since new structure

    // Loop through each property in the object
    for (var prop in obj) {
        // Check if the property is an object
        if (typeof obj[prop] === 'object') {
            var result = findValue(obj[prop], key);
            if (result) {
                return result;
            }
        } else if (prop === key) {
            return obj[prop];
        }
    }
    return null;
}

function replaceValue(obj, key, newValue) {
    for (let prop in obj) {
        if (prop === key) {
            obj[prop] = newValue;
        } else if (typeof obj[prop] === "object") {
            replaceValue(obj[prop], key, newValue);
        }
    }
}

async function saveCascade() {
    let test = await axios.post(`/updatecascade/${cascadeID}`, {
        uid: "63f36628992b9f7c647d7d02",
        team: "Team1",
        cascade: localModel
    })

    console.log(test);
}

async function saveModule() {
    //console.log(selectedModule.properties);
    const moduleID = selectedModule.properties.id;

    const propertiesForm = document.querySelector("#properties-form");
    for (child of propertiesForm.children) {
        //console.log(child);
        //console.log(child.value);
        const input = child.querySelector("input");
        replaceValue(selectedModule.properties, input.getAttribute("name"), input.value);
    }

    //console.log(selectedModule.properties);

    for (thisModule of localModel) {
        if (thisModule.id == moduleID) {
            thisModule = selectedModule.properties;
            break;
        }
    }

    console.log(localModel);
}

async function addModule() {
    let moduleList = document.querySelector("#module-list");
    let newModule = document.createElement("li");
    newModule.innerHTML = `<img src="/media/images/module-icons/blank.png"><input id="new-module-type" name="new-module-type" placeholder="Module type"></input><button onclick=addModuleOfType()>Add</button>`;
    newModule.id = "new-module";
    moduleList.appendChild(newModule);
}

async function addModuleOfType() {
    const type = document.querySelector("#new-module-type").value.toLowerCase();
    let uuid = await axios.get(origin + "/uuid");
    uuid = uuid.data;
    let moduleTidyName = await axios.get(origin + `/moduletidyname/${type}`);
    moduleTidyName = moduleTidyName.data;
    let moduleImageName = await axios.get(origin + `/moduleimagename/${type}`);
    moduleImageName = moduleImageName.data;

    

    console.log(type),
    console.log(moduleContext);

    console.log(moduleContext[type]);


    let newModuleData = moduleContext[type].format;
    newModuleData.id = uuid;
    newModuleData.moduleType = moduleTidyName;


    

    console.table(uuid, moduleTidyName, moduleImageName);


    const stuff = `<li onclick="selectModule(this)" module-id="${uuid}">
        <img src="/media/images/module-icons/${moduleImageName}"/>
        <p>${moduleTidyName}</p>
    </li>`

    console.log(stuff);

    let newModule = document.querySelector("#new-module");
    newModule.outerHTML = stuff;

    localModel.push(newModuleData);

    console.log(newModuleData);
}

async function deleteModule() {
    const moduleID = selectedModule.properties.id;

    const propertiesForm = document.querySelector("#properties-form");
    const propertiesModuleType = document.querySelector("#properties-module-type");
    propertiesForm.innerHTML = null;
    propertiesModuleType.innerHTML = null;

    localModel = localModel.filter((thisModule) => thisModule.id != moduleID);

    selectedModule.properties = undefined;

    var a = document.querySelector(`li[module-id="${moduleID}"]`);
    console.log(a);
    a.remove();
}

async function moveModule(direction, that) {
    event.stopImmediatePropagation();
    const moduleList = document.querySelector("#module-list");
    const grandparentNode = that.parentNode.parentNode;
    const moduleID = grandparentNode.getAttribute("module-id");

    for (thisModule of localModel) {
        if (thisModule.id == moduleID) {
            selectedModule.properties = thisModule;
            break;
        }
    }
    
    const thisModuleIndex = localModel.indexOf(selectedModule.properties);

    if (direction == "up") {
        if (thisModuleIndex > 0) {
            const thisModule = localModel.splice(thisModuleIndex, 1)[0];
            localModel.splice(thisModuleIndex - 1, 0, thisModule);
            const referenceElement = moduleList.children[thisModuleIndex - 1];
            moduleList.insertBefore(grandparentNode, referenceElement);
        }
    } else {
        if (thisModuleIndex < localModel.length) {
            const thisModule = localModel.splice(thisModuleIndex, 1)[0];
            localModel.splice(thisModuleIndex + 1, 0, thisModule);
            const referenceElement = moduleList.children[thisModuleIndex + 2];
            moduleList.insertBefore(grandparentNode, referenceElement);
        }
    }
}