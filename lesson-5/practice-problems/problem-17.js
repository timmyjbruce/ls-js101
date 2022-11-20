// Practice Problem 17

// A UUID is a type of identifier often used to uniquely identify items, even
// when some of those items were created on a different server or by a different
// application. That is, without any synchronization, two or more computer
// systems can create new items and label them with a UUID with no significant
// risk of stepping on each other's toes. It accomplishes this feat through
// massive randomization. The number of possible UUID values is approximately
// 3.4 X 10E38, which is a huge number. The chance of a conflict is vanishingly
// small with such a large number of possible values.

// Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the
// letters a-f) represented as a string. The value is typically broken into 5
// sections in an 8-4-4-4-12 pattern, e.g.,
// 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

// Write a function that takes no arguments and returns a string that contains a
// UUID.

// PEDAC
// Problem ###########

// Input: nothing
// Output: String

// Requirements:
// - String contains 32 characters + 4 dashes
// - Dashes inserted here: 8-4-4-4-12

// Examples ##########
// 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'

// Data ##############
// - Array to hold placement of indexs add dashes split 
//    [8, 12, 16, 20]
// - Array to hold valid hex characters
//    [8] 

// Algorithm #########
// Start 'uuidGen'
// Set 'uuid' to empty string
// Set 'charChunks' to array per data
// Set hexChars to array per data
// Set UUID_LENGTH to 32

// While length is less than uuid length
// Generate a random number between 1 and 16
// Multiply it by 16 and round it down
// Set randNum to the random number
// Get the value of hexChars at the index on randNum
// Add index to uuid
// If uuid length + 1 is in the charChunks array
// Add a dash to uuid
// Add one to uuid length

// Return uuid


// Code ################

function uuidGen() {
  let uuid = '';
  let dashPos = [8, 13, 18, 23];
  let uuidLength = 32;
  const HEX_VALS = [
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f'
  ];
  
  for (let idx = 0; idx < uuidLength; idx++) {
    let char = HEX_VALS[getRandomNum()];
    uuid += char;
    addDash();
  }
  return uuid;


  function addDash() {
    if (dashPos.includes(uuid.length)) {
      uuid += '-';
      uuidLength += 1;
    }
  }
  function getRandomNum() {
    return Math.floor(Math.random() * HEX_VALS.length)
  }

}


console.log(uuidGen());