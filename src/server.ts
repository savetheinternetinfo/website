import 'reflect-metadata';

import Bluebird = require('bluebird');
global.Promise = Promise = Bluebird;

import './routesImport';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as favicon from 'serve-favicon';

import {RegisterRoutes} from './routes';
import {beforeMiddleware, afterMiddleware} from './middleware';

Bluebird.onPossiblyUnhandledRejection(console.error);

(async () => {
    console.log('Starting server...');
    const port = process.env.PORT || 80;
    const app = express();

    const debug = /--debug|--inspect/.test(process.execArgv.join(' '));
    const viewsFolders = [];
    if (debug) {
        app.locals.assets = require(__dirname + '\\..\\public\\assets\\manifest.json');
        viewsFolders.push(__dirname + '\\..\\src\\views');
    } else {
        app.locals.assets = require(__dirname + '\\public\\assets\\manifest.json');
        viewsFolders.push(__dirname + '\\views');
    }

    app.set('view engine', 'ejs');
    app.set('views', viewsFolders);
    app.use(favicon('./src/assets/favicon.png'));
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({
        limit: 1e+8
    }));
    app.use(methodOverride());

    beforeMiddleware(app);
    RegisterRoutes(app);
    afterMiddleware(app);

    console.log(`Starting server on port ${port}...`);
    app.listen(port);

})();

