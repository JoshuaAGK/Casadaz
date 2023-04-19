import ModuleGeneric from "../module";
import ModuleHTTPResponseProperties from "../../interfaces/modules/interface-HTTPResponse";

class ModuleHTTPResponse extends ModuleGeneric {
    inputVariable!: any;

    constructor(module: ModuleHTTPResponseProperties) {
        super();
        this.inputVariable = module.inputVariable;
    }

    execute(props: any) {
        let res = props.res;
        let data;

        if (this.inputVariable.charAt(0) === "$") {
            data = res.locals.variables[this.inputVariable.substring(1)];
        } else {
            data = this.inputVariable;
        }

        if (typeof data === "number") {
            data = String(data);
        }

        if (typeof data === "object" && data.hasOwnProperty("buffer") && data.hasOwnProperty("originalname")) {
            res.set({
                'Content-Disposition': `attachment; filename="${data.originalname}"`,
            });
            res.send(data.buffer)
            return;
        }

        res.send(data);
    }
}

export default ModuleHTTPResponse;