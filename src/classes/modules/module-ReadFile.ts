const fs = require('fs');

import ModuleGeneric from "../module";
import ModuleReadFileProperties from "../../interfaces/modules/interface-ReadFile";

class ModuleReadFile extends ModuleGeneric {
    path!: string;
    outputVariableName!: string;

    constructor(module: ModuleReadFileProperties) {
        super();
        this.path = module.path;
        this.outputVariableName = module.outputVariableName;
    }

    async execute(props: any) {
        let res = props.res;
        let fileContents: string;
        
        try {
            fileContents = await this.readFile(`filestore/${this.teamName}/${this.path}`);
        } catch (err: any) {
            switch (err.errno) {
                case -4058:
                    fileContents = "No such file or directory.";
                    break;
                default:
                    fileContents = `Error reading file at ${this.path}.`;
            }
        }

        res.locals.variables[this.outputVariableName] = fileContents;
    }

    readFile(path: string) {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, 'utf8', (err: string, data: string) => {
                if (!err) {
                    resolve(data);
                }
                reject(err);
            })
        })
    }

}

export default ModuleReadFile;