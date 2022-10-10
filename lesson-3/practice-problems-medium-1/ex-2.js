
// Question 2

// Starting with the string:
let munstersDescription = "The Munsters are creepy and spooky.";
// Return a new string that swaps the case of all of the letters:


// Answer:
function caseInverse (sentence) {
  let arrayInverse = [];
  sentence.split('').forEach(element => {
  element.toUpperCase() === element
    ? arrayInverse.push(element.toLowerCase())
    : arrayInverse.push(element.toUpperCase());
  })
return arrayInverse.join('');
};

console.log(caseInverse(munstersDescription));