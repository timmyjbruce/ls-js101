// Displaying the game
// -------------------------------------------------------
// Game display is generated dynamically based on boardSize value and other game
// properties. An argument can be passed to optionally show the tile number on
// empty tiles (useful on larger boards).

let displayGame = function(game, NO_MOVE, extraDisplay) {

const [VERT_DIV, SPACER] = ['|', ' '];
let horzDiv = '-'.repeat((game.boardSize * 4) - 1);
let lastIndex = game.boardSize - 1;

console.log(SPACER);
displayBoard()
console.log(SPACER)


function displayBoard() {
  game.board.map((row, rowIndex) => {
  row = row.map((move, moveIndex) => {
    move = formatMove(move);
    if (moveIndex !== lastIndex) move += VERT_DIV;
    return move;
  })
  console.log(row.join(''))
  if (rowIndex !== lastIndex) console.log(horzDiv)
  })
}

function formatMove(moveNum){
  let moveVal = game.moves[moveNum];
  
  if (extraDisplay === 'help' && moveVal === NO_MOVE) {
    if (String(moveNum).length <= 1) {
    return SPACER + moveNum + SPACER
    } else return SPACER + moveNum
  } 
  return SPACER + moveVal + SPACER
}  
}

module.exports = displayGame;