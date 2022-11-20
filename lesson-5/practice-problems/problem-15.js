// Practice Problem 15

// Given the following data structure, write some code to return an array which
// contains only the objects where all the numbers are even.

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

console.log(
  arr.filter(subObj => {
    return Object.values(subObj)
      .flat()
      .every(ele => ele % 2 === 0);
  })
);

// PEDAC
// - Filter outer array
// - If a subobjects values includes and odd number, return false
// - Else return true
