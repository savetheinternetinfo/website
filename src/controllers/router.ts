import * as moment from "moment";
import * as i18n from "i18n";
import * as fs from "fs";
import * as bodyparser from "body-parser";

import TwitterService from "../services/TwitterService";
import config from "../config";
import GalleryController from "../controllers/gallery";
import MemeController from "../controllers/memes";
import GoogleService from "../services/GoogleService";
import sendError from "../util/error";
import MetaService from "../services/MetaService";
import ContactService from "../services/ContactService";
import DemomapService from "../services/DemomapService";

let twitter = new TwitterService(config.twitter);
let google = new GoogleService(config.google);
let meta = new MetaService(config.meta);
let contact = new ContactService(config.recaptcha, config.smtp);
let demomap = new DemomapService(config.demomap);

export function router(app) {
  app.use((req, res, next) => {
    app.locals.currentLanguage = i18n.getLocale(req);
    app.locals.currentRoute = req.path.replace(/^\/|\/$/g, "");

    if (req.query.lang) {
      res.cookie(config.server.cookieprefix + "lang", req.query.lang, {
        maxAge: 900000,
        httpOnly: true
      });
      i18n.setLocale(req.query.lang);
      return res.redirect(req.originalUrl.split("?").shift());
    }

    //if (req.cookies._stilang) i18n.setLocale(req.cookies._stilang);
    res.header("X-Language", i18n.getLocale(req));
    res.vary("X-Language");
    next();
  });
  app.use(bodyparser.json());

  app.get("/", (req, res) => {
    // Get tweets by hashtag
    let currentLocale = i18n.getLocale(req);
    twitter
      .getTweet()
      .then(tweets => {
        res.render("index", {
          tweets: tweets.statuses,
          moment: moment,
          currLang: currentLocale
        });
      })
      .catch(err => {
        sendError(req, res, err);
      });
  });

  app.get("/mapcoords", (req, res) => {
    demomap.getCoords(req, res);
  });

  app.get("/pressreview", (req, res) => {
    let currentLocale = i18n.getLocale(req);
    if (currentLocale === "de") {
      google
        .getData()
        .then(ret => {
          res.render("pressreview", {
            rows: ret.values
          });
        })
        .catch(err => {
          sendError(req, res, err);
        });
    } else {
      res.render("404");
    }
  });

  app.get("/contact", (req, res) => {
    res.render("contact", {
      recaptcha_sitekey: config.recaptcha.siteKey
    });
  });

  app.post("/api/contact", (req, res) => {
    contact.sendContact(req, res);
  });

  app.get("/api/contact/translation", (req, res) => {
    contact.getTranslation(req, res);
  });

  const galleryController = new GalleryController();
  // Because express rebinds `this`
  app.get("/gallery", (req, res, next) =>
    galleryController.index(req, res, next)
  );

  const memeController = new MemeController();
  app.get("/memes", (req, res, next) => memeController.index(req, res, next));

  app.get("/:page", (req, res) => {
    // Allow letters, numbers and hyphens
    let page = req.params.page.replace(/[^A-Za-z0-9\-]/g, "");

    if (fs.existsSync(`./src/views/${page}.ejs`)) res.render(page);
    else res.render("404");
  });

  app.get("/api/meta", (req, res) => {
    if (req.query.q === undefined) {
      return res.send("'q' is a required parameter");
    }

    meta
      .get(req.query.q)
      .then(metaData => {
        let item = req.query.item;
        if (item === undefined) {
          res.send(metaData);
        } else if (metaData.hasOwnProperty(item)) {
          res.send(metaData[item]);
        } else {
          res.send("error: item not found");
        }
      })
      .catch(err => {
        res.send(err.message);
      });
  });
}
