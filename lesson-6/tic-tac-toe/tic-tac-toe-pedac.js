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


// Additional algorithms for generating custom board size
// -----------------------------------------------------------------------------

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


// start 'transpose'
// given array of subarrays
// set row to empty array
// iterate through subarrays in array, get row
// iterate through elements in subArray, get column
// to array[column] send subArray[row]




// ### PEDAC for getting diagonal combos
// -----------------------------------------------------------------------------

// From 3x3 expect [1,5,9],[3,5,7]

// Iterate through rows board in combo


//  1 | 2 | 3 
// -----------
//  4 | 5 | 6 
// -----------
//  7 | 8 | 9

//  1 | 2 | 3 | 4
// ---------------
//  5 | 6 | 7 | 8
// ---------------
//  9 | 10| 11| 12
// ---------------
//  13| 14| 15| 16

// ### First row combos (4 x 4)
// [1, 6, 11, 16]   Indexes [0, 0], [1,1], [2,2], [3,3]
// [2, 7, 12, NA]   Indexes [0, 1], [1,2], [2,3], [3,4]
// [3, 8, NA, NA]   Indexes [0, 2], [1,3], [2,4], [3,5]
// [4, NA, NA, NA]  Indexes [0, 3], [1,4], [2,5], [3,6]

// ### Incrementing co-ords for inverse combos
// Set outerCount to 0
// Iterate through rows, getting rowIndex
// Set innerCount to 0
// Iterate through columns
// Return value at rowIndex + outercount and rowIndex + innerCount

// ### Alternate approach based on summing numbers (above is very comples)

// [1, 6, 11, 16]   Equation = num + boardSize + 1, 4x iterations
// [2, 7, 12, NA]   Equation = num + boardSize + 1, 3x iterations
// [3, 8, NA, NA]   Equation = num + boardSize + 1, 2x iterations
// [4, NA, NA, NA]  Equation = num + boardSize + 1, 1x iteration

// Can repeat the above^ for each row, reducing the iteration count by the rowIndex
// Eg: for [5, 10, 15]  equation = num + boardSize + 1, 3x iterations
// ThenFilter out combos less than 3 in length

// Algorithm for combos
// Set minComboSize to 3

// Set outerCount to 0
// While outerCount is less than moveCount

// Set innerCount to the outerCount remainder from being divided by boardSize
// While innerCount is less than boardSize
// Set array to empty array
// Set num to outercount + innercount * boardSize + 1
// Send num to Array
// If array length = boardSize - innerCount cut send push array to combos


// ### Inverse first row combos (4 x 4)
// [4, 7, 10, 13]   Indexes [0, 3], [1,2],  [2,1],  [3,0]
// [3, 6, 9, NA]    Indexes [0, 2], [1,1],  [2,0],  [0,-1]
// [2, 5, NA, NA]   Indexes [0, 1], [1,0],  [2,-1], [3,-2]
// [1, NA, NA, NA]  Indexes [0, 0], [1,-1], [2,-2], [3,-3]



//  1 | 2 | 3 | 4 | 5
// -------------------
//  6 | 7 | 8 | 9 | 10
// -------------------
//  11| 12| 13| 14| 15
// -------------------
//  16| 17| 18| 19| 20
// -------------------
//  21| 22| 23| 24| 25

// Get vertical diagonals
// Set minComboSize to 3
// Iterate through rows
// Get first index of first row
// Second index of second row
// Third index of third row etc
// If index is not undefined push it to array
// If index + 1 equals boardSize and array length equals cut array and paste to indexes

// Algorithm for combos
// Set minComboSize to 3

// Set outerCount to 0
// While outerCount is less than moveCount

// Set innerCount to the outerCount remainder from being divided by boardSize
// While innerCount is less than boardSize
// Set array to empty array
// Set num to outercount + innercount * boardSize + 1
// Send num to Array
// If array length = boardSize - innerCount cut send push array to combos


//  1 | 2 | 3 
// -----------
//  4 | 5 | 6 
// -----------
//  7 | 8 | 9

// Number sequence to generate / count:
// Required:  1, 5, 9, 2, 6, 3
// Count:     1, 1, 1, 2, 2, 3
// Alt count: 1, 2, 3, 1, 2, 1




// ### Working out equation
// count + 1   // 1 , 1 , 1 , 2 , 2 , 3 
// count       // 1 , 1 , 1 , 2 , 2 , 3 
// num + 1     // 1 , 2 , 3 , 1 , 2 , 1 
// num         // 0 , 1 , 2 , 0 , 1 , 0 
// Sequence needed:         // 1 , 5 , 9 , 2 , 6 , 3

// ### Working out iteration reduction
// Calculated num:                 1 5 9 2 6 3 8 12 9 15
// Math.floor(count / boardSize):  0 0 0 0 0 0 1 1  1 2






// Negative diagonal combo algorithm sequencing
// -----------------------------------------------------------------------------

//  1 | 2 | 3 
// -----------
//  4 | 5 | 6 
// -----------
//  7 | 8 | 9


// ##### Need to subtract from moveCount somewhere in the equation ######

// ### Working out reverse equation
// count + 1              // 1 , 1 , 1 , 2 , 2 , 3 , 4 , 4 , 4 , 5 , 5 , 6
// count                  // 0 , 0 , 0 , 1 , 1 , 2 , 3 , 3 , 3 , 4 , 4 , 5
// num + 1                // 1 , 2 , 3 , 1 , 2 , 1 , 1 , 2 , 3 , 1 , 2 , 1
// num                    // 0 , 1 , 2 , 0 , 1 , 0 , 0 , 1 , 2 , 0 , 1 , 0
// num inv                // 3 , 2 , 1 , 3 , 2 , 3 , 3 , 2 , 1 , 3 , 2 , 3
// Sequence needed:       // 3 , 5 , 7 , 2 , 4 , 1 , 6 , 8 ,10 , 5 , 7 , 4
// Whats happening        /1x3 ,+2, +2 ,-5 ,+2 ,-3 ,2x3,+2 ,+2 ,-5 ,+2  -3
// If subtracting from 9  //-6 ,-4 ,-2 ,-7 ,-5 ,-8 ,-3 ,-1 ,+1, -4 ,-2 ,-5
// Equation: 9 - ((boardsize - (num + 1)) * (boardsize - num))
//           9 - (numInv * (boardSize - (num + 1)))
// 
// Sequence with moveCount (9)

// 1 = 3, 4 = 6
// count + (boardSize - 1) + (num * (boardSize - 1))
// moveCount - 


// ### Working out reverse equation
// count                  // 0 , 0 , 0 , 1 , 1 , 2 , 3 , 3 , 3 , 4 , 4 , 5
// num                    // 0 , 1 , 2 , 0 , 1 , 0 , 0 , 1 , 2 , 0 , 1 , 0
// Sequence needed:       // 3 , 5 , 7 , 2 , 4 , 1 , 6 , 8 ,10 , 5 , 7 , 4
// Whats happening        /1x3 ,+2, +2 ,-5 ,+2 ,-3 ,2x3,+2 ,+2 ,-5 ,+2  -3
// If subtracting from 9  //-6 ,-4 ,-2 ,-7 ,-5 ,-8 ,-3 ,-1 ,+1, -4 ,-2 ,-5
// Equation: 9 - ((boardsize - (num + 1)) * (boardsize - num))
//           9 - (numInv * (boardSize - (num + 1)))

// Count 0, 1, 2, 3, 4, 5
// Num   3, 2, 1, 6, 5, 4

// Count 9, 8, 7, 6, 5, 4
// Num   3, 2, 1, 6, 5, 4

// Count+1   1, 2, 3, 4, 5, 6
// Num       3, 2, 1, 6, 5, 4

// C+1+3     4, 5, 6, 7, 8, 9
// Num       3, 2, 1, 6, 5, 4
// Diff     -1,-3,-5,-1,-3,-5
// Count + boardSize


// C+3       3, 4, 5, 6, 7, 8
// C+3%3     0, 1, 2, 0, 1, 2
// Num       3, 2, 1, 6, 5, 4
// Diff     -0,-2,-4,-0,-2,-4
// Count + boardSize


// C + boardSize - (((C + boardsize) % boardsize) * (boardSize - 1))




// ## Test cases for sub combos

// ## Input

// [['1', '6', '11', '16']] = [[1, 6, 11],[6, 11, 16]]

// ### Algo for get subCombos
// Gets all 'sub combos' of larger combos
// Eg on a 4x4 board the combo [1, 6, 11, 16], has 2 sub combos:
// [1, 6, 11] & [6, 11, 16]

// Start getSubCombos, given arr
// Set subCombos to empty array
// Iterate through each combo in arr
// If combo length is  greater than the minComboLength 
// Set startIndex to 0
// While startIndex + minComboLength exists on arr
// Set arrStrings to arr converted to an array of strings 
// If string version of arr does not exist within array of strings
// Send a copy of the subArray from startIndex to startINdex + 3 to combos
// Increment index






// Start 'combos'
// Set horizontals to empty array
// Set diagonals to array with two empty subArray
// Set verticals to an array empty array

// Iterate through rows board in combo
// Set 'num' to current index
// - Send row to allCombos
// - Send element at index of index row to diaginals first array
// - Do inverse diagonal, by subtracting index from boardSize
// - Send an array containing the vlaue of each 'num' index for each row to verticals
// concat horizontals diagonals and verticals and return

// Initial game object:

// let game = {
//   'moves': {
//     1: { boardLocation: [1, 1], status: ' '},
//     2: { boardLocation: [1, 5], status: ' '},
//     3: { boardLocation: [1, 9], status: ' '},
//     4: { boardLocation: [3, 1], status: ' '},
//     5: { boardLocation: [3, 5], status: ' '},
//     6: { boardLocation: [3, 9], status: ' '},
//     7: { boardLocation: [5, 1], status: ' '},
//     8: { boardLocation: [5, 5], status: ' '},
//     9: { boardLocation: [5, 9], status: ' '}
//   },
//   combos: [
//     [ '1', '2', '3' ],  [ '4', '5', '6' ],  [ '7', '8', '9' ],  [ '1', '4', '7' ],
//     [ '2', '5', '6' ],  [ '3', '6', '9' ],  [ '3', '5', '7' ],  [ '1', '5', '9' ]
//   ],
//   board: [
//     '','   |   |   ', '-----------', '   |   |   ', 
//     '-----------', '   |   |   ',''
//   ],
//   text: {
//     welcome: '\n### Welome to TicTacToe! ###\n',
//     thanks: 'Thanks for playing TicTacToe',
//     question: {
//       move: 'Choose an available square from ',
//       continue: 'Would you like to play best of 5 (Y/N)',
//       size: "Would you like to play normal mode (3x3) or mega mode (4x4)? \nEnter '3' or '4'"
//     },
//     invalid: "That's an invalid choice, please try again",
//     draw: 'This round is a draw',
//     winner: { 
//       X: "X's win this round",
//       O: "O's win this round",
//     }
//   },
//   score: {
//     X: 0,
//     O: 0,
//     draws: 0,
//     rounds: 0
//   }
// };





// ### Get help algo
  // Ask player question
  // Get player answer
  // If answer 'help', show game board with help
  // Else if answer valid move, update game & return
  // Else ask for input
  // If valid input 





//  1 | 2 | 3 
// -----------
//  4 | 5 | 6 
// -----------
//  7 | 8 | 9

//  1 | 2 | 3 | 4
// ---------------
//  5 | 6 | 7 | 8
// ---------------
//  9 | 10| 11| 12
// ---------------
//  13| 14| 15| 16


//  1 | 2 | 3 | 4 | 5
// -------------------
//  6 | 7 | 8 | 9 | 10
// -------------------
//  11| 12| 13| 14| 15
// -------------------
//  16| 17| 18| 19| 20
// -------------------
//  21| 22| 23| 24| 25

//  1 | 2 | 3 | 4 | 5 | 6 
// -----------------------
//  7 | 8 | 9 | 10| 11| 12
// -----------------------
//  13| 14| 15| 16| 17| 18
// -----------------------
//  19| 20| 21| 22| 23| 24
// -----------------------
//  25| 26| 27| 28| 29| 30
// -----------------------
//  31| 32| 33| 34| 35| 36


// Board size of 7:
// Supermove: 25

// Board size of 8:
// Supermoves: 28, 29, 36, 37

// Board size of 9:
// Supermove: 41

Examples: 

// Board size   Middle squares
// 1            1
// 2            1, 2, 3, 4
// 3            5
// 4            6, 7, 10, 11
// 5            13   
// 6            15, 16, 21, 22      



// Start getSuperMove
// Function returns at inside square (odd sized boards), 
// or random square from inside 4 squares (even sized board)
// Set centerNum to moveCount / 2, rounded up

// If moveCount odd
// return centerNum

// If moveCount even
// Set halfRowSize to boardsize / 2 
// num1Row1 = centerNum - halfBoardSize
// num1Row1 = centerNUm + halfbaordsize
// Add nums to array, adding one to each for additional 2 numbers
// return random number from 4 x numbers in array


// GetSmartMove PEDAC
// Start getSmartMoves, set 'ID'
// Set 'smartMoves' to an empty array
// Iterate through the game combos
// If combo includes an existing move, iterate through the moves within
// - If move is not an existing move
// - If move is an open move
// - Push move to smartMoves
// - Return moves
// 






// PEDAC for game switching

// ask if player who should go first them or computer
// set reponse to 'currentPlayer' in game object to respective ID


// Start chooseSquare
// if currentPlayer equals player
// run update game with getPlayerMove, currentPlayer
// else run update game with getComputerMove, currentPlayer


// Start alternatePlayer
// set tempVar to currentPlayer
// set currentPlayer to nextPlayer
// set nextPlayer to currentPlayer



// 3x3 debugging ####

// Imminent draw
// game.moves = {
//   '1': 'O',
//   '2': 'X',
//   '3': 'X',
//   '4': ' ',
//   '5': 'O',
//   '6': 'X',
//   '7': 'X',
//   '8': 'O',
//   '9': 'X'
// }


// Near draw
// game.moves = {
//   '1': 'O',
//   '2': 'X',
//   '3': 'X',
//   '4': ' ',
//   '5': 'O',
//   '6': ' ',
//   '7': ' ',
//   '8': 'O',
//   '9': 'X'
// }

// Near win
// game.moves = {
//   '1': 'O',
//   '2': 'X',
//   '3': 'X',
//   '4': ' ',
//   '5': 'X',
//   '6': ' ',
//   '7': ' ',
//   '8': 'O',
//   '9': 'O'
// }