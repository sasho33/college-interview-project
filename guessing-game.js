class GuessingGame {
  constructor(maxNumber, maxAttempts) {
    this.maxNumber = maxNumber;
    this.maxAttempts = maxAttempts;
    this.secretNumber = Math.floor(Math.random() * (maxNumber + 1));
    this.remainingAttempts = maxAttempts;
    this.score = null;
  }

  guess(guess) {
    if (this.remainingAttempts <= 0) {
      throw new Error('Maximum number of attempts reached');
    }

    this.remainingAttempts--;

    if (guess === this.secretNumber) {
      this.score = 1 - (this.maxAttempts - this.remainingAttempts - 1) / this.maxAttempts;
      return `You answered ${guess}. This is the correct answer! Your lucky is ${(
        this.score * 100
      ).toFixed(2)}%.`;
    } else if (this.remainingAttempts === 0) {
      this.score = 0;
      return `You answered ${guess}. The correct answer was ${
        this.secretNumber
      }. You have no more attempts left. Your score is ${this.score.toFixed(2)}.`;
    } else if (guess < this.secretNumber) {
      return `You answered ${guess}. The correct answer is higher. You have ${this.remainingAttempts} attempt(s) left.`;
    } else {
      return `You answered ${guess}. The correct answer is lower. You have ${this.remainingAttempts} attempt(s) left.`;
    }
  }

  restart() {
    this.secretNumber = Math.floor(Math.random() * (maxNumber + 1));
    this.remainingAttempts = this.maxAttempts;
    this.score = null;
  }
}

let game;

function startGame() {
  const maxNumber = parseInt(document.getElementById('maxNumber').value);
  const maxAttempts = parseInt(document.getElementById('maxAttempts').value);
  game = new GuessingGame(maxNumber, maxAttempts);
  document.getElementById('maxNumberDisplay').textContent = maxNumber;
  document.getElementById('remainingAttempts').textContent = maxAttempts;
  document.getElementById('game').style.display = 'block';
  document.getElementById('gameOutput').innerHTML = '';
  document.getElementById('guess').value = '';
  document.getElementById('maxNumber').disabled = true;
  document.getElementById('maxAttempts').disabled = true;
  document.getElementById('startButton').disabled = true;
  document.getElementById('restartButton').disabled = true;
}

function guess() {
  const guess = parseInt(document.getElementById('guess').value);
  const result = game.guess(guess);
  document.getElementById('gameOutput').innerHTML += result + '<br>';
  document.getElementById('remainingAttempts').textContent = game.remainingAttempts;
  if (game.score !== null) {
    document.getElementById('guessButton').disabled = true;
    document.getElementById('restartButton').disabled = false;
  }
}

function restartGame() {
  game.restart();
  document.getElementById('gameOutput').innerHTML = '';
  document.getElementById('guess').value = '';
  document.getElementById('startButton').disabled = false;
  document.getElementById('maxNumber').disabled = false;
  document.getElementById('maxAttempts').disabled = false;
  document.getElementById('game').style.display = 'none';
  document.getElementById('guessButton').disabled = false;
}
