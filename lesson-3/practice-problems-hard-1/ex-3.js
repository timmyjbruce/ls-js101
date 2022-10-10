
// Question 3

// Given the following similar sets of code, what will each code snippet print?

// A *********************************************

// function messWithVars(one, two, three) {
//   one = two;
//   two = three;
//   three = one;
// }

// let one = ["one"];
// let two = ["two"];
// let three = ["three"];

// messWithVars(one, two, three);

// console.log(`one is: ${one}`);
// console.log(`two is: ${two}`);
// console.log(`three is: ${three}`);

// B *********************************************

// function messWithVars(one, two, three) {
//   one = ["two"];
//   two = ["three"];
//   three = ["one"];
// }

// let one = ["one"];
// let two = ["two"];
// let three = ["three"];

// messWithVars(one, two, three);

// console.log(`one is: ${one}`);
// console.log(`two is: ${two}`);
// console.log(`three is: ${three}`);

// C *********************************************

function messWithVars(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);


// All print the following:
// 'one is: one'
// 'two is: two'
// 'three is: three'

// In snippets A, B & C the parameters of the function are shadowing global variables
// of the same name. In each instance this creates a seperate variable local to
// the function. Reassign of these variable is local to the function and does not affect the global
// variables of the same name.

// Incorrect


// Initial assessment was that all 3 reported the same thing: The below is the
// correct assessment of snippet 'C' I believe):

// In snippets A & B the parameters of the function are shadowing global variables
// of the same name. In each instance this creates a seperate variable local to
// the function. Reassign of these variable is local to the function and does not affect the global
// variables of the same name.

// In snippet C, there is no reassignment occuring within the function. Instead
// a reference to each array is passed to the function, this refrence is then
// used to mutate the arrays at each reference using the splice method. These
// arrays are assigned to global variables, so their mutation is seen globally.