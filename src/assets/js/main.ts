let langpicker = document.getElementsByClassName("language-picker")[0];
let langMenuTrigger = langpicker.getElementsByClassName('lang-trigger')[0];
let langMenu = langpicker.getElementsByTagName('menu')[0];

langMenuTrigger.addEventListener('click', function() {
    langpicker.classList.toggle('open'),
    langMenu.classList.toggle('hidden');
});

require('./mep');