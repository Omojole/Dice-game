"use strict";
//Selecting elements
const diceImg = document.querySelector(".dice-img");
const totalScore0 = document.getElementById("totalScore0");
const totalScore1 = document.getElementById("totalScore1");
const currentScore0 = document.getElementById("currentScore0");
const currentScore1 = document.getElementById("currentScore1");
const Player0 = document.querySelector(".player-0");
const Player1 = document.querySelector(".player-1");
const currentBox = document.querySelector(".current");

const btnReset = document.querySelector(".reset");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");

let current, scores, activePlayer, playing;
//defining the initiating conditions
const Init = function () {
  playing = true;
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  diceImg.classList.add("hidden");
  totalScore0.innerHTML = scores[0];
  totalScore1.innerHTML = scores[1];
  currentScore0.innerHTML = current;
  currentScore1.innerHTML = current;
  Player0.classList.add("active");
  Player1.classList.remove("active");
  Player0.classList.remove("winner");
  Player1.classList.remove("winner");
};

//initiation at the very beginning of the code
Init();

//defining the switchPlayer function
const switchPlayer = function () {
  document.querySelector(`.player-0`).classList.toggle("active");
  document.querySelector(`.player-1`).classList.toggle("active");
  document.getElementById(`totalScore${activePlayer}`).innerHTML =
    scores[activePlayer];
  document.getElementById(`currentScore${activePlayer}`).innerHTML = 0;
  current = 0;
  //choosing the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
};

//defining the roll dice button
btnRoll.addEventListener("click", function () {
  if (playing) {
    //choosing the random numbe
    const dice = Math.trunc(Math.random() * 6) + 1;
    //resetting the value of current...curent=current+dice
    current += dice;
    document.getElementById(`currentScore${activePlayer}`).innerHTML = current;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;
    if (dice === 1) {
      switchPlayer();
    }
  }
});

//defining the hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    //score of the active player
    scores[activePlayer] += current;
    document.getElementById(`totalScore${activePlayer}`).innerHTML =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active");
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      diceImg.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

//defining the reset button which depends on the init function
btnReset.addEventListener("click", Init);
