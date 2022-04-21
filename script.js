'use strict';

//Selecting Elements
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const score0 = document.getElementById('score--0');
const currentScore0 = document.getElementById('current--0');
const player1 = document.querySelector('.player--1');
const score1 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--1');

let scores, currentScore, activePlayer, gameOn;

//Starting Condition && restarting
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;

  score0.innerText = 0;
  score1.innerText = 0;
  dice.classList.add('hidden');
  currentScore0.innerText = 0;
  currentScore1.innerText = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

init();
//Rolling dice
btnRoll.addEventListener('click', function () {
  //checks if game still on
  if (gameOn) {
    //Generates RandomNumber
    const diceNum = Math.floor(Math.random() * 6) + 1;

    //Display Dice number
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;
    //Check for rolled 1
    if (diceNum != 1) {
      //Adds dice number to current score depends on player num
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).innerText =
        currentScore;
    } else {
      //Calls next player function
      switchPlayer();
    }
  }
});

//Next Player function
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Hold button function
btnHold.addEventListener('click', function () {
  //Checks if game still on to continue
  if (gameOn) {
    //Adds currentScore to Active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    //Check if plary's score is 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      gameOn = false;
      console.log('we have a winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNewGame.addEventListener('click', init);
