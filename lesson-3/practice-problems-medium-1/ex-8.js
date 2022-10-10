// Question 8
// One day, Spot was playing with the Munster family's home computer, and he
// wrote a small program to mess with their demographic data:

let munsters = {
  Herman: { age: 32, gender: "male" },
  Lily: { age: 30, gender: "female" },
  Grandpa: { age: 402, gender: "male" },
  Eddie: { age: 10, gender: "male" },
  Marilyn: { age: 23, gender: "female" }
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach(familyMember => {
    familyMember["age"] += 42;
    familyMember["gender"] = "other";
  });
}

// After writing this function, he typed the following code:

// Before Grandpa could stop him, Spot hit the Enter key with his tail. Did the
// family's data get ransacked? Why or why not?

// Answer *********************

// No. The Object.values method returns an array of vlaues stored in each key.
// Within the returned array there is noting for the staements in the forEach
// code block to access. Based on the code it looks like wants Object.entries
// method instead.