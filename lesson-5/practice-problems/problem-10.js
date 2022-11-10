// Practice Problem 10

// Perform the same transformation of sorting the subarrays we did in the
// previous exercise with one difference; sort the elements in descending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

console.log(
  arr.map(subArr => {
    if (typeof subArr[0] === 'string') return subArr.sort(stringCompare);
    else return subArr.sort((a, b) => b - a);
  })
);

function stringCompare(strA, strB) {
  if (strA === strB) return 0;
  else for (let idx = 0; idx < strA.length; idx++ ) {
    if (strA.charCodeAt(idx) < strB.charCodeAt(idx)) return 1;
    if (strA.charCodeAt(idx) > strB.charCodeAt(idx)) return -1;
  }
}

function stringCompare(strA, strB) {
  if (strA === strB) return 0;
  else if (strA < strB) return 1;
  else return -1;
}