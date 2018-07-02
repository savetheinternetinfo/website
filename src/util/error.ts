const sendError = (req, res, err) => {
    let isDev = false;
    let allowedDevDomains = ["localhost:3000", "dev.savetheinternet.info"];
    if (allowedDevDomains.indexOf(req.headers.host) > -1) {
        isDev = true;
    }
    res.render("500", {
        "isDev": isDev,
        "message": err
    }).status(500);
};

export default sendError;