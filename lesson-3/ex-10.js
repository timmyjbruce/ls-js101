// Write a one-line expression to count the number of lower-case t characters in each of the following strings:

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

// Option 1
// Convert to array
// match all t's using regex
// Log length of return array

console.log(Array.from(statement1.matchAll(/[t]/g)).length);

// Option 2
// Convert to array
// Filter to elements that match 't'
// Log array.length

console.log(statement2.split('').filter(element => element === 't').length);