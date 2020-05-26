const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endGameElement = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words
const words = [
  'javascript',
  'programming',
  'react',
  'angular',
  'closure',
  'hoisting',
  'conditional',
  'statement',
  'stack',
  'back-end',
  'front-end',
  'database',
  'development',
  'meeting',
  'dependency',
  'version',
  'application',
  'interface',
  'strict',
  'null',
  'if',
  'else',
  'loop',
  'array',
  'function',
  'async',
  'promises',
  'await',
  'asynchronous',
  'test',
  'state',
  'coding',
];

// Init word, score, time
let randomWord;
let score = 0;
let time = 10;

// Set difficulty from localStorage
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus text field on init
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Updating score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);

    // end the game
    gameOver();
  }
}

// Game over
function gameOver() {
  endGameElement.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Replay</button>
  `;
  endGameElement.style.display = 'flex';
}

addWordToDOM();

// Event listeners

//
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input field
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Difficulty form w/ localStorage
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  console.log(difficulty);

  localStorage.setItem('difficulty', difficulty);
});
