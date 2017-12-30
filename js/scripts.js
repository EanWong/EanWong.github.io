
var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
var timer;
//Goes chronologically
function isNextPhase(phase) {

  //this arg will be supplied as current date
  var todays_time = this.valueOf();

  var phase_time = getDateFromPhaseData(phase).getTime()

  return phase_time > todays_time
}

function getDateFromPhaseData(phase_datum) {

  var p_date = phase_datum.date.split(" ");
  var p_time = phase_datum.time.split(":");
  var p_year = p_date[0],
      p_month = months.indexOf(p_date[1].toLowerCase()),
      p_day = p_date[2],
      p_hour = p_time[0],
      p_minute = p_time[1];

  return new Date(p_year, p_month, p_day, p_hour, p_minute)
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

$.getJSON("/phase_data/2018.json", function(data) {
  //Data is in UT

  //Get current date and time in UT
  var now = new Date()
  var todays_time = now.getTime()

  //Find the next date after now
  var next_phase = data.phasedata.find(isNextPhase, todays_time)

  //Get time of phase in UT
  var next_phase_time = getDateFromPhaseData(next_phase).getTime();

  //Set timer
  timer = setInterval(function() {
    timeBetweenDates(next_phase_time);
  }, 1000);

  //Set phase string
  document.getElementById("next_phase").innerHTML = next_phase.phase 

  //Set initial phase countdown string
  timeBetweenDates(next_phase_time);
});
}

init();  
