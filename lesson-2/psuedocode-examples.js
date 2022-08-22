// Question 5

// ### Formal pseudocode

// START

// Given two arrays of numbers arrayEvens, arrayOdds

// SET newArray

// WHILE i = 0; i < arrayEvens.length
//     newArray[i * 2] = arrayEvens[i]
//    index += 1

// WHILE j = 1; j < array.Odds.length
//     newArray[j + j + 1] = arrayOdds[j]
//     j += 1

// RETURN newArray

// END


let array1 = [0, 2, 4, 6, 8, 10];
let array2 = [1, 3, 5, 7, 9];

function mergeEvensOdds(arrayEven, arrayOdd) {
  let newArray = [];

  for (let index = 0; index < arrayEven.length; index += 1) {
    newArray[index * 2] = arrayEven[index];
  }
  for (let index = 0; index < arrayOdd.length; index += 1) {
    newArray[index + index + 1] = arrayOdd[index];
  }
  return newArray;
}

console.log(mergeEvensOdds(array1, array2));