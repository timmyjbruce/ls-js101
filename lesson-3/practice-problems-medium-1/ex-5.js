
// Question 5
// What will the following two lines of code output?

console.log(0.3 + 0.6); // Outputs: 0.9
console.log(0.3 + 0.6 === 0.9);// Outputs: true


// Incorrect:

// The answer is: 
// 0.8999999999999999
// false

// It’s due to a side effect of the computer  converting base 2 floating point
// numbers to base 10 floating point numbers.

// These inaccuracies can be avoided by storing numbers as intergers.