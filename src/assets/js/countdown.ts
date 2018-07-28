import * as moment from 'moment';

// Set the date we're counting down to
var countDownDate = new Date("Sep 12, 2018 10:00:00").getTime();
var targetDate = moment('2018-09-12 10:00:00').locale(document.documentElement.getAttribute('lang'));

const countdowns = document.getElementsByClassName('countdown');

const setCountdown = function() {
    // Get todays date and time
    var now = new Date().getTime();
  
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
      console.log(distance)
  
    for (i = 0; i < countdowns.length; i++) {
      countdowns[i].innerHTML = targetDate.fromNow(true);
    }
  
    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      for (var i; i < countdowns.length; i++) {
          countdowns[i].innerHTML = "Hoffentlich wart ihr nicht zu faul!"
      };
    }
  }
// Update the count down every 1 second
var x = setInterval(setCountdown, 1000);
setCountdown();
