
let buildGame = function(gameData, NO_MOVE) {

  // Notes of gameData
  // ---------------------------------------------------------------------------
  // Within the gameData object all board tile # values (moves), are stored as string
  // values. All score or turn based values are numerical. This removed the need
  // for extra type conversions within various functions, however a less
  // bug-prone design would've been to simply use numbers across the board.
 
  gameData.board = generateBoard();
  // Array that maps the board structure for a given size with 'row' subarrays.

  gameData.minComboLength = getMinComboLength();
  // The min-length of winning lines of X's or O's (aka 'combos'). Larger games
  // require larger min-lengths, to a limit. Based on common TTT rulesets. 

  gameData.combos = generateCombos();
  // 'combos' are arrays of 'moves' that can produce a win on a given board size

  gameData.score = { X: 0, O: 0, draws: 0};
  // The score is stored in gameData. LS requirements asked for this to not be
  // global variable however centralising all values in a single object makes it
  // easy to pass game data to modules.

  gameData.roundCount = 0;
  // Additional 'rounds' are added here if player chooses to continue the game.

  gameData.moves = generateMoves();
  // The list of current 'moves', aka 'tile status', for a given board size.


  // Game data build functions
  // ---------------------------------------------------------------------------

  function generateBoard() {
    let [fullBoard, row] = [[], []];
    for (let num = 1; num <= gameData.moveCount; num++) {
      row.push(String(num));
      if (num % gameData.boardSize === 0) fullBoard.push(row.splice(0));
    }
    return fullBoard;
  }

  function generateMoves() {
    let moves = {};
    for (let num = 1; num <= gameData.moveCount; num++) {
      moves[num] = NO_MOVE;
    }
    return moves;
  }

  function getMinComboLength() {
    switch(gameData.boardSize) {
      case 3 : return 3;
      case 4 : return 4;
      case 5 : return 4;
      default : return 5;
    }
  }

  function generateCombos() {
    let horizontals = gameData.board;
    let verticals = transpose(horizontals);
    let diagonalsLR = getDiagonalCombos();
    let diagonalsRL = transposeDiagonally(diagonalsLR);

    let allCombos = horizontals.concat(verticals, diagonalsLR, diagonalsRL);
    allCombos = allCombos.concat(getSubCombos(allCombos));
    allCombos = allCombos.map(combo => combo.map(move => String(move)));
    return allCombos;
  }

  function transpose(array) {
    // console.log('array:')
    // console.log(array)
    return array[0].map((_, colIndex) => {
      return array.map(row => row[colIndex]);
    });
  }

  function getDiagonalCombos() {
    let diagonalCombos = [];
    let combo = [];
    let countPrior = 0;

    for (let count = 0; count < gameData.moveCount; count++) {
      let subCount = gameData.boardSize - (count % gameData.boardSize);
      // Subcount allows for sub-loops of decreasing iteration

      for (let num = 0; num < subCount; num++) {
        if (countPrior !== count) {  // Checks if expected combo length reached
          if (combo.length >= gameData.minComboLength) {
            diagonalCombos.push(combo.splice(0));
          } else combo.length = 0;
        }
        countPrior = count;

        let move = 1 + count + num + (num * gameData.boardSize); // Moves along board to                                               // get next move in combo
        if (move <= gameData.moveCount) combo.push(String(move));        // get next move in combo
      }
    }
    return diagonalCombos;
  }

  function transposeDiagonally(array) {
    let maxIndex = gameData.boardSize - 1;

    return array.map(row => row.map(move => {
      let [rowIndex, columnIndex] = getBoardIndexesFor(move);
      columnIndex = maxIndex - columnIndex;
      return gameData.board[rowIndex][columnIndex];
      // Returns val at inverted column location, but same row location
    })
    );
  }

  function getSubCombos(array) {
    let subCombos = [];

    array.forEach(combo => {
      for (let idx = 0; (idx + gameData.minComboLength - 1) < combo.length; idx++) {
        let subCombo = combo.slice(idx, idx + gameData.minComboLength);
        let arrayOfStrings = array.map(combo => combo.join(''));
        let subComboString = subCombo.join('');

        if (!arrayOfStrings.includes(subComboString)) subCombos.push(subCombo);
      // Conditional removes repetition in final combo list as getDiagonals()
      // already returns ~25% of subCombos.
      }
    });
    return subCombos;
  }

  function getBoardIndexesFor(val) {
    let rowIndex, colIndex;

    gameData.board.forEach((row, index) => {
      if (row.includes(val)) {
        [rowIndex, colIndex] = [index, row.indexOf(val)];
      }
    });
    return [rowIndex, colIndex];
  }

  return gameData;
};

module.exports = buildGame;