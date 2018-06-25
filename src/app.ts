import * as path    from "path";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as i18n    from "i18n";
import * as cookieP from "cookie-parser";
import * as fs from 'fs';
import * as moment from 'moment'
import TwitterService from './services/TwitterService'

import log from "./util/logging";

import config from "./config";

import GalleryController from './controllers/gallery';

const app = express();

log.info("Started.");

i18n.configure({
    directory: "./src/languages",
    cookie: config.server.cookieprefix + "lang",
    defaultLocale: "en",
    queryParameter: "lang"
});

app.enable("trust proxy");

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(cookieP());
app.use(express.static("./public"));
app.use(favicon("./src/assets/favicon.png"));
app.use(i18n.init);
app.set("port", config.server.port);

app.locals.assets = require('../public/mix-manifest.json');

/*
    i18n stuff
 */
let availableLanguages = Object.keys(i18n.getCatalog());
app.locals.languages = availableLanguages;

app.use((req, res, next) => {
    let currentLocale = i18n.getLocale(req);
    app.locals.currentLanguage = currentLocale;
    app.locals.currentRoute = req.path.replace(/^\/|\/$/g, '');

    res.cookie(config.server.cookieprefix + "lang", currentLocale, {maxAge: 9000, httpOnly: true});

    next();
});

//require("./routes/router")(app);
let twitter = new TwitterService(config.twitter);

app.get('/', (req, res) => {
    // Get tweets by hashtag
    let currentLocale = i18n.getLocale(req);
    twitter.getTweet().then((tweets) => {
        res.render('index', {"tweets": tweets.statuses, "moment": moment, "currLang": currentLocale});
    }).catch((err) => {
        res.render('index');
    });
});

const galleryController = new GalleryController();
// Because express fucking rebinds `this`
app.get('/gallery', (req, res, next) => galleryController.index(req, res, next));

app.get('/:page', (req, res) => {
    // Allow letters, numbers and hyphens
    let page = req.params.page.replace(/[^A-Za-z0-9\-]/g,'');

    if(fs.existsSync(`./src/views/${page}.ejs`)) {
        res.render(page);
    } else {
        res.render('404');
    }
});

app.listen(app.get("port"), "localhost", function(err){
    log.info("Listening on port " + app.get("port") + "...");
});
