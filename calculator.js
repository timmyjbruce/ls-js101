function promptedMessage(message) {
  console.log(`=> ${message}`);
}

const readline = require('readline-sync');

promptedMessage('Welcome to Calculator!');

promptedMessage("What's the first number?");
let number1 = readline.question();

while (invalidNumber(number1)) {
  promptedMessage("Hmm... that doesn't look like a valid number. Please try again");
  number1 = readline.question();
}

function invalidNumber(value) {
  return number1.trimStart === '' || Number.isNaN(Number(value));
}

promptedMessage("What's the second number?");
let number2 = readline.question();

while (invalidNumber(number2)) {
  promptedMessage("Hmm... that doesn't look like a valid number. Please try again");
  number2 = readline.question();
}

promptedMessage('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();


while (!['1', '2', '3', '4'].includes(operation)) {
  promptedMessage('Invalid input. Please select one of the following: \n1) Add 2) Subtract 3) Multiply 4) Divide');
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

promptedMessage(`The result is: ${output}`);

