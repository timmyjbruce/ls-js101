
// Variables -------------------------------------------------------------------
const rlSync = require('readline-sync');
const TEXT = require('./game-text.json')
rlSync.setDefaultOptions({prompt: '$ '});

const [PLAYER_ID, COMPUTER_ID] = ['X', 'O'];
const NO_MOVE = ' ';
const MIN_COMBO_LENGTH = 3;
const GAME_SIZES = ['3', '4', '5'];
const DIM_TEXT = '\x1b[2m%s\x1b[0m';// '2m' is colour code, shorturl.at/IJKSV
let game = {}; // Contains all generated game data (excuding constants)



// Game process ----------------------------------------------------------------

messageUser(TEXT.welcome)
askGameSize();
setUpGame();



// Near win test
// game.moves = {
//   '1': 'X',
//   '2': ' ',
//   '3': 'X',
//   '4': ' ',
//   '5': 'X',
//   '6': 'O',
//   '7': 'O',
//   '8': 'O',
//   '9': ' '
// }






// console.log(game)


while (true) {  // Game loop (if rounds)
  messageUser(TEXT.start)
  showGame();
  
  while (true) { // Round loop  
    let playerMove = getPlayerMove();
    updateGame(playerMove, PLAYER_ID);
    if (checkForWinner(PLAYER_ID)) break;

    let computerMove = getComputerMove();
    updateGame(computerMove, COMPUTER_ID);
    if (checkForWinner(COMPUTER_ID)) break;

    messageUser(TEXT.computerTurn)
    showGame();
    if (checkForDraw()) break;
  }
if (!continueGame()) break;
}
messageUser(TEXT.thanks)


// Functions -------------------------------------------------------------------

// Core game loop functions
// -----------------------------------------------------

function messageUser(...messages) {
  messages.forEach(message => console.log(message));
}

function getPlayerMove() {
  let moveRange = `1—${game.moveCount}`;
  
  messageUser(TEXT.q.move + moveRange);
  console.log(DIM_TEXT, TEXT.q.help) 
  
  let input = rlSync.prompt();
  input = checkHelpNeeded(input);
  input = checkValid(input);
  return input;  
}

function checkHelpNeeded (input) {
  if (input === '#') {
    showGame('help')
    messageUser(TEXT.q.moveShort);
    input = rlSync.prompt();
  }
  return input;
}

function askGameSize() {
  let sizes = joinOr(GAME_SIZES);
  
  messageUser(TEXT.rules, TEXT.q.size + sizes)
  let choice = checkValid(rlSync.prompt(), GAME_SIZES);
  game.boardSize = parseInt(choice);
  game.moveCount = game.boardSize ** 2;
}

function setUpGame() {
  let buildGame = require('./game-build.js');
  Object.assign(game, buildGame(game, MIN_COMBO_LENGTH, NO_MOVE))
}

function showGame(extraDisplay) {
  let displayGame = require('./game-display.js');
  return displayGame(game, NO_MOVE, extraDisplay);
}

function updateGame(move, id) {
  game.moves[move] = id;
}

function checkForWinner(id) {
  let completedMoves = getMoves(id);
  let isWinner = false;

  game.combos.forEach(combo => {
    if (combo.every(comboMove => completedMoves.includes(String(comboMove)))) {
      isWinner = true;
      processWin(id);
    }
  });
  return isWinner;
}

function processWin(id) {
  showGame()
  messageUser(TEXT.winner[id]);
  game.turnCountdown = -1;
  game.score[id] += 1;
}

function checkForDraw(turn) {
  let allWinningMoves = [getWinningMoves(PLAYER_ID), getWinningMoves(COMPUTER_ID)];
  
  if (turn <= 1 && allWinningMoves.length > 0) {
    messageUser(TEXT.draw);
    turnCountdown = -1;
    game.score.draws += 1;
  }
}

function continueGame() {
  messageUser(TEXT.q.continue);
  let choice = rlSync.prompt();
  choice = checkValid(choice, ['Y','N','n','y']);

  setUpGame();
  return choice.toUpperCase() === 'Y';
}


// Computer move logic
// -----------------------------------------------------------------------------
// Logic works per LS bonus feature requirements. Additionally computer trys to 
// avoid playing into combos already populated with a player token (this matters 
// more on larger boards)

function getComputerMove() {
  let allCurrentMoves = getMoves(PLAYER_ID).concat(getMoves(COMPUTER_ID));

  let winningMoves = getWinningMoves(COMPUTER_ID);
  if (winningMoves.length > 0) {
    return pickRandomFrom(winningMoves);
  }
  let playerWinningMoves = getWinningMoves(PLAYER_ID);
  if (playerWinningMoves.length > 0) {
    return pickRandomFrom(playerWinMoves)
  }
  // let superMoves = getSuperMoves()
  // if (getIntersects(superMoves, allCurrentMoves).length < 1){
  //   return pickRandomFrom(superMoves);
  // } 
  let comboMoves = getComboMoves();
  if (comboMoves.length > 0){
    return pickRandomFrom(comboMoves);
  } 
  return pickRandomFrom(getMoves(NO_MOVE));
}

function getWinningMoves(id) {
  let winningMoves = [];
  let currentMoves = getMoves(id);

  game.combos.forEach(combo => {
      combo.forEach(move => {
        let winningPlay = currentMoves.concat([move]);
        if (combo.every(ele => winningPlay.includes(ele))) {
          winningMoves.push(move);
        }
      });
  });
  return getIntersects(winningMoves, getMoves(NO_MOVE));
}

function getComboMoves() {
  let smartMoves = [];
  let computerMoves = getMoves(PLAYER_ID);
  
  game.combos.map(combo => {
  let comboMoves = getIntersects(combo, computerMoves);
  let possibleComboMoves = getIntersects(comboMoves, getMoves(NO_MOVE));
  moves = smartMoves.concat(possibleComboMoves)
  })
  return smartMoves;
}

function getSuperMoves() {
  let centerMove = Math.ceil(game.moveCount / 2);
  if (game.moveCount % 2 === 1) return [centerMove];

  if (game.moveCount % 2 === 0) {
    let halfRowLength =  game.boardSize / 2;
    let num1 = centerMove - halfRowLength;
    let num3 = centerMove + halfRowLength
    let superMoves = [num1, num1 + 1, num3, num3 + 1]
    superMoves = superMoves.map(move => String(move));
    
    // console.log('superMoves:')
    // console.log(superMoves)
    // console.log('available moves')
    // console.log(getMoves(NO_MOVE))

    return getIntersects(superMoves, getMoves(NO_MOVE))
  } // even boards have 4x central 'supermoves'
} 


// Helper functions ------------------------------------------------------------

function getMoves(moveStatus) {
  let moveList = Object.keys(game.moves);
  if (moveStatus === undefined) return moveList;
  else return moveList.filter(ele => game.moves[ele] === moveStatus);
}

function pickRandomFrom(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getIntersects(arrayToFilter, array) {
  return arrayToFilter.filter(ele => array.includes(ele));
}

function resetGame() {
  for (let num = 1; num <= game.moveCount; num++) {
    moves[num] = NO_MOVE;
  }
}

function checkValid(item, arrayValidItems = getMoves(NO_MOVE)) {
  while (!arrayValidItems.includes(item)) {
    messageUser(TEXT['invalid']);
    item = rlSync.prompt();
  }
  return item;
}

function joinOr(array, endChars = '') {
  let last = array.length - 1;
  let joined = array.slice(0, last).join(', ');
  return `${joined} or ${array[last]}${endChars}`;
}


// If combo includes a playerMove, and is a min-length combo, computer shouldn't
// play it, unless no other choice 

// Option to reassign X and O at game start
// Use array decontrucntion to swap values
// Let player know  who is who.

// Player 1 always goes first
// User array decontrunction inside nested function to swap turn order?

// Rename 'moves' to 'squares'?
// Rename 'board' to boardStructure'?