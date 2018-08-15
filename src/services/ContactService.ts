import * as reCAPTCHA from "recaptcha2";
import * as validate from "validate.js";
import * as nodemailer from "nodemailer";
import log from "../util/logging";

class ContactService {
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

    getTranslation(req, res): any {
        res.send(JSON.stringify({
            "contactform_inccorect_email2": res.__("contactform_inccorect_email2"),
            "contactform_empty_field": res.__("contactform_empty_field"),
            "contactform_send_header": res.__("contactform_send_header"),
            "contactform_send_info": res.__("contactform_send_info"),
            "contactform_error_header": res.__("contactform_error_header"),
        }));
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
                    }
                    else {
                        firstname = req.body.firstname;
                    }
                    let lastname;
                    if (validate.isEmpty(req.body.lastname)) {
                        lastname = "Nachname nicht angegeben";
                    }
                    else {
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
                                "error": res.__("contactform_general_error")
                            }));
                            log.error(error);
                        }
                        else {
                            res.send(JSON.stringify({
                                "valid": true,
                                "send": true
                            }));
                        }
                    });
                }
                else {
                    // Nachricht ist leer!
                    res.send(JSON.stringify({
                        "valid": true,
                        "send": false,
                        "error": res.__("contactform_empty_message"),
                    }));
                }
            }
            else {
                // E-Mail ist nicht korrekt!
                res.send(JSON.stringify({
                    "valid": true,
                    "send": false,
                    "error": res.__("contactform_incorrect_email")
                }));
            }
        }).catch((errorCodes) => {
            // reCAPTCHA ist nicht korrekt
            res.send(JSON.stringify({
                "valid": false,
                "send": false,
                "error": res.__("contactform_fillout_recaptcha")
            }));
        });
    }
}

export default ContactService;
