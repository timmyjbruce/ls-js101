
function loader(dotCount) {
  const LOADER = '.'
  const ITERATION_DURATION = 200;
    
  while (dotCount > 0) {
    setTimeout(function timer() {
      process.stdout.write(LOADER); 
    }, dotCount * ITERATION_DURATION);
    dotCount -= 1;
  }
}



loader(3)
console.log('\n')