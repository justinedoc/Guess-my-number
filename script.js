'use strict';

// setting elements
const gameRestartBtn = document.querySelector('.again');
const checkGuessBtn = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
// const defaultScore = Number(score.textContent);
let randomNumber = Math.trunc(Math.random() * 20) + 1;
let playing = true;
let currentScore = 20;
let currentHighScore = 0;
score.textContent = currentScore;

const submitNumber = (input, btn) => {
  const inputBox = document.querySelector(input);
  const button = document.querySelector(btn);
  inputBox.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      guess(inputBox.value);
    }
  });

  button.addEventListener('click', () => {
    guess(inputBox.value);
  });
};
submitNumber('.guess', '.check');

const guess = function (value) {
  if (playing) {
    value = parseFloat(value);
    if (!value || value > 20 || value < 1) {
      message.textContent = 'Invalid guess!';
    } else {
      if (value === randomNumber) {
        playerWins();
      } else if (value > randomNumber) {
        message.textContent = '📈 Too high!';
        losing();
      } else if (value < randomNumber) {
        message.textContent = '📉 Too low!';
        losing();
      }
    }
  }
};

const losing = () => {
  if (playing) {
    if (currentScore <= 1) {
      document.body.style.background = `red`;
      message.textContent = `You Lose`;
      score.textContent = 0;
    } else {
      currentScore = currentScore - 1;
      score.textContent = currentScore;
    }
  }
};

const playerWins = () => {
  message.textContent = `🎉 Correct Number!`;

  playing = false;

  document.querySelector('.number').textContent = randomNumber;

  document.body.style.background = `rgb(8, 180, 62)`;

  if (currentScore > currentHighScore) {
    highScore.textContent = currentScore;
  }
};

gameRestartBtn.addEventListener('click', () => {
  playing = true;
  randomNumber = Math.trunc(Math.random() * 6) + 1;
  currentScore = 20;
  message.textContent = `Start guessing...`;

  document.querySelector('.number').textContent = '?';

  document.body.style.background = `#222`;

  score.textContent = 20;

  document.querySelector('.guess').value = '';
});
