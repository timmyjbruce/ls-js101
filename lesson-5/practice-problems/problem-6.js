// Practice Problem 6

// One of the most frequently used real-world string operations is that of
// "string substitution," where we take a hard-coded string and modify it with
// various parameters from our program.

// Given this previously seen family object, print the name, age, and gender of
// each family member:

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

// Each output line should follow this pattern:
// (Name) is a (age)-year-old (male or female).


let munsterArray = Object.entries(munsters);

munsterArray.forEach(munster => { 
  let name = munster[0][0].toUpperCase() + munster[0].slice(1)
  console.log(
    `${name} is a ${munster[1]['age']}-age-${munster[1]['gender']}`
  );
});