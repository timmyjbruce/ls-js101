// PEDAC

// Data structure
// -----------------------------------------------------------------------------
// Board design:
//    |   |   
// -----------
//    |   |   
// -----------
//    |   |     

// Board array:
// let board = 
// ['   |   |   ',
//  '-----------',
//  '   |   |   ',
//  '-----------',
//  '   |   |   '
// ];

// Position mapping object
// let gameStatus = {
//   '1': { location: [0, 1], status: 'none'},
//   '2': { location: [0, 5], status: 'none'},
//   '3': { location: [0, 9], status: 'none'},
//   '4': { location: [1, 1], status: 'none'},
//   '5': { location: [1, 5], status: 'none'},
//   '6': { location: [1, 9], status: 'none'},
//   '7': { location: [2, 1], status: 'none'},
//   '8': { location: [2, 5], status: 'none'},
//   '9': { location: [2, 9], status: 'none'}
// };

// let winningCombos = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [1, 4, 7],
//   [2, 5, 6],
//   [3, 6, 9]
//   [3, 5, 7],
//   [1, 5, 9]
// ];


// Welcome
// Welcome to tic tac toe!!!

// Question
// Choose an available square from 1 to 9:

// Update player
// (show game)
// You are 0, computer is X

// Position taken
// This position is already taken, select another (1-9)


// You win!


// Invalid entry
// Invalid entry, choose an available square from 1 to 9:



// Algorithm short
// -----------------------------------------------------------------------------
// Display the initial empty 3x3 board.
// Ask the user to mark a square.
// Computer marks a square.
// Display the updated board state.
// If it's a winning board, display the winner.
// If the board is full, display tie.
// If neither player won and the board is not full, go to #2
// Play again?
// If yes, go to #1
// Goodbye!


// Algorithm 
// -----------------------------------------------------------------------------
// Set 'turnsCountdown' to '9'
// Set 'game' to object of gameStatus (above)
// Set 'board' to array of strings (above)
// Set 'playerID' and 'computerID' to 'X' and 'O' respectively
// Set availableMoves to movesOfType 'empty'
// Set computerMoves to  movesOfType with arg computerID

// messageUser with welcome message
// Run showGame

// While turnCountdown is greater than 0

// messageUser asking the user to mark a square:
// Set playerMove to the readline question answer
// Run checkAnswer passing userAnswer and 'player' 
// While checkAnswer returns false, ask user to retry

// Run updateGame, passing userAnswer
// Run checkWinner, passing arg playerID

// If availableMoves length equals zero, break loop
// If turnCountdown zero of less, break loop

// Set computerMove to pickComputerMove return value
// Run updateGame, passing computerMove
// Run checkWinner, passing arg computerID

// Run showGame
// messageUser You chose [playerMove], computer chose [computerMove]

// -- End of loop 

// If turn count equals zero messageUser its a draw
// Ask to play again
// If play again restart loop
// Else Say goodbye


// ########## Functions

// ## Start messageUser, set input 'message'
// Log message to console

// ## Start 'showGame' 
// Iterate through the board array
// Log each element to the console

// ## Start updateGame, set 'move', 'ID' 
// Replace the status key's value, in them 'move' subobject in the 'game' object with 'ID'
// Subtract 1 from turnCount

// ## Start checkMove, set 'move'
// Need logic for player selection here
// If getMovesOfType includes move, return true, else false

// ## Start movesOfType, set 'type'
// Set 'moves' to an array of keys from Game status
// If type equals 'all', return moves.
// Else filter moves to moves that have an value of 'type' within the gameStatus array
// Return 'moves'

// ## Start 'checkWinner', set input 'ID'
// Iterate through combos in winning combos
// If every element in the combo array is included in the return of movesOfType with arg ID
// Log winner message to console
// And somehow skip to end of loop - logic to be developed here

// ## Start deepCopyArr, set input 'arr'
// Set newArr to empty array
// Iterate through arr
// For each subarray make a copy and push to newArr
// Return newArr

// # Start 'pickComputerMove'
// Set possibleMoves to empty array

// Loop through currentCompMoves while currentIdx is less than currentCompMoves length
// Set moveA to value of currentIdx
// Loop through currentCompMoves from currentIdx + 1
// Set moveB to value of currentIdx + count, but default it to currentElement
// Iterate through combos in winningCombos
// If combo arrayHas moveA & arrayHas moveB 
// Make a copy and send to possibleMoves
// ---
// With looping done, flatten possibleMoves
// Filter out any moves incldued in currentMoves
// Create array of moves counted by item
// Find highest count
// Filter counts array to only those of that count
// Pick a random move from that array

// # Start 'arrayHas', set inputs 'array', and 'value'
// Return true if array includes value

// # Start 'randomElement' set input, 'array'
// get a Random number
// Multiply by length of array
// Round number down to integer
// return the value at the index of array that matches the number
