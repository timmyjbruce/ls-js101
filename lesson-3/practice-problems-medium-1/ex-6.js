// Question 6
// What do you think the following code will output?

let nanArray = [NaN];
console.log(nanArray[0] === NaN);


// Answer
// False

// Bonus question:
// How can you reliably test if a value is NaN?

// Bonus answer:
// By comparing it to itself, NaN is the only value that is not equal to itself.