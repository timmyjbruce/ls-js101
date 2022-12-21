
// Variables -------------------------------------------------------------------
const rlSync = require('readline-sync');
const TEXT = require('./game-text.json');
rlSync.setDefaultOptions({prompt: '$ '});

const [PLAYER_ID, COMPUTER_ID] = ['X', 'O'];
const GAME_SIZES = ['3', '4', '5', '6', '7', '8', '9'];
const EMPTY_MOVE_ID = ' ';
const DIM_TEXT = '\x1b[2m%s\x1b[0m';
const ROUND_NUM = 3;
let gameData = {}; // Contains all generated gameData data
let startingPlayer = PLAYER_ID;
let currentPlayer = PLAYER_ID;


// Core game process  ----------------------------------------------------------

messageUser(TEXT.welcome);
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

    currentPlayer = switchPlayers(currentPlayer);
  }

  if (continueGame()) break;
}
messageUser(TEXT.thanks);


// # Functions -------------------------------------------------------------------

// ## 1. Core game loop functions --------------------

function askGameSize() {
  let sizes = joinOr(GAME_SIZES);
  messageUser(TEXT.q.size + sizes);
  let choice = checkValid(rlSync.prompt(), GAME_SIZES);
  gameData.boardSize = parseInt(choice, 10);
  gameData.moveCount = gameData.boardSize ** 2;
}

function askWhoStarts() {
  let validChoices = ['y', 'c'];
  messageUser(TEXT.q.startingPlayer + joinOr(validChoices));
  let choice = rlSync.prompt();
  choice = checkValid(choice, validChoices);
  if (choice.toLowerCase() === validChoices[1]) currentPlayer = COMPUTER_ID;
}

function setUpGame() {
  let buildGame = require('./game-build.js');
  Object.assign(gameData, buildGame(gameData, EMPTY_MOVE_ID));
}

function startRound() {
  const BASIC_GAME_SIZE = 3;

  if (gameData.roundCount === 0 && gameData.boardSize > BASIC_GAME_SIZE) {
    displayRules();
    checkValid(rlSync.prompt(), ['s']);
  }
  if (gameData.roundCount > 0) { 
    startingPlayer = switchPlayers(startingPlayer);
    currentPlayer = startingPlayer; 
  }
  if (currentPlayer === PLAYER_ID) {
    messageUser(TEXT.playerStart);
    displayGame();
  } else messageUser(TEXT.computerStart);
}

function displayRules() {
  let comboSize = gameData.minComboLength;
  let boardSize = gameData.boardSize + 'x' + gameData.boardSize;
  let rules = TEXT.rules;

  messageUser(`${rules.a} ${boardSize} ${rules.b} ${comboSize} ${rules.c}`)
}

function chooseSquare(player) {
  if (player === PLAYER_ID) {
    gameData.moves[getPlayerMove()] = PLAYER_ID;
    messageUser(TEXT.playerTurn);
  } else {
    gameData.moves[getComputerMove()] = COMPUTER_ID;
    messageUser(TEXT.computerTurn);
  }
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
    displayGame('help');
    messageUser(TEXT.q.moveShort);
    input = rlSync.prompt();
  }
  return input;
}

function displayGame(extraDisplay) {
  let displayGame = require('./game-display.js');
  return displayGame(gameData, EMPTY_MOVE_ID, extraDisplay);
}

function switchPlayers(id) {
  if (id === PLAYER_ID) return COMPUTER_ID;
  else return PLAYER_ID;
}

function checkForWinner(id) {
  let moveList = movesByID(id);
  let winner = false;

  gameData.combos.forEach(combo => {
    if (combo.every(comboMove => moveList.includes(comboMove))) winner = true;
  });
  if (winner) {
    displayGame();
    messageUser(TEXT.winner[id]);
    gameData.score[id] += 1;
  }
  return winner;
}

function checkForDraw() {
  let numPlayerWinningMoves = winningMoves(PLAYER_ID).length;
  let numComputerWinningMoves = winningMoves(COMPUTER_ID).length;
  let numAllWinningMoves = numComputerWinningMoves + numPlayerWinningMoves;
  let numPlayedMoves = gameData.moveCount - movesByID(EMPTY_MOVE_ID).length;
  const MIN_NUM_PLAYED_MOVES = gameData.moveCount - gameData.boardSize;
  // There is no doubt a smarter way to generate this min-num. For now, it is
  // set as the num of board tiles minus one row's worth.

  if (numAllWinningMoves === 0 && numPlayedMoves >= MIN_NUM_PLAYED_MOVES) {
    if (numPlayedMoves === gameData.moveCount) {
      messageUser(TEXT.draw);
    } else messageUser(TEXT.drawEarly);

    gameData.score.draws += 1;
    return true;
  }
}

function continueGame() {
  if (gameData.roundCount === 1) {
    endGameWithRounds();
    displayScore();
    return true;
  }
  if (gameData.roundCount > 1) {
    gameData.roundCount -= 1;
    resetBoard();
    displayScore();
    return false;
  }
  else {
    resetBoard();
    gameData.roundCount = ROUND_NUM;
    return askPlayerContinue()
  };
}

function resetBoard() {
  reassignAllValues(gameData.moves, EMPTY_MOVE_ID)
};

function askPlayerContinue() {
  messageUser(TEXT.q.continue);
  let choice = rlSync.prompt().toLowerCase();
  choice = checkValid(choice, ['y', 'n']);
  return !choice === 'y';
}

function displayScore() {
  let playerScore = `Player: ${gameData.score[PLAYER_ID]}`;
  let computerScore = `Computer: ${gameData.score[COMPUTER_ID]}`;
  let drawScore = `Draws: ${gameData.score.draws}\n`;

  messageUser(`${playerScore} | ${computerScore} | ${drawScore}`);
}

function endGameWithRounds() {
let playerScore = gameData.score[PLAYER_ID]
let computerScore = gameData.score[COMPUTER_ID]

  if (playerScore > computerScore) messageUser(TEXT.playerWinsRounds);
  else if (playerScore < computerScore) messageUser(TEXT.computerWinsRounds);
  else messageUser(TEXT.drawRounds)
}

// ## 2. Computer move logic and functions -----------------

// Note. Logic works per LS bonus feature requirements, additionally computer
// trys to play into open combos on the board.

function getComputerMove() {

  if (winningMoves(COMPUTER_ID).length > 0) {
    return pickRandomEle(winningMoves(COMPUTER_ID));
  } // Pick winning move if available
  
  if (winningMoves(PLAYER_ID).length > 0) {
    return pickRandomEle(winningMoves(PLAYER_ID));
  } // Block players winning move if needed
  
  let superMovesPlayed = intersectsOf(superMoves(), movesByID(COMPUTER_ID));
  if (superMoves().length > 0 && superMovesPlayed.length <= 0) {
    return pickRandomEle(superMoves());
  } // Play 1x random center square 'supermove' (4x superMoves on even boards)

  if (comboMoves().length > 0) {
    return pickRandomEle(comboMoves());
  } // Play move thats part of an open 'combo' on the board

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

  gameData.combos.forEach(combo => {
    let comboMoves = intersectsOf(combo, computerMoves);
    let possibleComboMoves = intersectsOf(comboMoves, movesByID(EMPTY_MOVE_ID));
    let moves = smartMoves.concat(possibleComboMoves);
  });
  return smartMoves;
}

function comboMoves() {
  let smartMoves = [];
  let computerMoves = movesByID(COMPUTER_ID);

  gameData.combos.forEach(combo => {
    let comboMoves = intersectsOf(combo, computerMoves);
    let possibleComboMoves = intersectsOf(comboMoves, movesByID(EMPTY_MOVE_ID));
    smartMoves.concat(possibleComboMoves);
  });
  return smartMoves;
}

function superMoves() {
  let centerMove = Math.ceil(gameData.moveCount / 2);
  if (gameData.moveCount % 2 === 1) return [String(centerMove)];

  let superMoves = [];
  if (gameData.moveCount % 2 === 0) {
    let halfRowLength =  gameData.boardSize / 2;
    let num1 = centerMove - halfRowLength;
    let num3 = centerMove + halfRowLength;
    superMoves.push(num1, num1 + 1, num3, num3 + 1);
    superMoves = superMoves.map(move => String(move));
  }
  return intersectsOf(superMoves, movesByID(EMPTY_MOVE_ID));
}


// ## 3. Helper functions --------------------------

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
  let lastIdx = array.length - 1;
  let joined = array.slice(0, lastIdx).join(', ');
  return `${joined} or ${array[lastIdx]}${endChars}`;
}

function reassignAllValues(object, value) {
  Object.keys(object).forEach(key => object[key] = value);
}

function messageUser(...messages) {
  messages.forEach(message => {
    if (Array.isArray(message)) console.log(message[1], message[0]);
    else console.log(message);
  });
}

// Update instruction for combo length and it's position in game order.

// Check the endgame logic, game ends it player and computer have 1 point each.
// Review supermove

// Bug with game ending early

// Tidy function order
// Thoroughly test game
// eslint files