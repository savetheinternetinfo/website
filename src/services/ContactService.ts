import * as reCAPTCHA from "recaptcha2";


class ContactService {

    private config;
    private recaptcha;
    constructor(config) {
        this.recaptcha = new reCAPTCHA(config);
    }

    getCaptcha(): any {
        return this.recaptcha.formElement();
    }
}

export default ContactService;
