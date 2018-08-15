import * as moment from "moment";

// Set the date we're counting down to
let targetDate = moment("2018-08-26 10:00:00").locale(document.documentElement.getAttribute("lang"));

const countdowns = document.getElementsByClassName("countdown");

const setCountdown = function () {
  if (moment().isAfter(targetDate)) {
    clearInterval(x);
    for (let i = 0; i < countdowns.length; i++) {
      countdowns[i].classList.add("hidden");
    }
    let countdownDone = document.getElementsByClassName("countdown-done");
    for (let i = 0; i < countdownDone.length; i++) {
      countdownDone[i].classList.remove("hidden");
    }
    return;
  }
  
  for (let i = 0; i < countdowns.length; i++) {
    countdowns[i].innerHTML = targetDate.fromNow();
  }
};

// Update the count down every 1 second
let x = setInterval(setCountdown, 1000);
setCountdown();
