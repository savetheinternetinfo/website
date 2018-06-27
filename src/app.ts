import * as path    from "path";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as i18n    from "i18n";
import * as cookieP from "cookie-parser";
import * as fs      from "fs";

import log    from "./util/logging";
import config from "./config";

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

app.locals.assets = require("../public/mix-manifest.json");

// i18n stuff
let availableLanguages = Object.keys(i18n.getCatalog());
app.locals.languages = availableLanguages;

require("./controllers/router")(app);

app.listen(app.get("port"), config.server.localhost_only ? "localhost" : null, function(err){
    log.info("Listening on port " + app.get("port") + (config.server.localhost_only ? " localhost only..." : "..."));
});
