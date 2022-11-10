// Practice Problem 1

let arr = ['10', '11', '9', '7', '8'];

arr.sort((a, b) => b - a);

console.log(arr);

// For this particular example the Number constructor isn't actualy needed (at least on node 16.16.0)
// I'm sure is always best practive to include.