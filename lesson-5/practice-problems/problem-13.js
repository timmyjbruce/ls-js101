// Practice Problem 13

// Given the following data structure, sort the array so that the sub-arrays are
// ordered based on the sum of the odd numbers that they contain.

// Since 1 + 3 < 1 + 7 < 1 + 5 + 3, the sorted array should look like this:
// [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]


let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a, b) => {
  addOdds(a) - addOdds(b)
});

function addOdds(arr) {
  arr.reduce((sum, ele) => {
    if (sum % 2 === 0) return sum + ele;
    else return sum;
  });
}

console.log(arr);