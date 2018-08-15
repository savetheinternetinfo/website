import * as jQuery from "jquery";
import * as validate from "validate.js";
window.jQuery = jQuery;
window.$ = jQuery;

const constraints = {
    from: {
        email: true
    }
};
let transtemp;
let transdata = function(translationString) {
    if (typeof transtemp === "undefined" || !transtemp) {
        jQuery.get("/api/contact/translation").done((data) => {
            transtemp = JSON.parse(data);
            return transtemp[translationString];
        });
    } else {
        return transtemp[translationString];
    }
};

jQuery(() => {
    transdata("contactform_inccorect_email2"); // Call the function once at the start so the tempdata will be filled TODO: Make it better!
    jQuery("#contact-email").keyup(() => {
        let emailVal = jQuery("#contact-email").val();
        let validret = validate({
            from: emailVal
        }, constraints);
        if (typeof validret === "undefined") {
            jQuery("#contact-email-errormsg").empty();
        } else {
            jQuery("#contact-email-errormsg").text(transdata("contactform_inccorect_email2"));
        }
    });

    jQuery("#contact-message").keyup(() => {
        let message = jQuery("#contact-message").val();
        let isEmpty = validate.isEmpty(message);
        if (!isEmpty) {
            jQuery("#contact-message-errormsg").empty();
        } else {
            jQuery("#contact-message-errormsg").text(transdata("contactform_empty_field"));
        }
    });

    jQuery("#send").click(function() {
        let form_data = {
            "reCAPTCHA_VAL": jQuery("#g-recaptcha-response").val(),
            "firstname": jQuery("#contact-first-name").val(),
            "lastname": jQuery("#contact-last-name").val(),
            "email": jQuery("#contact-email").val(),
            "message": jQuery("#contact-message").val()
        };
        jQuery.ajax({
            url: "/api/contact",
            dataType: "json",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(form_data)
        }).done(function(data) {
            if (data.valid && data.send) {
                // reCAPTCHA ist korrekt und die E-Mail wurde versendet
                let htmlTemplate = `
            <div class="bg-green-lightest border-t-4 border-green rounded-b text-green-darkest px-4 py-3 shadow-md" role="alert">
                <div class="flex">
                    <div class="py-1">
                    <i class="fa fa-info text-xl text-green mr-4"></i>
                    </div>
                    <div>
                        <p class="font-bold">${transdata("contactform_send_header")}</p>
                        <p class="text-sm">${transdata("contactform_send_info")}</p>
                    </div>
                </div>
            </div>
            `;
                jQuery("#innerForm").empty();
                jQuery("#contact-form").after(htmlTemplate);
            } else {
                let htmlTemplate = `
            <div class="bg-red-lightest border-t-4 border-red rounded-b text-red-darkest px-4 py-3 shadow-md mb-6" id="alertMessage" role="alert">
                <div class="flex">
                    <div class="py-1">
                            <i class="fa fa-exclamation text-xl text-red mr-4"></i>
                    </div>
                    <div>
                        <p class="font-bold">${transdata("contactform_error_header")}</p>
                        <p class="text-sm">${data.error}</p>
                    </div>
                </div>
            </div>
            `;
                jQuery("#contact-form").after(htmlTemplate);
                jQuery("#alertMessage").delay(2500).fadeOut(300, () => {
                    jQuery("#alertMessage").remove();
                });
            }
        });
    });

});