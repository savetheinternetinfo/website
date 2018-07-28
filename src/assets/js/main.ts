import './mep';
import './countdown';
const Typed = require('typed.js'); // It fails with a TS import

let langpicker = document.getElementsByClassName("language-picker")[0];
let langMenuTrigger = langpicker.getElementsByClassName('lang-trigger')[0];
let langMenu = langpicker.getElementsByTagName('menu')[0];

langMenuTrigger.addEventListener('click', function() {
    langpicker.classList.toggle('open'),
    langMenu.classList.toggle('hidden');
});

// it contains "the" for SEO, remove it as it messes up typed.js
document.getElementById('head-typer').innerHTML = "";
new Typed('#head-typer', {
    strings: ['the', 'your', 'our', 'her', 'his', 'their'],
    typeSpeed: 130,
    backSpeed: 80,
    loop: true,
    smartBackspace: false,
    shuffle: true,
    backDelay: 1400,
})

/*
    Twitter Stuff
*/
function showTweet(interval) {
    let tweets = Array.from(document.querySelectorAll('.section-twitter>.tweet-container:not(.fade)'));
    if(tweets.length === 0) {
        clearInterval(interval);
    } else {
        let tweet = tweets[0];
        tweet.classList.add("fade");
        tweet.classList.remove("hidden");
        let twitterSection = document.getElementsByClassName("section-twitter");
        twitterSection[0].scrollTop = twitterSection[0].scrollHeight;
    }

}
showTweet(null);
var fadeInterval = setInterval(function() { showTweet(fadeInterval) }, 60000);