
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
