import * as moment from "moment";
import * as i18n   from "i18n";
import * as fs     from "fs";

import TwitterService    from "../services/TwitterService";
import config            from "../config";
import GalleryController from "../controllers/gallery";

let twitter = new TwitterService(config.twitter);

export function router(app){
    app.use((req, res, next) => {
        app.locals.currentLanguage = i18n.getLocale(req);
        app.locals.currentRoute = req.path.replace(/^\/|\/$/g, '');

        if (req.query.lang){
            res.cookie(config.server.cookieprefix + "lang", req.query.lang, {
                maxAge: 900000,
                httpOnly: true
            });
            i18n.setLocale(req.query.lang);
            return res.redirect(req.originalUrl.split("?").shift());
        }

        if (req.cookies._stilang) i18n.setLocale(req.cookies._stilang);

        next();
    });

    app.get("/", (req, res) => {
        // Get tweets by hashtag
        let currentLocale = i18n.getLocale(req);
        twitter.getTweet().then((tweets) => {
            res.render("index", {
                "tweets": tweets.statuses,
                "moment": moment,
                "currLang": currentLocale
            });
        }).catch((err) => {
            res.render("index");
        });
    });

    const galleryController = new GalleryController();
    // Because express fucking rebinds `this`
    app.get("/gallery", (req, res, next) => galleryController.index(req, res, next));

    app.get("/:page", (req, res) => {
        // Allow letters, numbers and hyphens
        let page = req.params.page.replace(/[^A-Za-z0-9\-]/g,'');

        if (fs.existsSync(`./src/views/${page}.ejs`)) res.render(page);
        else res.render("404");
    });
}
