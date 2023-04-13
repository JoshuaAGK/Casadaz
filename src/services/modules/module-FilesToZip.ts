import { ModuleGenericProperties, ModuleGeneric } from "./module-Generic";

const AdmZip = require("adm-zip");
const fs = require('fs');

interface ModuleFilesToZipProperties extends ModuleGenericProperties {
    outputVariableName: string,
    parameters: {
        files: Array<file>;
    };
}

type file = {
    type: "variable" | "path" | "literal",
    value: string
}

class ModuleFilesToZip extends ModuleGeneric {
    filesList!: Array<file>;
    outputVariableName!: string;

    constructor(module: ModuleFilesToZipProperties) {
        super();
        this.filesList = module.parameters.files;
        this.outputVariableName = module.outputVariableName;
    }

    async execute(props: any) {
        let res = props.res;
        let filesData = [];
        let zip = new AdmZip();

        for (const file of this.filesList) {
            let fileData: any;

            if (file.type === "variable") {
                fileData = res.locals.variables[file.value];
            } else if (file.type === "literal") {
                fileData = {
                    originalname: `${file.value}.txt`,
                    buffer: Buffer.from(file.value)
                }
            } else if (file.type === "path") {
                let fileContents: string;
                try {
                    fileContents = await this.readFile(file.value);
                    fileData = {
                        originalname: file.value,
                        buffer: Buffer.from(fileContents)
                    }
                } catch (err: any) {
                    // Unable to read file
                }
            } else {
                fileData = {
                    originalname: `${file.value}.txt`,
                    buffer: Buffer.from(file.value)
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