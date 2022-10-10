
// Question 2

let numbers = [1, 2, 3, 4, 5];
let reversedNumbers = [];

numbers.slice().reverse();
numbers.concat().sort((a, b) => b - a);
numbers.forEach(number => reversedNumbers.unshift(number));
reversedNumbers;

// Returns:
// [ 5, 4, 3, 2, 1 ]
// [ 5, 4, 3, 2, 1 ]
// [ 5, 4, 3, 2, 1 ]
// [ 5, 4, 3, 2, 1 ]
