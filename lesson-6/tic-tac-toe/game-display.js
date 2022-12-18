
// Displaying the game board
// -------------------------------------------------------
// Game board display is generated dynamically based on boardSize and other
// gameData values. An optionally argument can be passed to print a board that
// shows the tile number on empty tiles (useful on larger boards).

let displayGame = function(gameData, NO_MOVE, extraDisplay) {

const [VERT_DIV, SPACER] = ['|', ' '];
const HORZ_DIV = '-'.repeat((gameData.boardSize * 4) - 1);
let lastIndex = gameData.boardSize - 1;

console.log(SPACER);
displayBoard()
console.log(SPACER)

function displayBoard() {
  gameData.board.map((row, rowIndex) => {
  row = row.map((move, moveIndex) => {
    tile = formatTile(move);
    if (moveIndex !== lastIndex) tile += VERT_DIV;
    return tile;
  })
  console.log(row.join(''))
  if (rowIndex !== lastIndex) console.log(HORZ_DIV)
  })
}

function formatTile(moveNum) {
  let moveVal = gameData.moves[moveNum];
  
  if (extraDisplay === 'help' && moveVal === NO_MOVE) {
    if (String(moveNum).length <= 1) {
    return SPACER + moveNum + SPACER
    } else return SPACER + moveNum
  } 
  return SPACER + moveVal + SPACER
}  
}

module.exports = displayGame;