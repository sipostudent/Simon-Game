/*
    Variables
    ---------
*/
let sequence = []; // Light sequence monitor
let playersequence = []; // Selected sequence monitor
let light; // Integer for number of lights displayed in game
let attempt; // User attempt tracker
let success; // Boolean true/false to monitor user success rate of correct/incorrect choices
let cpuTry; // Boolean true/false to track who's attempt, i.e. cpu or user
let intervalId; // Execution and pause duration time signifier
let strict = false; // Strictmode activity status monitor/always starts false to represent unchecked
let sound = true; // Sound activity monitor/starts true to represent sounds active when game is activated
let on = false; // Game activation monitor/starts false to signify deactivated
let win; // Will say if user has won the game

const sound1 = new Audio("assets/sounds/btnGreen.mp3");
const sound2 = new Audio("assets/sounds/btnRed.mp3");
const sound3 = new Audio("assets/sounds/btnYellow.mp3");
const sound4 = new Audio("assets/sounds/btnBlue.mp3");
const sound5 = new Audio("assets/sounds/soundOn.mp3");
const sound6 = new Audio("assets/sounds/soundOff.mp3");
const sound7 = new Audio("assets/sounds/soundCorrect.mp3");
const sound8 = new Audio("assets/sounds/soundIncorrect.mp3");
const sound9 = new Audio("assets/sounds/soundHalfwaypoint.mp3");
const sound10 = new Audio("assets/sounds/soundWingame.mp3");

/*
    Variables - Dom Queries
    -----------------------
*/
const btnGame = document.querySelectorAll(".btnGame");
const scoreTracker = document.querySelector("#attempt"); // non-interactive Element

const btnGreen = document.getElementById("btnGreen"); // interactive Element
const btnRed = document.getElementById("btnRed"); // interactive Element
const btnYellow = document.getElementById("btnYellow"); // interactive Element
const btnBlue = document.getElementById("btnBlue"); // interactive Element

const btnStrict = document.querySelector("#strict"); // interactive Element
const btnOn = document.getElementById("on"); // interactive Element
const btnStart = document.getElementById("start"); // interactive Element

/*
    Event Listeners
    ---------------
*/
btnOn.addEventListener("change", event => {
  if (btnOn.checked == true) {
    on = true;
    scoreTracker.textContent = "-";
    sound5.play();
  } else {
    on = false;
    scoreTracker.textContent = "";
    sound6.play();
    clearColor();
    clearInterval(intervalId);
  }
});

btnStart.addEventListener("click", event => {
  if (on || win) {
    reset();
  }
});

btnStrict.addEventListener(
  "change",
  () => (strict = btnStrict.checked ? true : false)
);

window.addEventListener("keyup", event => {
  let key = parseInt(event.keyCode);
  let keyArray = [
    [80, 1],
    [76, 2],
    [65, 3],
    [89, 4]
  ];
  console.log(key);
  for (let k in keyArray) {
    if (keyArray[k][0] == key) {
      addSequence(keyArray[k][1]);
      break;
    }
  }
});

window.addEventListener("click", event => console.log(event.target));

btnGame.forEach(btn =>
  btn.addEventListener("click", event => {
    console.log(event);
    // Extract value from either div or parent div
    let value = parseInt(event.target.dataset.value);
    if (isNaN(value)) value = parseInt(event.target.parentNode.dataset.value);

    addSequence(value);
  })
);

function addSequence(value) {
  if (on) {
    playersequence.push(value);
    check();
    buttonEffect(value);
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

/*
    Loop Sequence
    -------------
*/
function reset() {
  win = false;
  sequence = [];
  playersequence = [];
  light = 0;
  intervalId = 0;
  attempt = 1;
  scoreTracker.textContent = 1;
  success = true;

  for (let i = 0; i < 20; i++) {
    // Loop which generates a random sequence of numbers for the light 'sequence' array
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  cpuTry = true;

  // Game sequence lights will illuminate for a duration of eight hundred milliseconds repeat
  intervalId = setInterval(gameAttempt, 800);
}

/*
    Intervals and Color Reset
    -------------------------
*/
function gameAttempt() {
  on = false;

  if (light == attempt) {
    // If number in light sequence equals number in scoreTracker, cpu action stops and user and begin
    clearInterval(intervalId);
    cpuTry = false;

    // Resets button lights from illuminated back to neutral color
    clearColor();
    on = true;
  }

  if (cpuTry) {
    clearColor();
    setTimeout(() => {
      // If first item in random light sequence array is '1' then the 'one' function will run
      buttonEffect(sequence[light]);
      light++;

      // A duration of 200 milliseconds between each 800 millisecond setInterval
    }, 200);
  }
}

function buttonEffect(value) {
  if (sound) {
    switch (value) {
      case 1:
        sound1.play();
        btnRed.style.backgroundColor = "rgba(245, 245, 245, 0.3686274509803922)";
        
        break;
      case 2:
        sound2.play();
        btnYellow.style.backgroundColor = "rgba(245, 245, 245, 0.3686274509803922)";
        break;
      case 3:
        sound3.play();
        btnGreen.style.backgroundColor = "rgba(245, 245, 245, 0.3686274509803922)";
        break;
      case 4:
        sound4.play();
        btnBlue.style.backgroundColor = "rgba(245, 245, 245, 0.3686274509803922)";
        break;
      default:
        return false;
    }
  }
  sound = true;
}

/*
    Color States
    ------------
*/

// Buttons original state
function clearColor() {
  btnRed.style.backgroundColor = "#ea4335";
  btnRed.style.boxShadow = "-10px -10px 10px rgba(0,0,0,0.2),15px 15px 15px rgba(0,0,0,0.1),inset -5px -5px 5px rgba(0,0,0,0.2), inset 5px 5px 5px rgba(0,0,0,0.1)";
  
  btnYellow.style.backgroundColor = "#fbbc05";
  btnYellow.style.boxShadow = "-10px -10px 10px rgba(0,0,0,0.2),15px 15px 15px rgba(0,0,0,0.1),inset -5px -5px 5px rgba(0,0,0,0.2), inset 5px 5px 5px rgba(0,0,0,0.1)";

  btnGreen.style.backgroundColor = "#34a853";
  btnGreen.style.boxShadow = "-10px -10px 10px rgba(0,0,0,0.2),15px 15px 15px rgba(0,0,0,0.1),inset -5px -5px 5px rgba(0,0,0,0.2), inset 5px 5px 5px rgba(0,0,0,0.1)";

  btnBlue.style.backgroundColor = "#4285f4";
  btnBlue.style.boxShadow = "-10px -10px 10px rgba(0,0,0,0.2),15px 15px 15px rgba(0,0,0,0.1),inset -5px -5px 5px rgba(0,0,0,0.2), inset 5px 5px 5px rgba(0,0,0,0.1)";
}

// Buttons illuminated state
function illumColor() {
  btnRed.style.backgroundColor = "#ea4335";
  btnYellow.style.backgroundColor = "#fbbc05";
  btnGreen.style.backgroundColor = "#34a853";
  btnBlue.style.backgroundColor = "#4285f4";
}

/*
    Player Sequence Choice Verification
    -----------------------------------
*/

function check() {
  if (
    playersequence[playersequence.length - 1] !==
    sequence[playersequence.length - 1]
  )
    // if playersequence does not equal players last selection then player is incorrect
    success = false;

  if (playersequence.length == 10 && success) {
    // if player sequence equals cpu given sequence of '10' player wins game
    setTimeout(() => {
      sound10.play();

      // 400 millisencond interval before sound plays
    }, 400);
    playerWin();
  }

  // Button color in illuminated state
  if (success == false) {
    illumColor();

    // displays text within semi colons is user makes mistake
    scoreTracker.textContent = "Invalid Input";
    sound8.play();

    // Button color in neutral state
    setTimeout(() => {
      scoreTracker.textContent = attempt;
      clearColor();

      // Restarts game if user makes a mistake
      if (strict) {
        reset();
      } else {
        success = true;
        sharedVariables();
      }
    }, 800);

    sound = false;
  }

  // If user light & button choice aligns with that of cpu user moves onto next round
  if (attempt == playersequence.length && success && !win) {
    attempt++;

    setTimeout(() => {
      sound7.play();
    }, 400);
    sharedVariables();
  }
}

/*
    Shared Variables
    ----------------
*/

// Applied to multiple functions
function sharedVariables() {
  playersequence = [];
  cpuTry = true;
  light = 0;
  scoreTracker.textContent = attempt;
  intervalId = setInterval(gameAttempt, 800);
}

/*
    Player Win Game Trigger
    -----------------------
*/

// Message displayed if user completes all sequences
function playerWin() {
  illumColor();
  scoreTracker.textContent = "You Win!";
  on = false; // game stops
  win = true;
}
