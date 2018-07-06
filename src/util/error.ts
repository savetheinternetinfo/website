import log from "./logging";

const sendError = (req, res, err) => {
    let isDev = false;
    let allowedDevDomains = ["localhost:3000", "dev.savetheinternet.info"];
    if (allowedDevDomains.indexOf(req.headers.host) > -1) {
        isDev = true;
    }
    err = typeof err === "object" ? JSON.stringify(err) : err;
    res.status(500);
    res.render("500", {
        "isDev": isDev,
        "message": err
    });
    log.error(err);
};

export default sendError;
