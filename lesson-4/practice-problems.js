
// Practive problems answers - Lesson 4.11
// -----------------------------------------------------------------------------

// Question 1 

// The return value is an array matching the original array that filter was
// called on.
 
// The filter method checks each element returned from its
// callback for truthiness. If an element returns truthy it is inclued in the
// array returned by filter. 

// In this example the callback simply return's the value 'hi' for each element.
// 'hi' isn't falsy value so it is assesed as truthy.


// Question 2

// The return value is a new array [1, 4, 9]

// The map function uses a callback function to transform the elements of the
// array passed to it, and return them in a new array.

// In this array the element passed into map's callback is multiplied by itself
// reuslting in the returned array of squares.

// **** Wrong, its a braced code block with no return statement, therefore it
// returns 'undefined'


// Question 3

// The return value is a new array [1, 4, 9]

// The element passed into map's callback is multiplied by itself and returned.
// This return happens without a return stament in functions without curly
// braces. This results in map returning the array of squares.



// Question 4

// The return value is 11

// The pop method removes the last value of an array (mutating the original) and
// returns it. In this example, the return value ('caterpillar') then has its
// length property retrieved, which is 11.


// Question 5

// The return value of every is true. 

// Every compares each element in a given array to see if it proves truthy in
// the callback. In this instance the callback returns 2, 4 & 6, each of which
// prove truthy for their respective element. Because all elements proves
// truthy, every itself returns true.

// Question 6

// We can find out about Array.prototype.fill using MDN

// In this example fill a destructive method, returns the original array mutated
// to the following [1, 1, 1, 1, 1]. This is

// Fill mutates the 2nd , 3rd, 4th and 5th elements (but not the 1st).


// Question 7

// ['bear'] is the returned value of map.

// Maps callback contains a conditional that checks if an elements length is
// greater than 3. One element, the string 'bear' has a lenght of 4, thus this element proves
// truthy and is returned from the callback, and then from map inside the return array.)

// ***** Wrong ***** 
// Returns [undefined, 'bear']. Callbacks alway return
// something!. The map method is not a good choice for selection. 


// Question 8

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let newObj = {};

Object.entries(flintstones).forEach(element => {
  let [key, value] = element;
  newObj[value] = key 
});

// console.log(newObj);

// ******* Note ********
// LS has simpler solution without array destructuring, by passing second,
// index, argument to the forEach callback.


// Question 9

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let agesTotal = Object.values(ages).reduce((a, b) => a + b, 0);

// console.log(agesTotal);


// Question 10

// Accidentally opened solution panel (Similar wording to Q9). Will swing back
// later.


// Question 11

// Given a string
// Create an empty object variable 'charCount'
// Seperate the string into an array of characters
// For each element in the array send the character to the object charCount
// If the character already exists add to the count

let statement = "The Flintstones Rock";
let charCount = {}

statement.replace(' ','').split('').forEach(char => {
  if (Object.keys(charCount).includes(char)) {
    return charCount[char] += 1;
  }
  return charCount[char] = 1;
})

console.log(charCount);
// console.log(undefined + 1);

// Output: { T: 1, h: 1, e: 2, F: 1, l: 1, ... }
