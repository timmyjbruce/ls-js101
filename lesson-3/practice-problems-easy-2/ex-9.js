
// Question 9

let title = "Flintstone Family Members";
let table = 'A 40 character table lorem isp dolor sit';
let paddingStart = ' '.repeat((Math.floor(40 - title.length) / 2));
let paddingEnd = ' '.repeat((Math.ceil(40 - title.length) / 2));

let titleCentered = paddingStart + title + paddingEnd;
let titleCentered2 = title.padStart(Math.floor(table.length + title.length) / 2, ' ');

console.log(titleCentered);
console.log(titleCentered2);
console.log(title40Char);
