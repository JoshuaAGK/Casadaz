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
            if (moduleTidyNames.hasOwnProperty(moduleName.toLowerCase())) {
                return moduleTidyNames[moduleName.toLowerCase()];
            }
            return moduleName;
        },
        getModuleImageName: (moduleName: string) => {
            return moduleName.toLowerCase() + ".png";
        }
    }
}));

app.get("/cascade/:cascadeID", async (req: any, res: any) => {
    const cascadeID = req.params.cascadeID;
    res.render("modules", { layout: "cascade", cascadeID: cascadeID });
});

export default app;