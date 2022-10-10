
// Question 3 

// Alan wrote the following function, which was intended to return
// all of the factors of 'number':

// function factors(number) {
//   let divisor = number;
//   let factors = [];
//   do {
//     if (number % divisor === 0) {
//       factors.push(number / divisor);
//     }
//     divisor -= 1;
//   } while (divisor !== 0);
//   return factors;
// }

// Alyssa noticed that this code would fail when the input is 0 or a negative
// number, and asked Alan to change the loop. How can he make this work without
// using a do/while loop? Note that we're not looking to find the factors for 0
// or negative numbers, but we want to handle it gracefully instead of raising
// an exception or going into an infinite loop.


// Answer:
function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}

console.log(factors(8));
console.log(factors(0));
console.log(factors(-8));


// Bonus Q:
// What is the purpose of number % divisor === 0 in that code?

// Answer:
// It checks if the divisor is a factorial of the num. The remainder will return
// '0' if the divisor divides equally into the number, which indicates it's a
// factor of the number.



