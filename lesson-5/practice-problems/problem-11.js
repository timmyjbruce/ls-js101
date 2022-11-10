// Practice Problem 11

// Given the following data structure, use the map method to return a new array
// identical in structure to the original but, with each number incremented by
// 1. Do not modify the original data structure.


let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

console.log(
  arr.map(subObj => {
    return Object.entries(subObj)
      .map(ele => {
        let obj = {};
        obj[ele[0]] = ele[1] + 1;
        return obj;
      })
  })
);



// Algorithim
// - For each subObj in arr
// - Convert subObj to subArr with key and values as elements
//  - Initialise an object on the array with the same key name and as each 
//  - Assign a value to the new property