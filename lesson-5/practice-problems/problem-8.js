// Practice Problem 8

// Using the forEach method, write some code to output all vowels from the
// strings in the arrays. Don't use a for or while loop.

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let vowels = ['a','e', 'i', 'o', 'u'];
let regex = new RegExp('aeiou')

Object.values(obj)
  .forEach(arr => {
    arr.forEach(str => {
      str.split('')
      .forEach(char => {
        if(vowels.includes(char)) console.log(char);
      })
    });
  });