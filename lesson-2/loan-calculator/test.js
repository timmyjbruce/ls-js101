const readline = require('readline-sync');

// let apy = 4;

// let apr = ((((apy / 100) + 1) ** 12) - 1) * 100;

// console.log(apr);


// apr = ()

// console.log(Math.pow(((apy / 100) + 1), 4));

// console.log(Math.pow(apy, 4));
// console.log(Math.pow((apy / 100), 4));
// console.log(Math.pow(((apy / 100) + 1), 4));
// console.log(Math.pow((((apy / 100) + 1), 4) - 1));
// console.log(Math.pow((((apy / 100) + 1), 4) - 1) * 100);

// apy = 4
// 4 / 100 = 0.04
// 0.04 + 1 = 1.04
// 0.04 pow (1/12) = 1.0032737
// 1.0032737 - 1 = 0.0032737
// 0.0032737 * 100 = 0.32737


// apy = 4
// 4 / 100 = 0.04
// 0.04 + 1 = 1.04
// 0.04 pow (1/12) = 1.0032737
// 1.0032737 - 1 = 0.0032737
// 0.0032737 * 100 = 0.32737

// annualValue = 4;

// console.log(((Math.pow((annualValue / 100) + 1, 1 / 12)) - 1) * 100);


// let integerNum = 3;
// let floatNum = 3.5;

// console.log(Number.isInteger(parseFloat(integerNum)));
// console.log(Number.isInteger(parseInt(floatNum)));



// let p = 1000;// loan amount
// let a = 0.04; // Annual interest rate decimal
// let j = (a / 12); // monthly interest rate  - compound monthly
// let n = 24; // loan duration in months


// let monthlyPayment = p * (j / (1 - Math.pow((1 + j), (-n))));
// let totalPayment = '$' + (monthlyPayment * n).toFixed(2);
// monthlyPayment = '$' + monthlyPayment.toFixed(2);
// let padding = ' '.repeat(totalPayment.length - monthlyPayment.length); // Make work with different functions

// console.log(padding)
// console.log('Your monthly repayments are: \t' + padding + monthlyPayment);
// console.log('Your total repayment is: \t' + (totalPayment));


// Need to get regex replacement of comma's working
// Need to get input validation working, maybe in dedicated function?

// let loanAmountRaw = '$76,5432.54';
// console.log(loanAmountRaw);

// let loanAmount = (parseFloat(loanAmountRaw.replace(/\$|\,/g, '')));
// console.log(loanAmount);


// console.log(parseInt(true));
// console.log(parseInt('74 dollars'));
// console.log(parseInt('twenty'));
// console.log(parseInt('20'));
// console.log(parseInt('-20'));
// console.log(parseInt(''));
// console.log(parseInt(null));
// console.log(parseInt(undefined));



let value1 = readline.prompt();
console.log(typeof value1)

let value2 = parseInt(readline.prompt());
console.log(typeof value2)
console.log(value2)
