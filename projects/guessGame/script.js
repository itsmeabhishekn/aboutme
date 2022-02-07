'use strict';

let secretNumber = Number(Math.trunc(Math.random() * 20) + 1);
let score = 20;
let highScore = 0;

//display function to display the message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//does all the calculation and comparison using  function
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //when there is no input
  if (!guess) {
    displayMessage('please enter a number ');
  }

  //wehn player wins the game
  else if (secretNumber === guess) {
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    displayMessage('🏆 Congratulations you have won the game 🏆');
    document.querySelector('.number').textContent = guess;

    document.querySelector('body').style.backgroundColor = '#3CB371';
    document.querySelector('.number').style.width = '30rem';
  }

  //when the gues is wrong
  else if (secretNumber !== guess) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? 'Guess is high!!' : 'Guess is low :( '
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You have lost the game 😞');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// implementing 'again' button on top left

document.querySelector('.again').addEventListener('click', function ref() {
  score = 20;
  secretNumber = Number(Math.trunc(Math.random() * 20) + 1);
  document.querySelector('.score').textContent = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').width = '15rem';
});
