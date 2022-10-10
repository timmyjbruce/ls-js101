
// Question 1
// Will the following functions return the same results?

function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first());
console.log(second());


// No. The function 'first' returns the object, the function 'second' returns
// nothing. JS interprets the return keyword within 'second', which is on its
// own line, as a single statement. The object is not part of the return
// staement and is ignored. 


