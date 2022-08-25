const readline = require('readline-sync');
const TEXT_CONTENT = require('./loan-calculator-text.json');
let lang = 'en';
let defaultPrompt = '=> ';
let correction = 0;  // Note at bottom

// Helper functions

function setPrompt(newPrompt) {
  readline.setDefaultOptions({prompt: newPrompt});
}

function cleanString (string) {
  return string.replace(/\$|,|%/g, '');
}

function spacer(spacing = '\n' + '-'.repeat(60) + '\n') {
  console.log(spacing);
}

// Core functions

function messageUser(message, num) {
  let storedMessage = TEXT_CONTENT[lang][message];
  let padValue = 40 - message.length + correction;
  let stringDollars = num ? ('$' + num.toFixed(2)).padStart(padValue, ' ') : '';

  if (storedMessage) console.log(defaultPrompt + storedMessage + stringDollars);
  else console.log(defaultPrompt + message + stringDollars);

  if (num) correction += 1;
}

function promptUserBasic(newPrompt = '') {
  newPrompt = ' '.repeat(defaultPrompt.length) + newPrompt;
  setPrompt(newPrompt);
  let answer = readline.prompt();
  spacer('');
  return answer;
}

function promptUserNum(newPrompt = '') {
  return parseFloat(cleanString(promptUserBasic(newPrompt)));
}

// Program start

spacer('');
messageUser('language');
let langInput = promptUserBasic()[0];

while ((langInput !== '1') && (langInput !== '2')) {
  messageUser('invalid');
  langInput = promptUserBasic();
}
lang = langInput === '1' ? lang : 'mā';

spacer();
messageUser('welcome');

do {

  // Collecting input from user & validating

  messageUser('q1');
  let loanAmount = promptUserNum('$ ');
  while (isNaN(loanAmount) || loanAmount < 0) {
    messageUser('invalid');
    loanAmount = promptUserNum('$ ');
  }

  messageUser('q2');
  let periodYears = promptUserNum('Years: ');
  while (isNaN(periodYears) || periodYears < 0) {
    messageUser('invalid');
    periodYears = promptUserNum('Years: ');
  }

  let periodMonths = 0;
  if (Number.isInteger(periodYears)) {
    periodMonths = promptUserNum('Months: ');
    while (isNaN(periodMonths) || periodMonths < 0) {
      messageUser('invalid');
      periodMonths = promptUserNum('Months: ');
    }
  }
  messageUser('q3');
  let interestRate = promptUserNum('% ' );
  while (isNaN(interestRate) || interestRate < 0) {
    messageUser('invalid');
    interestRate = promptUserNum('% ');
  }

  // Completing math

  interestRate = (interestRate / 100) / 12;
  let periodTotal = periodMonths + (periodYears * 12);
  let monthlyPayment = (1 - Math.pow((1 + interestRate), (-periodTotal)));
  monthlyPayment = loanAmount * (interestRate / monthlyPayment);
  let totalPayment = monthlyPayment * periodTotal;
  let totalInterest = totalPayment - loanAmount;

  // Surfacing results, asking to repeat

  spacer();
  messageUser('payment_monthly', monthlyPayment);
  messageUser('payment_total', totalPayment);
  messageUser('payment_interest', totalInterest);
  spacer();

  messageUser('repeat');
  let repeat = promptUserBasic()[0].toLowerCase();
  while ((repeat !== 'y') && (repeat !== 'n')) {
    messageUser('invalid');
    repeat = promptUserBasic()[0].toLowerCase();
  }
  if (repeat === 'n') break;

} while (true);

messageUser('thanks');




// The value of 'correction' is incremented everytime a number is put through,
// a 'prompUser..' function. Without the padding of arguments passed via 'num' 
// is incremented by 1, (visible in the node output). It's a bit hacky but I
// can't for the life of me figure out why it's needed. I could have used a loop
// to increment within the function but I feel leaving it here makes the hack
// nice and obvious - at least until I figure out a better way to address it.
// Any assitance would be appreciated!