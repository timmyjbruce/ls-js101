let foo = {a: 'hello',b: 'world'};
let qux = 'hello';

function bar(argument1, argument2) {
  argument1.a = 'hi';
  argument2 = 'hi';
  console.log('hello');
}

bar(foo, qux);

console.log(foo.a); // Logs 'hi'
console.log(qux); // Logs 'hello'


// let foo = {a: 'hello',b: 'world'};
// let qux = 'hello';

// function bar([pointer to the object], 'hello') {
//   [pointer to the object].a = 'hi'; // Object is mutated
//   'hello' = 'hi'; // Either nothing happens, or when called within this instance of the funciton the string 'hello' will evaluate as 'hi'
//   console.log('hello');
// }

// bar(foo, qux);


