import * as reCAPTCHA from "recaptcha2";
import * as validate from "validate.js";
import * as nodemailer from "nodemailer";
import log from "../util/logging";

class ContactService {

    private config;
    public recaptcha;
    private constraints;
    private transporter;
    private configSMTP;
    constructor(configReCaptcha, configSMTP) {
        this.configSMTP = configSMTP;
        let smtpConnectionObj = {
            host: configSMTP.server,
            port: configSMTP.port,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: configSMTP.username,
                pass: configSMTP.password
            },
            tls: {
                rejectUnauthorized: false
            }
        };
        console.log(smtpConnectionObj);
        this.transporter = nodemailer.createTransport(smtpConnectionObj);
        this.transporter.verify((error, success) => {
            if (error) {
                log.error(error);
            } else {
                log.info("Connection to SMTP Server established!");
            }
        });
        this.recaptcha = new reCAPTCHA(configReCaptcha);
        this.constraints = {
            from: {
                email: true
            }
        };
    }

    sendContact(req, res): any {
        this.recaptcha.validate(req.body.reCAPTCHA_VAL).then(() => {
            // reCAPTCHA ist korrekt
            // Überprüfen ob die E-Mail Korrekt ist
            let validret = validate({from: req.body.email}, this.constraints);
            if (typeof validret === "undefined") {
                // E-Mail ist korrekt!
                // Überprüfen ob die Nachricht leer ist
                let isEmpty = validate.isEmpty(req.body.message);
                if (!isEmpty) {
                    // Nachricht ist nicht leer!
                    // Wir können senden!
                    let firstname;
                    if (validate.isEmpty(req.body.firstname)) {
                        firstname = "Vorname nicht angegeben";
                    } else {
                        firstname = req.body.firstname;
                    }
                    let lastname;
                    if (validate.isEmpty(req.body.lastname)) {
                        lastname = "Nachname nicht angegeben";
                    } else {
                        lastname = req.body.lastname;
                    }
                    let message = "Sie haben eine neue Anfrage über das Kontaktformular!\n" +
                    "Vorname: " + firstname + "\n" +
                    "Nachname: " + lastname + "\n" +
                    "E-Mail Adresse: " + req.body.email + "\n" +
                    "Nachricht:\n" +
                    "-------------------------------------------\n" +
                    req.body.message + "\n" +
                    "-------------------------------------------";
                    let mailOptions = {
                        from: "\"Kontaktformular - Save The Internet\" <" + this.configSMTP.username + ">", // sender address
                        to: this.configSMTP.reciever, // list of receivers
                        subject: "Kontaktanfrage vom Kontakformular", // Subject line
                        text: message
                    };
                    this.transporter.sendMail(mailOptions, function(error, info){
                        if (error){
                            res.send(JSON.stringify({
                                "valid": true,
                                "send": false,
                                "error": "Es ist ein Fehler beim Senden der Anfrage aufgetreten, bitte versuchen Sie es erneut!"
                            }));
                            log.error(error);
                        } else {
                            res.send(JSON.stringify({
                                "valid": true,
                                "send": true
                            }));
                        }
                    });
                } else {
                    // Nachricht ist leer!
                    res.send(JSON.stringify({
                        "valid": true,
                        "send": false,
                        "error": "Sie haben keine Nachricht eingegeben!"
                    }));
                }
            } else {
                // E-Mail ist nicht korrekt!
                res.send(JSON.stringify({
                    "valid": true,
                    "send": false,
                    "error": "Die von Ihnen eingegebene E-Mail Adresse ist nicht korrekt!"
                }));
            }
        }).catch((errorCodes) => {
            // reCAPTCHA ist nicht korrekt
            res.send(JSON.stringify({
                "valid": false,
                "send": false,
                "error": "Sie müssen das reCAPTCHA ausfüllen!"
            }));
        });
    }
}

export default ContactService;
