import * as jQuery from 'jquery';

let componentRoot = jQuery('.contact-your-mep');
let gridRoot = componentRoot.find('.mep-grid');
let mepItems = gridRoot.find('.mep-item');

if(gridRoot.length > 0) {
    gridRoot.find('.open-overlay').on('click', event => {
       jQuery(event.currentTarget).closest('figure').toggleClass('open');
    });
    gridRoot.find('.close-overlay').on('click', event => {
        jQuery(event.currentTarget).closest('figure').toggleClass('open');
    });

    componentRoot.find('select#country-sel').on('change', event => {
        let selection = jQuery(event.currentTarget).val();
        if (typeof selection === 'string') selection = selection.toLowerCase();

        mepItems.show();
        mepItems.not(`.${selection}`).hide();
    });
}