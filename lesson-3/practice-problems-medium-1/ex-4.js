
// Question 4 

// Alyssa was asked to write an implementation of a rolling buffer.
// You can add and remove elements from a rolling buffer. However, once the
// buffer becomes full, any new elements will displace the oldest elements in
// the buffer.

// She wrote two implementations of the code for adding elements to the buffer.
// In presenting the code to her team leader, she said "Take your pick. Do you
// prefer push() or concat() for modifying the buffer?".

// Is there a difference between these implementations, other than the method
// she used to add an element to the buffer? You may assume that newElement will
// always be a primitive value.

function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

// Answer:
// There is no difference in operation however .push may preform slightly
// better as .concat must create a new array to hold the result of the merged arrays.
// The concat method also must reassign the variable each time it runs.

// Incorrect: 
// The push implementation mutates the argment passed into the buffer
// parameter. The concat method doesn't;