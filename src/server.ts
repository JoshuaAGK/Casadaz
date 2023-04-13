const express = require('express');
const bodyParser = require('body-parser');
import apiRoutes from './api/api';
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3000);
app.use('/', apiRoutes);
export default app;