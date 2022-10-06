const content = require('./content.json');
const text = content.text;
const answers = content.winningLogic;
const validInputs = Object.entries(content.validInputs).flat();

const readline = require('readline-sync');
readline.setDefaultOptions({prompt: (text.prompt)});

let computerScore = 0;
let userScore = 0;
let runAgain;


/// Program ************************************************

displayWelcome();

do {

  do {
    displayInstructions(validInputs);

    let userChoice = getUserChoice(validInputs);
    userChoice = standardiseChoice(userChoice, validInputs);

    let computerChoice = getRandomChoice(answers);

    displayChoices(userChoice, computerChoice);
    displayWinner(userChoice, computerChoice);
    displayScore(userChoice, computerChoice);

  } while (userScore < 3 && computerScore < 3);

  displayRoundWinner(computerScore, userScore);
  resetScore();
  runAgain = askPlayAgain();

} while (runAgain);


// Functions ************************************************

function prompt(message = ' ') {
  if (message.length === 1) console.log(message.repeat(80));
  else console.log(text.prompt + message);
}

function displayWelcome () {
  displayDivider();
  prompt(text.welcome);
  displayDivider();
}

function getUserChoice (arrayChoices) {
  let input = readline.prompt();
  while (!arrayChoices.includes(input)) {
    prompt(text.invalid);
    displayInstructions(validInputs);
    input = readline.prompt();
  }
  return input;
}

function standardiseChoice (userInput, arrayAnswers) {
  if (userInput.length === 1) {
    userInput = arrayAnswers[arrayAnswers.indexOf(userInput) - 1];
  }
  return userInput;
}

function getRandomChoice (arrayChoices) {
  let randomIndex = Math.floor(Math.random() * Object.keys(answers).length);
  return Object.keys(arrayChoices)[randomIndex];
}

function displayInstructions (arrayAnwsers) {
  let answers = arrayAnwsers.map(element => {
    if (element.length === 1) return `(${element}),`;
    else return element;
  });
  prompt(`Choose: ${answers.join(' ')}`);
}

function displayWinner(compInput, userInput) {
  if (compInput === userInput) {
    prompt(text.tie);
  } else if (answers[compInput].includes(userInput)) {
    prompt(text.compWin);
  } else {
    prompt(text.userWin);
  }
}

function displayChoices(userInput, compInput) {
  prompt(`Computer chose ${compInput}, you chose ${userInput}!`);
}

function displayScore(compInput, userInput) {
  if (answers[compInput].includes(userInput)) computerScore += 1;
  if (answers[userInput].includes(compInput)) userScore += 1;
  prompt(`You: ${userScore} | Computer: ${computerScore}`);
  displayDivider();
}

function displayDivider () {
  prompt();
  prompt('-');
  prompt();
}

function displayRoundWinner(compInput) {
  if (compInput === 3) {
    prompt(text.compWinRound);
    return;
  }
  prompt(text.userWinRound);
}

function resetScore () {
  userScore = 0;
  computerScore = 0;
}

function askPlayAgain () {
  prompt(text.playAgain);
  let repeatChoice = readline.prompt().toLowerCase();

  while (repeatChoice !== 'n' && repeatChoice !== 'y') {
    prompt(text.invalid);
    repeatChoice = readline.prompt().toLowerCase();
  }
  if (repeatChoice[0] === 'y') {
    displayDivider();
    return true;
  }
  return false;
}