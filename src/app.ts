import * as express  from "express";
import * as favicon  from "serve-favicon";
import * as i18n     from "i18n";
import * as path     from "path";
import * as cookieP  from "cookie-parser";
import * as githook  from "express-github-webhook";
import * as bParser  from "body-parser";

import { exec } from "child_process";

import log    from "./util/logging";
import config from "./config";

import { router } from "./controllers/router";

let hook = githook({
    path:   "/githook",
    secret: config.server.hook.githook_secret
});

let puts = function(err, stdout, stderr){
    if (err) return log.error(err);
    log.info(stdout);
};

const app = express();

log.info("Started.");


const appPort = config.server.port || 3000;

if (!config.server.port) log.warn("No port specified. Using default: 3000");

if (appPort < 1 || appPort > 65535){
    log.error("Invalid port specified. Stopping...");
    process.exit(1);
}


i18n.configure({
    directory: "./src/languages",
    cookie: config.server.cookieprefix + "lang",
    defaultLocale: "en",
    queryParameter: "lang",
    updateFiles: false,
    autoReload: true,
});

app.enable("trust proxy");

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bParser.json());
app.use(hook);
app.use(cookieP());
app.use(express.static("./public"));
app.use(favicon("./src/assets/favicon.png"));
app.use(i18n.init);
app.set("port", appPort);

app.locals.assets = require("../public/mix-manifest.json");

// i18n stuff
let availableLanguages = Object.keys(i18n.getCatalog());
app.locals.languages = availableLanguages;

router(app);

hook.on("push", function(repo, data){
    log.info(`Received push event for ${repo}`);
    let command = "cd " + path.join(__dirname, "..");
    let cmdArr = config.server.hook.githook_commands;
    for (let i in cmdArr) command += " && " + cmdArr[i];
    exec(command, puts);
});

app.listen(app.get("port"), config.server.localhost_only ? "localhost" : null, function(err){
    log.info("Listening on port " + app.get("port") + (config.server.localhost_only ? " localhost only..." : "..."));
});
