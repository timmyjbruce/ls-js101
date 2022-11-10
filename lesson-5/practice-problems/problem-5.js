// Practice Problem 5

// Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

// Option 1
let age1 =  
  munsters.Herman.age +
  munsters.Grandpa.age +
  munsters.Eddie.age;
  
console.log(age1);


// Option 2
let age2 = Object.values(munsters)
  .reduce((sum, munster) => {
    return munster.gender === 'male' ? sum + munster.age : sum;
}, 0);

console.log(age2);