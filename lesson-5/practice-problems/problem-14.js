// Practice Problem 14

// Given the following data structure write some code to return an array
// containing the colors of the fruits and the sizes of the vegetables. The
// sizes should be uppercase, and the colors should be capitalized.

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

// The return value should look like this:
[["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]

let arr = [];

for(let prop in obj) {
  prop = obj[prop];

  if (prop['type'] === 'vegetable') {
    arr.push(prop['size'].toUpperCase());
  } else if (prop['type'] === 'fruit') {
    arr.push(prop['colors'].map(ele => capitalise(ele)));
  }
}
function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}

console.log(arr);

// obj[prop]['size'] = obj[prop]['size'][0].toUpperCase() + obj[prop]['size'].slice(1);