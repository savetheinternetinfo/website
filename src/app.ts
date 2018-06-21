import * as path    from "path";
import * as express from "express";
import * as favicon from "serve-favicon";
//import * as i18n    from "i18n";
import * as cookieP from "cookie-parser";

import log from "./util/logging";

import config from "./config";

const app = express();

log.info("Started.");

/*
i18n.configure({
    directory: "./src/languages",
    cookie: config.server.cookieprefix + "lang",
    defaultLocale: "en"
});
*/

app.enable("trust proxy");

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(cookieP());
app.use(express.static("./public"));
app.use(favicon("./src/assets/favicon.png"));
//app.use(i18n.init);
app.set("port", config.server.port);

app.locals.assets = require('../public/assets/manifest.json');

//require("./routes/router")(app);

app.get('/', (req, res) => {
    res.render('index', {foo: 'FOO'})
})

app.listen(app.get("port"), function(err){
    log.info("Listening on port " + app.get("port") + "...");
});
