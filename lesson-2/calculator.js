const readline = require('readline-sync');
const MESSAGES = require('./calculator-messages.json');
let lang = "en";

function promptedMessage(message) {
  console.log(`=> ${message}`);
}
function invalidNumber(value) {
  return value.trimStart === '' || Number.isNaN(Number(value));
}

promptedMessage(MESSAGES[lang].language);
lang = readline.question().toLowerCase();

while ((lang !== 'en') && (lang !== 'es')) {
  promptedMessage(MESSAGES[lang].valid);
  lang = readline.question();
}

while (true) {

  promptedMessage(MESSAGES[lang].q1);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    promptedMessage(MESSAGES[lang].q1);
    number1 = readline.question();
  }

  promptedMessage(MESSAGES[lang].q2);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    promptedMessage(MESSAGES[lang].q2);
    number2 = readline.question();
  }

  promptedMessage(MESSAGES[lang].q3);
  let operation = readline.question();


  while (!['1', '2', '3', '4'].includes(operation)) {
    promptedMessage(MESSAGES[lang].invalid);
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1' :
      output = Number(number1) + Number(number2);
      break;
    case '2' :
      output = Number(number1) - Number(number2);
      break;
    case '3' :
      output = Number(number1) * Number(number2);
      break;
    case '4' :
      output = Number(number1) / Number(number2);
      break;
  }

  promptedMessage(MESSAGES[lang].result + output);

  promptedMessage(MESSAGES[lang].again);
  let repeat = readline.question();

  while ((repeat.toLowerCase() !== 'n') && (repeat.toLowerCase() !== 'y')) {
    promptedMessage(MESSAGES[lang].valid);
    repeat = readline.question();
  }
  if (repeat === 'n') {
    promptedMessage(MESSAGES[lang].thanks);
    break;
  } else if (repeat === 'y') {
    promptedMessage(MESSAGES[lang].restart);
  }
}