// Ask user for first num
// Ask for the second num
// Ask for calculation type
// Perform calculation
// Report result to user


const readline = require('readline-sync');

console.log('\nI am Calculatron 6000, I will calculate your puny human problems.');

console.log('Give me your first number human:');
let num1 = readline.question();

console.log('\nPathetic. Now give me your second number:');
let num2 = readline.question();

console.log(`\nAre you serious... I am the mighty CALCULATRON!
Enter your calculation method:
(1) to Add
(2) to Subtract
(3) to Multiply
(4) to Divide`
);
let calcType = readline.question();

let calculation;

if (calcType === '1') {
  calculation = Number(num1) + Number(num2); // Adds if option 1 selected
} else if (calcType === '2') {
  calculation = Number(num1) - Number(num2); // Subtracts if option 2 selected
} else if (calcType === '3') {
  calculation = Number(num1) * Number(num2); // Multiplies if option 3 selected
} else if (calcType === '4') {
  calculation = Number(num1) / Number(num2); // Divides if option 4 selected
}

let computationCount = 8;

setTimeout( function() {
  console.log(`Your puny number is: ${calculation}. Goodbye human.`);
}
,300 * (computationCount + 1)
);

while (computationCount > 0) {
  setTimeout(function() {
    console.log('Computing...');
  }
  ,(300 * computationCount));
  computationCount -= 1;
}