// Question 5 
// The following function unnecessarily uses two return statements to
// return boolean values. Can you rewrite this function so it only has one
// return statement and does not explicitly use either true or false?

let color = "blue";

function isColorValid(color) {
  if (color === "blue" || color === "green") {
    return true;
  } else {
    return false;
  }
}

// Option 1
// Removing conditional, returning output of statment.
function isColorValid(color) {
  return color === "blue" || color === "green";
}

// Option 2
// Further, removing second variable reference
function isColorValid2(color) {
  return color === "blue" || "green";
};

// Option 3
// As arrow function
const isColorValid3 = color => color === "blue" || "green";


console.log(isColorValid(color));
console.log(isColorValid2(color));
console.log(isColorValid3(color));