require('dotenv').config();
const port = 8080;

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {routes} from "./routes";
import {errorHandler} from "./middleware/error";

import * as express from 'express';

import {registerServices, ServiceLocator} from "./serviceLocator/serviceLocator";

(async function () {
    const serviceLocator = new ServiceLocator();
    await registerServices(serviceLocator);



    const app = express();

    app.locals.serviceLocator = serviceLocator;

    app.use(bodyParser.json());
    app.use(cors());
    routes.forEach(route => app.use(route));

    app.use(errorHandler);

    app.listen(port, () => console.log('\x1b[32m%s\x1b[0m', 'Server started'));
})();