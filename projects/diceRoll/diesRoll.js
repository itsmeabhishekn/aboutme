"use strict";

//total scores
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//current scores
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//dice
const diceEl = document.querySelector(".dice");

//buttons

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, current_Score, active_player, playing;

//starting condition

score0El.textContent = 0;
score1El.textContent = 0;

current_Score = 0;
active_player = 0;
playing = true;

//not working
diceEl.classList.add("hidden");

const init = function () {
  scores = [0, 0];
  current_Score = 0;
  active_player = 0;
  playing = true;

  //not working
  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

btnRoll.addEventListener("click", function () {
  // 1) generating random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2) displaying dice roll

    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${dice}.png`;

    //3) check if dice is rolled 1

    if (dice !== 1) {
      //add dice to the current score

      current_Score += dice;
      document.getElementById(`current--${active_player}`).textContent =
        current_Score;
    } else {
      //switch player

      switchPlayer();
    }
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${active_player}`).textContent = 0;

  active_player = active_player === 0 ? 1 : 0;
  current_Score = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to the score of the active player
    scores[active_player] += current_Score;
    console.log("hy");
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    //check score is already atleast 100
    if (scores[active_player] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${active_player}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${active_player}`)
        .classList.remove("player--active");
    }

    //finish the game
    else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

const btnHelp = document.querySelector(".help");

btnHelp.addEventListener("click", function () {
  console.log("hyy");
  alert(
    ` -> You can repeatedly rolls a die until either a 1 is rolled or the player decides to "hold" 
    
  -> If the player rolls a 1, they score nothing and it becomes the next player's turn.

  -> If the player rolls any other number, it is added to their turn total and the player's turn continues.

  -> If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.

  -> The first player to score 100 or more points wins. `
  );
});
