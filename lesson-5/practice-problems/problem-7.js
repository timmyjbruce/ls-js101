// Practice Problem 7

// Given the following code, what will the final values of a and b be? Try to
// answer without running the code.

let a = 2;
let b = [5, 8];
let arr = [a, b];

arr[0] += 2;
arr[1][0] -= a;

// [4, [3, 8]]
// 'a' will be 2
// 'b' will be [3, 8]