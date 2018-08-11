import * as jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;
jQuery(() => {
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
        }).done(function( data ) {
            console.log(data);
          });
      });
});