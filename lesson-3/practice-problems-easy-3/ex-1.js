// Question 1
// Write three different ways to remove all of the elements from the following array:

let numbers = [1, 2, 3, 4];

// Method 1
// Filter out elements
// Reassign empty array
numbers = numbers.filter(num => num < 0);
console.log(numbers);

// Method 2
// reduce with accumulator at 0
// convert to empty array
// reassign empty array
numbers = [1, 2, 3, 4];
numbers = Array.from(numbers.reduce((accum, num) => accum * num, 0));
console.log(numbers);

// Method 3
// pop elements within loop
numbers = [1, 2, 3, 4];
for (let i = numbers.length; i > 0; i--) numbers.pop();
console.log(numbers);

// Method 4
// splice all elements within array
numbers = [1, 2, 3, 4];
numbers.splice(0, numbers.length);
console.log(numbers);

// Method 5
// shift elements within while loop
numbers = [1, 2, 3, 4];
while (numbers.length) numbers.shift();
console.log(numbers);

