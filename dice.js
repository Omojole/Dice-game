"use strict";
const btnRoll = document.querySelector(".roll");
const diceImg = document.querySelector(".dice-img");
const btnHold = document.querySelector(".hold");
let playing = true;
let current = 0;
let activePlayer = 0;
let scores = [0, 0];
const switchPlayer = function () {
  document.querySelector(`.player-0`).classList.toggle("active");
  document.querySelector(`.player-1`).classList.toggle("active");

  document.getElementById(`totalScore${activePlayer}`).innerHTML =
    scores[activePlayer];
  document.getElementById(`currentScore${activePlayer}`).innerHTML = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    current += dice;
    document.getElementById(`currentScore${activePlayer}`).innerHTML = current;

    diceImg.classList.remove("hidden");
    diceImg.src = `/assets/images/dice-${dice}.png`;
    if (dice === 1) {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current;
    document.getElementById(`totalScore${activePlayer}`).innerHTML =
      scores[activePlayer];

    console.log(scores[activePlayer]);
    if (scores[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active");

      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
    } else {
      switchPlayer();
    }
  }
});
