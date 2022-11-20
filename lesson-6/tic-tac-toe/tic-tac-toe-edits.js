

let game = {
  'moves': {
    '1': { boardLocation: [1, 1], status: 'none'},
    '2': { boardLocation: [1, 5], status: 'none'},
    '3': { boardLocation: [1, 9], status: 'none'},
    '4': { boardLocation: [3, 1], status: 'none'},
    '5': { boardLocation: [3, 5], status: 'none'},
    '6': { boardLocation: [3, 9], status: 'none'},
    '7': { boardLocation: [5, 1], status: 'none'},
    '8': { boardLocation: [5, 5], status: 'none'},
    '9': { boardLocation: [5, 9], status: 'none'}
  },
  'combos': [
    [ '1', '2', '3' ],  [ '4', '5', '6' ],  [ '7', '8', '9' ],  [ '1', '4', '7' ],
    [ '2', '5', '6' ],  [ '3', '6', '9' ],  [ '3', '5', '7' ],  [ '1', '5', '9' ]
  ],
  'board': [
    '','   |   |   ', '-----------', '   |   |   ', 
    '-----------', '   |   |   ',''
  ],
  'text': {
    'welcome': 'Welome to TicTacToe',
    'questionChoose': 'Choose an available square from 1 to 9',
    'invalid': "That's an invalid choice, please try again",
    'score': 'Welome to TicTacToe',
    'draw': 'Welome to TicTacToe',
    'winner': 'You won this round, play again?'
  }
};

let test1 = ['4', '5', '7'] // should return '1' and '6' and '3'
let test2 = ['4', '5'] // should return ['6']
let test3 = [] // should return []

// console.log(findWinningMoves(test1))
// console.log(findWinningMoves(test2))
// console.log(findWinningMoves(test3))

let test4 = ['4', '5', '7'] // should return
let test5 = ['4', '5'] // should return
let test6 = [] // should return 

console.log(findBasicMoves(test1))
console.log(findBasicMoves(test2))
console.log(findBasicMoves(test3))



function findWinningMoves(id) {
  let winningMoves = [];
  let currentMoves = ['4', '5', '7']; // changet to: movesOfStatus(id);

  game.combos.forEach(combo => {
      combo.forEach(move => {
        let winningPlay = currentMoves.concat([move]);
        if (combo.every(ele => winningPlay.includes(ele))) {
          winningMoves.push(move);
        }
      })
  })
  return winningMoves;
}


function findBasicMoves(id) {
  let reccommendedMoves = {};
  let currentMoves = movesOfStatus(id)
  let availableMoves = movesOfStatus('none');

  currentMoves.forEach(existingMove => {
    game.combos.forEach(combo => {
        if (combo.includes(existingMove)) {
          combo.forEach(newMove => {
            if (availableMoves.includes(newMove)) {
              reccommendedMoves[newMove] = reccommendedMoves[newMove] || 0;
              reccommendedMoves[newMove] += 1;
            }
          });
        }
    });
  });
  return highestPropsByValue(reccommendedMoves);
}


function highestPropsByValue(obj) {
  let keys =  Object.keys(obj);
  let values =  Object.values(obj);
  let topValue = values.sort()[0];
  
  return keys.filter(ele => {
    return obj[ele] === topValue;
  });
}


function filterArrayByArray(arrayToFilter, array) {
  return arrayToFilter.filter(ele => {
    return array.includes(ele);
  })
}


function movesOfStatus(status) {
  let moveList = [];
  Object.entries(game.moves).forEach(ele => {
    if (status === ele[1]['status']) moveList.push(ele[0])
  });
  return moveList;
}

// PEDAC

// Set availablemoves to available moves
// Set currentMoves to unavailable moves
// Set reccommendedMoves to empty object

// Iterate through existingMoves in computerMoves
// Iterate through combos in combo

// If combo includes exisitingMove
// Iterate through newMoves in combo
// Assign avaliable newMoves to reccommendedMoves


//    |   |   
// -----------
//    | X |   
// -----------
//    | X | X 






function findBasicMoves(id) {
  let reccommendedMoves = {};
  let currentMoves = movesOfStatus(id)
  let availableMoves = movesOfStatus('none');

  currentMoves.forEach(existingMove => {
    game.combos.forEach(combo => {
        if (combo.includes(existingMove)) {
          combo.forEach(newMove => {
            if (availableMoves.includes(newMove)) {
              reccommendedMoves[newMove] = reccommendedMoves[newMove] || 0;
              reccommendedMoves[newMove] += 1;
            }
          });
        }
    });
  });
  console.log('computer basic move list: ')
  console.log(reccommendedMoves)
  return highestPropsByValue(reccommendedMoves);
} 



function highestPropsByValue(obj) {
  let keys =  Object.keys(obj);
  let values =  Object.values(obj);
  let topValue = values.sort()[0];
  
  return keys.filter(ele => {
    return obj[ele] === topValue;
  });
}