let buildGame = function(game, MIN_COMBO_LENGTH, NO_MOVE) {

let gameData = {}
gameData.board = generateBoard(); 
gameData.combos = generateCombos()
gameData.score = { X: 0, O: 0, draws: 0}
gameData.rounds = 0;
gameData.turnCountdown = game.moveCount;
gameData.moves = generateMoves();


// The 'board' is an array of 'row' arrays, generated from the boardSize
function generateBoard() {
  let [fullBoard, row] = [[], []];
  for (let num = 1; num <= game.moveCount; num++) {
    row.push(String(num));
    if (num % game.boardSize === 0) fullBoard.push(row.splice(0));
  }
  board = fullBoard;
  return fullBoard;
}

function generateMoves() {
  moves = {}
  for (let num = 1; num <= game.moveCount; num++) {
    moves[num] = NO_MOVE; // Moves stored as properties
  }
  return moves;
}


// Combo generation
// 'Combos' are arrays containing a combination of moves that can produce a win.
// Combos are generated dynamically based on the boardSize, and minComboSize

function generateCombos() {
  let horizontals = gameData.board;
  let verticals = transpose(horizontals);
  let diagonalsLR = getDiagonalCombos();
  let diagonalsRL = transposeDiagonally(diagonalsLR);
  
  let allCombos = horizontals.concat(verticals, diagonalsLR, diagonalsRL);
  allCombos = allCombos.concat(getSubCombos(allCombos));
  allCombos = allCombos.map(combo => combo.map(move => String(move)))
  return allCombos;
}

function transpose(array) {
  return array[0].map((_, colIndex) => {
    return array.map(row => row[colIndex])
  })
}

function getDiagonalCombos() {
  let diagonalCombos = [];
  let combo = []
  let countPrior = 0;
  
  for (let count = 0; count < game.moveCount; count++) {
    let subCount = game.boardSize - (count % game.boardSize);
    // Subcount allows for sub-loops of decreasing iteration

    for (let num = 0; num < subCount; num++) { 
      if (countPrior !== count) {  // Checks if expected combo length reached
        if (combo.length >= MIN_COMBO_LENGTH) {
          diagonalCombos.push(combo.splice(0)) 
        } else combo.length = 0;                
      };
      countPrior = count;

      let move = 1 + count + num + (num * game.boardSize); // Moves along board to                                               // get next move in combo
      if (move <= game.moveCount) combo.push(String(move));        // get next move in combo
    }
  }
  return diagonalCombos;
}

function transposeDiagonally(array) {
  let maxIndex = game.boardSize - 1;

  return array.map(row => row.map(move => {
      let [rowIndex, columnIndex] = getBoardIndexesFor(move);
      columnIndex = maxIndex - columnIndex;
      return board[rowIndex][columnIndex]
      // Returns val at inverted column location, but same row location
    }) 
  )
}
function getSubCombos(array) {
  let subCombos = [];
  
  array.forEach(combo => {
    for (let idx = 0; (idx + MIN_COMBO_LENGTH - 1) < combo.length; idx++) {
      let subCombo = combo.slice(idx, idx + MIN_COMBO_LENGTH)
      let arrayOfStrings = array.map(combo => combo.join(''));
      let subComboString = subCombo.join('');
      
      if (!arrayOfStrings.includes(subComboString)) subCombos.push(subCombo);
      // Conditional removes repetition in final combo list as getDiagonals() 
      // already returns ~25% of subCombos.
    }
  })
  return subCombos;
}

function getBoardIndexesFor(val) {
  let rowIndex, colIndex;

  gameData.board.map((row, index) => {
    if (row.includes(val)) {
      [rowIndex, colIndex] = [index, row.indexOf(val)];
    }
  })
  return [rowIndex, colIndex];
}

return gameData;
}

module.exports = buildGame;