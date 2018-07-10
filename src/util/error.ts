import log from "./logging";

const sendError = (req, res, err) => {
    let isDev = false;
    let allowedDevDomains = ["localhost:3000", "dev.savetheinternet.info"];
    if (allowedDevDomains.indexOf(req.headers.host) > -1) {
        isDev = true;
    }
    if (typeof err === "object") {
        if (err.hasOwnProperty("message")) {
            err = err.message;
        }
        else {
            console.error(err);
            err = "Error is too large to show. Look at the console for details.";
        }
    }
    res.status(500);
    res.render("500", {
        "isDev": isDev,
        "message": err
    });
    log.error(err);
};

export default sendError;
