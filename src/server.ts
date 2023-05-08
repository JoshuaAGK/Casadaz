const express = require('express');
const bodyParser = require('body-parser');
import apiRoutes from './api/api';
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3000);
app.use('/', apiRoutes);
app.use(express.static(__dirname + "/client/public"));
import { moduleTidyNames } from './services/dictionaries/module-dictionary';



app.set('view engine', 'hbs');
app.set('views', __dirname + '/client/private/views/');

const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: __dirname + "/client/private/views/partials",
    helpers: {
        helloworld: () => {
            return "Hello world!";
        },
        getModuleTidyName: (moduleName: string) => {
            return getModuleTidyName(moduleName);
        },
        getModuleImageName: (moduleName: string) => {
            return getModuleImageName(moduleName);
        }
    }
}));

app.get("/cascade/:cascadeID", async (req: any, res: any) => {
    const cascadeID = req.params.cascadeID;
    res.render("modules", { layout: "cascade", cascadeID: cascadeID });
});

app.get("/triggers", async (req: any, res: any) => {
    res.render("triggers", { layout: false });
});

app.get("/", async (req: any, res: any) => {
    res.render("index", { layout: false });
});

app.get("/moduletidyname/:modulename", async (req: any, res: any) => {
    res.send(getModuleTidyName(req.params.modulename));
});

app.get("/moduleimagename/:modulename", async (req: any, res: any) => {
    res.send(getModuleImageName(req.params.modulename));
});

function getModuleTidyName(moduleName: string) {
    if (moduleTidyNames.hasOwnProperty(moduleName.toLowerCase())) {
        return moduleTidyNames[moduleName.toLowerCase()];
    }
    return moduleName;
}

function getModuleImageName(moduleName: string) {
    return moduleName.toLowerCase() + ".png";
}

export default app;