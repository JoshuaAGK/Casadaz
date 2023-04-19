const AdmZip = require("adm-zip");
const fs = require('fs');

import ModuleGeneric from "../module";
import { ModuleFilesToZipProperties } from "../../interfaces/modules/interface-FilesToZip";

class ModuleFilesToZip extends ModuleGeneric {
    filesList!: Array<string>;
    outputVariableName!: string;

    constructor(module: ModuleFilesToZipProperties) {
        super();
        this.filesList = module.files;
        this.outputVariableName = module.outputVariableName;
    }

    async execute(props: any) {
        let res = props.res;
        let filesData = [];
        let zip = new AdmZip();

        for (const file of this.filesList) {
            let fileData: any;

            if (file.charAt(0) === "$") {
                fileData = res.locals.variables[file.substring(1)];
            } else if (file.charAt(0) === "@") {
                let fileContents: string;
                try {
                    fileContents = await this.readFile(file.substring(1));
                    fileData = {
                        originalname: file.substring(1),
                        buffer: Buffer.from(fileContents)
                    }
                } catch (err: any) {
                    // Unable to read file
                }
            } else {
                fileData = {
                    originalname: `${file}.txt`,
                    buffer: Buffer.from(file)
                }
            }

            if (fileData) {
                if (Array.isArray(fileData)) {
                    for (const singleFile of fileData) {
                        filesData.push(singleFile);
                    }
                } else {
                    filesData.push(fileData);
                }
            }
        }

        for (const file of filesData) {
            zip.addFile(file.originalname, file.buffer)
        }

        const zipFile = {
            originalname: this.outputVariableName + ".zip",
            buffer: zip.toBuffer()
        }

        res.locals.variables[this.outputVariableName] = zipFile;
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

export default ModuleFilesToZip;