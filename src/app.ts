import * as path    from "path";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as i18n    from "i18n";
import * as cookieP from "cookie-parser";

import * as log from "./utils/logger";
import { default as config } from "../config";

const app = express();

log("Started.");

/*
i18n.configure({
    directory: "./src/languages",
    cookie: config.server.cookieprefix + "lang",
    defaultLocale: "en"
});
*/

app.enable("trust proxy");

app.set("view engine", "ejs");
app.use(cookieP());
app.use(express.static("./src/assets"));
app.use(favicon("./src/assets/favicon.png"));
app.use(i18n.init);
app.set("port", config.server.port);

//require("./routes/router")(app);

app.listen(app.get("port"), function(err){
    log("Listening on port " + app.get("port") + "...");
});
