var timer;
//Goes chronologically
function isNextPhase(phase) {

  //this arg will be supplied as current date
  var todays_time = this.valueOf()
  var phase_time = Date.parse(phase.date + ' ' + phase.time)
  return phase_time > todays_time
}

function timeBetweenDates(toTime) {
  var now = new Date();
  var difference = toTime - now.getTime();

  if (difference <= 0) {

    // Timer done
    clearInterval(timer);
    
    //reset
    init()
  } else {
    
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    var countdown_string = days + " Days, " + hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds."
    
    //Set countdown element
    document.getElementById("countdown").innerHTML = countdown_string 
  }
}

//init function
function init() {

$.getJSON("/phase_data/2017.json", function(data) {
  //Data is in UT

  //Get current date and time in UT
  var now = new Date()
  var todays_time = now.getTime()

  //Find the next date after now
  var next_phase = data.phasedata.find(isNextPhase, todays_time)

  //Get time of phase in UT
  var next_phase_time = Date.parse(next_phase.date + ' ' + next_phase.time)

  //Set timer
  timer = setInterval(function() {
    timeBetweenDates(next_phase_time);
  }, 1000);

  //Set phase string
  document.getElementById("next_phase").innerHTML = next_phase.phase 

});
}

init();