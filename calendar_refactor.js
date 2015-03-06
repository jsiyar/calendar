// Define some global variables for calendar construction
weekDays = ['S', 'M', 'T', 'W', 'H', 'F', 'S'];

weekdaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
							  'Friday', 'Saturday'];

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'Spetember', 'October', 'November', 'December'];

daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

today = new Date();

// Define Calendar class
function Calendar(month, year) {
	this.month = (month == null) ? today.getMonth() : month;
	this.year = (year == null) ? today.getFullYear() : year;
	this.htmlOutput = '';
}

// Functions for navigating months
Calendar.prototype.displayPrevMonth = function(month, year) {
  this.month = (month === 0) ? 11 : month - 1;
  if (this.month === 11) {
    this.year = year - 1;
  }
  cal.generateHTML();
  document.getElementById("calendar").innerHTML=cal.htmlOutput;
  cal.dateDisplay();
}
Calendar.prototype.displayNextMonth = function(month, year) {
  this.month = (month === 11) ? 0 : month + 1;
  if (this.month === 0) {
    this.year = year + 1;
  }
  cal.generateHTML();
  document.getElementById("calendar").innerHTML=cal.htmlOutput;
  cal.dateDisplay();
}

// Generate HTML calendar table
Calendar.prototype.generateHTML = function() {
	var first_day_in_month = new Date(this.year, this.month, 1);

	var start_day_of_week = first_day_in_month.getDay();

	var last_day = daysPerMonth[this.month];

	// For leap years
	if (this.month === 1) {
		if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
			last_day = 29;
		}
	}

	var monthName = months[this.month];
	var todaysDate = today.getDate();
	var selectedDate = (this.month === today.getMonth()
											&& this.year === today.getFullYear())
											? null : new Date(this.month + ' 1,', this.year);
	var display = (selectedDate || today);
	var displayDay = weekdaysLong[displayDate.getDay()];
	var displayDate = display.getDate();

	var htmlOutput = '<table id="calendar"><td>'
	htmlOutput += '<table class="big-day"><tr><td id="display-day">'
	htmlOutput += displayDay;
	htmlOutput += '</td></tr><tr><td id="display-date">';
	htmlOutput += displayDate;
	htmlOutput += '</tr></td></table></td>';

	htmlOutput += '<td><table class="cal-month">';
	htmlOutput += '<tr class="cal-header"><td id="prev-month" class="month-nav">&#10094;</td>';
	htmlOutput += '<th colspan="5">' + monthName + "&nbsp;" + this.year + '</th>';
	htmlOutput += '<td id="next-month" class="month-nav">&#10095;</td></tr>';

	htmlOutput += '<tr class="cal-header-days">';
	for (var i = 0; i < 7; i++) {
  	htmlOutput += '<td class="cal-header-day">';
  	htmlOutput += weekDays[i];
  	htmlOutput += '</td>';
	}
	htmlOutput += '</tr><tr>';

	var day = 1;

  // Loop for weeks
	for (i = 0; i < 7; i++) {
    // Loop for days
		for (j = 0; j < 7; j++) {
			
			// Highlight current day in the calendar
      if (this.month === today.getMonth() && this.year == today.getFullYear() &&
      		day === today.getDate()) {
        htmlOutput += '<td id="today" class="cal-day">';
        htmlOutput += day;
        day++;
			} else {
			 	// Determine starting cell in first row
        if ((day <= last_day) && (i > 0 || j >= start_day_of_week)) {
        	htmlOutput += '<td class="cal-day">';
				  htmlOutput += day;
				  day++;
        } else {
          htmlOutput += '<td>'
        }
			}
			htmlOutput += '</td>';
		}

		if (day > last_day) {
			break;
		}	else {
			htmlOutput += '</tr><tr>';
		}
	}
	htmlOutput += '</tr></table></td></table>';

	this.htmlOutput = htmlOutput;
}

Calendar.prototype.showHTML = function() {
  return this.htmlOutput;
}

Click on a cell to display the date
Calendar.prototype.dateDisplay = function() {
	var cells = document.getElementsByClassName("cal-day");

	for (var i = 0; i < cells.length; i++) {
  	cells[i].addEventListener('click', function(i) {
    	return function() {
      	document.displayDate = cells[i].innerHTML;
      	document.display = document.displayDate
      	document.getElementById("display-day").innerHTML = document.displayDay;
      	document.getElementById("display-date").innerHTML = document.displayDate;
    	};
		}(i));
	}
}

// Calendar.prototype.dateDisplay = function() {
// 	var cells = document.getElementsByClassName("cal-day");
// 	for (var i = 0; i < cells.length; i++) {
// 		document.onclick = function(event) {
// 			document.displayDate = event.target.innerHTML;
// 			document.getElementById("display-date").innerHTML = document.displayDate;
// 		}
// 	}
// }

// Create calendar object and write
var cal = new Calendar();
cal.generateHTML();
document.write(cal.showHTML());
cal.dateDisplay();

// Navigate months by clicking on arrows in calendar
var tags = document.getElementsByTagName("td");
for (i = 0; i < tags.length; i++) {
  document.onclick = function(event) {
    switch (event.target.id) {
    case "prev-month":
      cal.displayPrevMonth(cal.month, cal.year);
      break;
    case "next-month":
      cal.displayNextMonth(cal.month, cal.year);
      break;
    default:
      return false;
    }
  }
}

// Use left and right arrow keys to switch between months
document.onkeydown = function(event) {
  switch (event.keyCode) {
  case 39:
    cal.displayNextMonth(cal.month, cal.year);
    break;
  case 37:
    cal.displayPrevMonth(cal.month, cal.year);
    break;
 	}
 	return true;
}
