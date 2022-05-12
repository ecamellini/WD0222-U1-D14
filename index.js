/*
MEMORY OF THE APPLICATION:
It's where we store the meetings, the current state of the application.
The initial state is:
- No meetings

Every time you add a meeting --> you modify the state of the app, you add a meeting.

---
*/

// MODELING AN APPOINTMENT
// A meeting is represented by:
// - time
// - title
// Let's assume both of these are strings.
let exampleMeeting = {
  time: "09:00",
  title: "Lecture"
}

// MODELING A DAY
// A day is a list of appointments
let exampleDay = [
  { time: "9:00", title: "Lecture"},
  { time: "13:00", title: "Lunch"},
  { time: "20:00", title: "Football with friends"}
]

// MODELING OUR CALENDAR
// A calendar for us is 30 days.
// A list of days.
// Which means a list of lists of objects (each object is an appointment).
let appointments = [
  [ { time: "9:00", title: "Lecture"}, { time: "12:00", title: "Lunch"} ], // First day
  [ { time: "14:00", title: "Coffee"} ], // Second day
  [ { time: "15:00", title: "Running"}, { time: "16:00", title: "Coding"} ] // Third day
  // Etc. etc.
  // This will be 30 items...one list of appointments for each day.
]

/* ----------------------------------------------------------- */


// Constant value, available to all our JS file.
const daysToDisplay = 30
//        ^^^ Assumption, always 30 days, no detection of current month right now

function displayDays() {
  // We want to create 30 tags like these:
  // <div class="day">1</div>

  // We do it here because we don't need to get it 30 times...
  let daysArea = document.getElementById('days-area')

  for (let day = 1; day <= daysToDisplay; day++) {

    // 1) We create the tag, the element
    let dayNode = document.createElement('div')

    // 2) We customize it
    dayNode.classList.add('day')
    dayNode.innerText = day
    dayNode.addEventListener("click", selectDay) // this will give the event info object to the function
    dayNode.addEventListener("click", showAppointments)

    // 3) We attach it to the DOM, append
    daysArea.appendChild(dayNode)
  }
}

function selectDay(event) { // We get the event object as a parameter
  // 1) Get the previously selected node
  // document.getElementsByClassName('selected')[0]
  let previouslySelectedNode = document.querySelector('.day.selected')

  // 2) Remove the class from there
  if (previouslySelectedNode !== null) {
    // If previously selecte node IS null, it's the first node we select,
    // we do not need to remove the selected class
    // because we have no previous node
    previouslySelectedNode.classList.remove('selected')
  }

  // 3) We get the clicked node
  let clickedNode = event.target
  // ^^^ This is the .day div

  // 4) We add the class there
  clickedNode.classList.add("selected")
}

function showAppointments() {
  // In this function we go from data to some visualization of the data in the UI.
  // In this case, from appointments to <li> tags...
  // Data is in variables in our program.
  // Usually it comes from somewhere else, from the database, from the back-end.

  let selectedDayNode = document.querySelector('.day.selected')
  let selecetdDayNumber = selectedDayNode.innerText

  // For every appointment in my list of appointments
  // we need to create a new li, and attach it to the appointments-list
  let appointmentsForTheDay = appointments[selecetdDayNumber - 1]

  let appointmentsUlNode = document.getElementById('appointments-list')

  // Before adding the LI tags for the selected day appointments
  // we need to clear the appointment UL.
  // We don't want to see also the appointments for other days...
  appointmentsUlNode.replaceChildren([])
  // ^^ We are replacing the children of the UL with an empty list of children...
  // So we are removing them, basically.

  for (let i = 0; i < appointmentsForTheDay.length; i++) {
    let appointment = appointmentsForTheDay[i]

    // 1) We create the new li
    let newLiNode = document.createElement('li')

    // 2) We customize it
    newLiNode.innerText = appointment.time + " - " + appointment.title

    // 3) Append it/attach it to the DOM, to its parent element
    appointmentsUlNode.appendChild(newLiNode)
  }
}


function saveAppointment() {
  // Create a new appoinment object using the input values
  let timeInputValue = document.getElementById('appointment-time').value
  let titleInputValue = document.getElementById('appointment-title').value
  let appointment = {
    time: timeInputValue,
    title: titleInputValue
  }

  // We get the selected day number
  let selectedDayNode = document.querySelector('.day.selected')
  let selecetedDayNumber = selectedDayNode.innerText

  appointments[selecetedDayNumber - 1].push(appointment)

  // We also need to call showAppointments so that the new appointment
  // is displayed.
  // Actually, this will re-desplay all of them, for the selected day.
  showAppointments()
}


function executeOnLoad() {
  // We write everything we want to happen on load.
  displayDays()
}
window.onload = executeOnLoad // No need to call it.
// In JS, when we pass a function as a parameter, or as a value
// in an assignment for example, we do not call it.
// It will be called onload, in this case...

// The only moment where you have to call the function is:
// - When you want to actually execute it right there
// - When you write inside the HTML, for example inside the onclick
