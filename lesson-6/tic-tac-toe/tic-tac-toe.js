// Game Data -------------------------------------------------------------------

let game = {
  'moves': {
    1: { boardLocation: [1, 1], status: ' '},
    2: { boardLocation: [1, 5], status: ' '},
    3: { boardLocation: [1, 9], status: ' '},
    4: { boardLocation: [3, 1], status: ' '},
    5: { boardLocation: [3, 5], status: ' '},
    6: { boardLocation: [3, 9], status: ' '},
    7: { boardLocation: [5, 1], status: ' '},
    8: { boardLocation: [5, 5], status: ' '},
    9: { boardLocation: [5, 9], status: ' '}
  },
  combos: [
    [ '1', '2', '3' ],  [ '4', '5', '6' ],  [ '7', '8', '9' ],  [ '1', '4', '7' ],
    [ '2', '5', '6' ],  [ '3', '6', '9' ],  [ '3', '5', '7' ],  [ '1', '5', '9' ]
  ],
  board: [
    '','   |   |   ', '-----------', '   |   |   ', 
    '-----------', '   |   |   ',''
  ],
  text: {
    welcome: 'Welome to TicTacToe',
    question: {
      move: {
        text: 'Choose an available square from 1 to 9',
        valid: undefined
      },
      continue: {
        text: 'Would you like to play again',
        valid: ['Y', 'y', 'N', 'n']
      }
    },
    invalid: "That's an invalid choice, please try again",
    draw: 'This round is a draw',
    winner: { 
      X: "X's win this round, play again?",
      O: "O's win this round, play again?",
    }
  },
  score: {
    X: 0,
    O: 0,
    draws: 0,
    rounds: 0
  }
};

// Variables -------------------------------------------------------------------
let rlSync = require('readline-sync');
rlSync.setDefaultOptions({prompt: '$ '});
let turnCountdown = 9;
const [PLAYER_ID, COMPUTER_ID] = ['X', 'O'];
const SUPER_MOVE = '5';


// start 'getBoardSize'
// set size
// ask user if they want to play tic-tac-mega, or classic
// If classic version
// - set size to 3
// If mega
// - set size to 4
// Send a move to game object for each squared of board (boardSize squared)

// Start 'board'
// Set board to an empty array
// Set row to an empty array
// let count = 1;
// While count <= boardSize squared
// Send count to row
// Add one to count
// If row length remainder from being divided by boardSize equals 0 
//  - Cut array array from row and send to board, leaving row an empty array
// Return board

// Start 'combos'
// Set horizontals to empty array
// Set diagonals to array with two empty subArray
// Set verticals to an array empty array

// Iterate through rows board in combo
// Set 'count' to current index
// - Send row to allCombos
// - Send element at index of index row to diaginals first array
// - Do inverse diagonal, by subtracting index from boardSize
// - Send an array containing the vlaue of each 'count' index for each row to verticals
// concat horizontals diagonals and verticals and return

// displayGame
// Set 'moves' to an array of keys from the move game
// Set 'vertDivider' to '|'
// Set 'spacer' to single space
// Iterate through keys, adding the spacer before and after each key
// 

// Set horizDivider to a string the length of **TBD**
// 
// Iterate through the moves
// 





// Game process ----------------------------------------------------------------

messageUser(game.text.welcome);
showGame();

do {
  while (turnCountdown > 0) {
    
    messageUser(game.text.question.move);
    
    let playerMove = checkValidInput(rlSync.prompt());
    updateGame(playerMove, PLAYER_ID);
    checkForWinner(PLAYER_ID);

    let computerMove = getComputerMove();
    updateGame(computerMove, COMPUTER_ID);
    checkForWinner(COMPUTER_ID);

    messageUser(game.text.computer);
    showGame();
    checkForDraw();
    
  }
} while (continueGame())



// Functions -------------------------------------------------------------------

function messageUser(message) {
  console.log(message)
}

function showGame() {
  game.board.forEach(line => messageUser(line))
}

function checkValidInput(item, arrayValidItems = movesOfStatus(' ')) {
  while (!arrayValidItems.includes(item)) {
    messageUser(game.text['invalid']);
    item = rlSync.prompt();
  }
  return item;
}

function updateGame(move, id) {
  let [rowIndex, charIndex] = game.moves[move]['boardLocation']
  let row = game.board[rowIndex];

  row = row.split('');
  row[charIndex] = id;
  game.board[rowIndex] = row.join('');
  game.moves[move]['status'] = id;
}

function checkForWinner(id) {
  let moveList = movesOfStatus(id);
  game.combos.forEach(combo => {
    if (combo.every(ele => moveList.includes(ele))){
      messageUser(game.text.winner[id]);
      turnCountdown = -1;
      game.score[id] += 1;
      console.log('Movelist:')
      console.log(moveList)
    }
  });
}

function getComputerMove() {

  let computerWinningMove = findWinningMoves(COMPUTER_ID);
  if (computerWinningMove.length > 0) return pickRandomFrom(computerWinningMove);

  let playerWinningMoves = findWinningMoves(PLAYER_ID);
  if (playerWinningMoves.length > 0) return pickRandomFrom(playerWinningMoves);

  let currentMoves = movesOfStatus(PLAYER_ID).concat(movesOfStatus(COMPUTER_ID));
  if (!currentMoves.includes(SUPER_MOVE)) return SUPER_MOVE;
  else return pickRandomFrom(movesOfStatus(' '));

}
function findWinningMoves(id) {
  let winningMoves = [];
  let currentMoves = movesOfStatus(id);

  game.combos.forEach(combo => {
      combo.forEach(move => {
        let winningPlay = currentMoves.concat([move]);
        if (combo.every(ele => winningPlay.includes(ele))) {
          winningMoves.push(move);
        }
      });
  });
  return filterArrayByArray(winningMoves, movesOfStatus(' ')); // ***** Simplify this ****
}

function checkForDraw() {
  let winningMoves = [findWinningMoves(PLAYER_ID), findWinningMoves(COMPUTER_ID)];
  
  if (turnCountdown <= 1 && winningMoves.length > 0) {
    messageUser(game.text.draw);
    turnCountdown = -1;
    game.score.draws += 1;
  }
}

function continueGame() {
  let question = game.text.question.move;
  
  messageUser(question.text);
  let choice = checkValidInput(rlSync.prompt(), question.valid);

  turnCountdown = 9;
  return choice.toUpperCase === 'Y';
}


// Helper functions ------------------------------------------------------------

function movesOfStatus(status) {
  let moveList = [];
  Object.entries(game.moves).forEach(ele => {
    if (status === ele[1]['status']) moveList.push(ele[0])
  });
  return moveList;
}

function pickRandomFrom(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function filterArrayByArray(arrayToFilter, array) {
  return arrayToFilter.filter(ele => {
    return array.includes(ele);
  })
}




// If combo includes a playerMove, and computer move, don't play it, unless not other choice 

// Option to reassign X and O at game start
// Use array decontrucntion to swap values
// Let player know  who is who.


// Player 1 always goes first
// User array decontrunction inside nested function to swap turn order?