// Question 4
// What will the following code output?

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

// Slice is a non-mutating method, therefore it logs the array assigned on the first line to arr1.
// Wrong

//Slice is non-mutating, but it only makes a shallow copy, there for child objects aren't copied but remain as pointers.
// Line 3 mutates an object for which the reference is shared between arr1, arr2.