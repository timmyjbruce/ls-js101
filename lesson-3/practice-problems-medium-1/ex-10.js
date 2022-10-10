
// Question 10
// Consider these two simple functions:

function foo(param = "no") {
  return "yes";
}

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

// What will the following function invocation return?

bar(foo());

// Answer:
// "no"

// Function foo always returns yes. Therefore 'yes' is provided as a an argument
// to function bar. Within bar 'yes' is not equal to 'no', therefore the the 'no' value within
// the ternary statement is returned.

// Correct