let langpicker = document.getElementsByClassName("language-picker")[0];
let langMenuTrigger = langpicker.getElementsByClassName('lang-trigger')[0];
let langMenu = langpicker.getElementsByTagName('menu')[0];

langMenuTrigger.addEventListener('click', function() {
    langpicker.classList.toggle('open'),
    langMenu.classList.toggle('hidden');
});

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

require('./mep');