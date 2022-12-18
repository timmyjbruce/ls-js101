
// Variables -------------------------------------------------------------------
const rlSync = require('readline-sync');
const TEXT = require('./game-text.json')
rlSync.setDefaultOptions({prompt: '$ '});

const [PLAYER_ID, COMPUTER_ID] = ['X', 'O'];
const GAME_SIZES = ['3', '4', '5', '6', '7', '8', '9'];
const MIN_COMBO_LENGTH = 3;
const DIM_TEXT = '\x1b[2m%s\x1b[0m';
const EMPTY_MOVE_ID = ' ';
let gameData = {}; // Contains all generated gameData data
let startingPlayer = PLAYER_ID;
let currentPlayer = PLAYER_ID;



// Game process ----------------------------------------------------------------

messageUser(TEXT.welcome)
askGameSize();
setUpGame();
askWhoStarts();

while (true) {  // Round loop
  startRound();

  while (true) { // Game loop (per player)
    chooseSquare(currentPlayer);   
    displayGame(); 
    if (checkForWinner(currentPlayer)) break;
    if (checkForDraw()) break;

    switchPlayers(currentPlayer);

    
  }

if (continueGame()) break;
}
messageUser(TEXT.thanks)


// Functions -------------------------------------------------------------------

// Core game loop functions
// -----------------------------------------------------

function startRound() {
  if (gameData.rounds > 0) {
    startingPlayer = switchPlayers(startingPlayer);
    currentPlayer = startingPlayer;
  }
  if (currentPlayer === PLAYER_ID) {
    messageUser(TEXT.playerStart);
    displayGame();
  } else messageUser(TEXT.computerStart);
} 

function messageUser(...messages) {
  messages.forEach(message => {
    if (Array.isArray(message)) console.log(message[1], message[0])
    else console.log(message)
  })
}
function getPlayerMove() {
  messageUser(TEXT.q.move + `1—${gameData.moveCount}`);
  messageUser([TEXT.q.help, DIM_TEXT]);
  
  let input = rlSync.prompt();
  input = checkHelpNeeded(input);
  input = checkValid(input);
  return input;  
}

function checkHelpNeeded (input) {
  if (input === '#') {
    displayGame('help')
    messageUser(TEXT.q.moveShort);
    input = rlSync.prompt();
  }
  return input;
}

function askGameSize() {
  let sizes = joinOr(GAME_SIZES);
  messageUser(TEXT.rules, TEXT.q.size + sizes)
  let choice = checkValid(rlSync.prompt(), GAME_SIZES);
  gameData.boardSize = parseInt(choice);
  gameData.moveCount = gameData.boardSize ** 2;
}

function askWhoStarts() {
  let validChoices = ['y', 'c'];
  messageUser(TEXT.q.startingPlayer + joinOr(validChoices))
  let choice = rlSync.prompt();
  choice = checkValid(choice, validChoices);
  if (choice.toLowerCase() === validChoices[1]) currentPlayer = COMPUTER_ID;
}

function setUpGame() {
  let buildGame = require('./game-build.js');
  Object.assign(gameData, buildGame(gameData, MIN_COMBO_LENGTH, EMPTY_MOVE_ID))
}

function displayGame(extraDisplay) {
  let displayGame = require('./game-display.js');
  return displayGame(gameData, EMPTY_MOVE_ID, extraDisplay);
}

function chooseSquare(player) {
  if (player === PLAYER_ID) {
    gameData.moves[getPlayerMove()] = PLAYER_ID;
    messageUser(TEXT.playerTurn)
  } else {
    gameData.moves[getComputerMove()] = COMPUTER_ID;
    messageUser(TEXT.computerTurn)
  }
}

function switchPlayers(id) {
  if (id === PLAYER_ID) currentPlayer = COMPUTER_ID;
  else currentPlayer = PLAYER_ID;
}

function checkForWinner(id) {
  let completedMoves = movesByID(id);
  let isWinner = false;

  gameData.combos.forEach(combo => {
    if (combo.every(comboMove => completedMoves.includes(String(comboMove)))) {
      isWinner = true;
      processWin(id);
    }
  });
  return isWinner;
}

function processWin(id) {
  displayGame()
  messageUser(TEXT.winner[id]);
  gameData.turnCountdown = -1;
  gameData.score[id] += 1;
}

function checkForDraw() {
  let allWinningMoves = winningMoves(PLAYER_ID).concat(winningMoves(COMPUTER_ID));
  
  if (allWinningMoves.length > 0) {
    messageUser(TEXT.drawEarly);
    gameData.turnCountdown = -1;
    gameData.score.draws += 1;
  }
}

function continueGame() {
  if (gameData.rounds >= 1) {
    if (gameData.rounds === 1) {
      endGameWithRounds()
    } else {
      gameData.rounds -= 1;
      displayScore()
    }
    return false;
  }
  else return askPlayerContinue();
  
}

function askPlayerContinue() {
  messageUser(TEXT.q.continue);
  let choice = rlSync.prompt().toLowerCase();
  choice = checkValid(choice, ['y', 'n']);

  setUpGame();
  gameData.rounds = 3;
  return !choice === 'y';
}

function endGameWithRounds() {
  if (gameData.score[PLAYER_ID] > gameData.score[COMPUTER_ID]) {
    messageUser(TEXT.playerWinsRounds)
  } else if (gameData.score.draws % 2 === 1) {
    messageUser(TEXT.drawOfRounds)
  } else {
    messageUser(TEXT.drawOfRounds)
  }
  displayScore()
}

function displayScore() {
  let score = 'Player: ' + gameData.score[PLAYER_ID];
  score = score + ' | Computer: ' + gameData.score[COMPUTER_ID];
  score = score + ' | Draws: ' + gameData.score.draws + '\n';
  messageUser(score);
} 



// Computer move logic
// -----------------------------------------------------------------------------
// Logic works per LS bonus feature requirements. Additionally computer trys to 
// avoid playing into combos already populated with a player token (this matters 
// more on larger boards)

function getComputerMove() {
  
  // Pick winning move if available
  if (winningMoves(COMPUTER_ID).length > 0) {
    return pickRandomEle(winningMoves(COMPUTER_ID));
  }
  // Block players winning move if needed
  if (winningMoves(PLAYER_ID).length > 0) {
    return pickRandomEle(winningMoves(PLAYER_ID))
  }
  // Play 1x random center square 'supermove' (4x superMoves on even boards)
  let superMovesPlayed = intersectsOf(superMoves(), movesByID(COMPUTER_ID))
  if (superMoves().length > 0 && superMovesPlayed.length <= 0) {
    return pickRandomEle(superMoves());
  }
  // Play move thats part of an open 'combo' on the board
  if (comboMoves().length > 0) {
    return pickRandomEle(comboMoves())
  };
  // Play a random move
  return pickRandomEle(movesByID(EMPTY_MOVE_ID));
}

function winningMoves(id) {
  let winningMoves = [];
  let currentMoves = movesByID(id);

  gameData.combos.forEach(combo => {
      combo.forEach(move => {     
        let winningPlay = currentMoves.concat([String(move)]);
        if (combo.every(ele => winningPlay.includes(ele))) {
          winningMoves.push(move);
        }
      });
  });
  return intersectsOf(winningMoves, movesByID(EMPTY_MOVE_ID));
}

function comboMoves() {
  let smartMoves = [];
  let computerMoves = movesByID(PLAYER_ID);
  
  gameData.combos.map(combo => {
  let comboMoves = intersectsOf(combo, computerMoves);
  let possibleComboMoves = intersectsOf(comboMoves, movesByID(EMPTY_MOVE_ID));
  moves = smartMoves.concat(possibleComboMoves)
  })
  return smartMoves;
}

function superMoves() {
  let centerMove = Math.ceil(gameData.moveCount / 2);
  if (gameData.moveCount % 2 === 1) return [String(centerMove)];

  if (gameData.moveCount % 2 === 0) {
    let halfRowLength =  gameData.boardSize / 2;
    let num1 = centerMove - halfRowLength;
    let num3 = centerMove + halfRowLength
    let superMoves = [num1, num1 + 1, num3, num3 + 1]
    superMoves = superMoves.map(move => String(move));

    return intersectsOf(superMoves, movesByID(EMPTY_MOVE_ID))
  }
} 


// Helper functions ------------------------------------------------------------

function movesByID(ID) {
  let moveList = Object.keys(gameData.moves);
  if (ID === undefined) return moveList;
  else return moveList.filter(ele => gameData.moves[ele] === ID);
}

function pickRandomEle(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function intersectsOf(arrayToFilter, array) {
  return arrayToFilter.filter(ele => array.includes(ele));
}

function checkValid(item, arrayValidItems = movesByID(EMPTY_MOVE_ID)) {
  while (!arrayValidItems.includes(item)) {
    messageUser(TEXT['invalid']);
    item = rlSync.prompt().toLowerCase();
  }
  return item;
}

function joinOr(array, endChars = '') {
  let last = array.length - 1;
  let joined = array.slice(0, last).join(', ');
  return `${joined} or ${array[last]}${endChars}`;
}




// Rename 'moves' to 'squares'?
// Rename 'board' to boardStructure'?



// Check draw logic, review screenshot
// Review supermove
// If combo includes a playerMove, and is a min-length combo, computer shouldn't
// play it, unless no other choice 
// simplify initial logic function (very long)
// Review naming
// Tidy function order
// Thoroughly test game
// Write expanatory intro for LS review post
// Add best of 5 games func