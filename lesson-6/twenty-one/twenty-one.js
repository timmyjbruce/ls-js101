const rlSync = require('readline-sync');
const colors = require('colors');
const TEXT = require('./twenty-one-text.json');

// ## Deck config  
const SUITS = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
const CARD_TYPES = [
  'Ace', '2', '3', '4', '5', '6', '7', 
  '8', '9', 'Jack', 'Queen', 'King'];
const FACE_CARDS = CARD_TYPES.slice(-3);
const WILD_CARD = CARD_TYPES.slice(0,1);

// ## Score config  
const TARGET_TOTAL = 21;
const DEALER_MIN_TOTAL = 17;
const FACE_CARD_VALUE = 10;
const WILD_CARD_VALUES = [1, 11];
const ROUND_COUNT = 5;

// ## Text colour config: shorturl.at/bfghz 
colors.setTheme({
  hearts: ['red'],
  diamonds: ['red'],
  spades: ['blue'],
  clubs: ['blue'],
  party: ['rainbow', 'bold'],
  emphasis: 'bold'
});

// ## Game variables  
let deck = [];  // Holds generated deck array
let dealerHand = [];
let playerHand = [];
let playerRounds = 0;
let dealerRounds = 0;
let rounds = 0;


// # Game process
// -----------------------------------------------------------------------------

message(TEXT.welcome.emphasis, getRuleList(), TEXT.start);
getValidInput(['d']);

// Main game loop  ----------

do {
  if (rounds) showScore();
  
  buildDeck();
  dealCards(2, playerHand, dealerHand);

  let playerTotal = totalHand(playerHand);
  let dealerTotal = totalHand(dealerHand);

  while (playerTotal <= TARGET_TOTAL) {
    showHands();
    if (askStay()) break;
    else dealCards(1, playerHand);
    playerTotal = totalHand(playerHand)
  }

  while (playerTotal <= TARGET_TOTAL && dealerTotal <= DEALER_MIN_TOTAL) {
    message(TEXT.dealersTurn)
    dealCards(1, dealerHand);
    dealerTotal = totalHand(dealerHand);    
  }

  announceWinner(playerTotal, dealerTotal);
  if (!rounds) askContinueGame();

  console.log('rounds')
  console.log(rounds)

} while ((rounds -= 1) > 1)

message(TEXT.thanks.emphasis)



// # Functions
// -----------------------------------------------------------------------------

// ## Core functions ----------

function getRuleList() {
  let ruleList = TEXT.rulesHeading;
  for (let rule in TEXT.rules) {
    ruleList += `\n • ${TEXT.rules[rule]}`;
  }  
  return ruleList;
}

function askStay() {
  message(TEXT.askHitOrStay)
  return getValidInput(['s', 'h']) === 's'
}

function askContinueGame() {
  message(TEXT.playAgain)
  if (getValidInput(['y', 'n']) === 'y') {
    console.log('rounds config val')
    console.log(ROUND_COUNT)

    console.log('rounds before')
    console.log(rounds)
    rounds === ROUND_COUNT
    console.log('rounds after')
    console.log(rounds)
  };
}

function showScore() {
  message(`Player score: ${playerRounds} | Dealer score: ${dealerRounds}`)
}

function showHands(dealerShowAll) {
  if (!rounds) message(TEXT.initialDeal)
  
  message(TEXT.playerHand + formatHand(playerHand));
  
  if (dealerShowAll) message(TEXT.dealerReveal + formatHand(dealerHand));
  else message(TEXT.dealerHandA + formatCard(dealerHand[0]) + TEXT.dealerHandB);
}

function getValidInput(arrayValidItems) {  
  let input = rlSync.prompt().toLowerCase();

  while (!arrayValidItems.includes(input)) {
    message(TEXT.invalid);
    input = rlSync.prompt().toLowerCase();
  }
  return input;
}

function dealCards(numCards, ...hands) {
  hands.forEach(hand => {
    for (let num = numCards; num > 0; num -= 1) {
      let randomCard = deck.splice(randomIndex(deck), 1)[0];
      hand.push(randomCard);
    }
  })
}

function totalHand(hand) {
  let isWild = hand.find(card => card[0] === WILD_CARD);
  let total = hand.reduce((acc, ele) => acc + ele[2], 0);
  
  if (isWild && total <= TARGET_TOTAL - WILD_CARD_VALUES[1]) {
    total += WILD_CARD_VALUES;
  }
  return total;
}


/// What if mutliple wild cards

function announceWinner(playerTotal, dealerTotal) {
  let minWinRounds = Math.ceil(ROUND_COUNT / 2)

  showHands(true);

  if (dealerRounds >= minWinRounds) message(TEXT.dealerWinsGame);
  if (playerRounds >= minWinRounds) message(TEXT.playerWinsGame)

  if (dealerTotal > TARGET_TOTAL) {
    message(TEXT.dealerBust.party)
    playerRounds += 1;
  }
  else if (playerTotal > TARGET_TOTAL) {
    message(TEXT.playerBust)
    dealerRounds += 1;
  }
  else if (dealerTotal >= playerTotal) {
    message(TEXT.dealerWins)
    dealerRounds += 1;
  }
  else {
    message(TEXT.playerWins.party)
    playerRounds += 1;
  }
}

// ## Helper functions  ----------

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function joinAnd(arr) {
  if (arr.length <= 1) return arr.join();
  let arrEndEle = arr.splice(arr.length - 1)[0];
  return arr.join(', ') + ' & the ' + arrEndEle;
}

function formatCard(card) {
  let formattedText = card[0] + ' of ' + card[1];
  let colorCode = card[1].toLowerCase();
  return formattedText[colorCode]
}

function formatHand(cardArr) {
  let formatted = cardArr.slice().map(card => formatCard(card));
  return joinAnd(formatted);
}

function message(...text) {
  text.forEach(string => console.log(string));
}


// ## Deck generation functions  ----------

function buildDeck() {
  CARD_TYPES.forEach(cardType => {
    SUITS.forEach(suit => {
      deck.push([cardType, suit, getCardValue(cardType)])
    })
  })
}
function getCardValue(card) {
  if (Number(card)) return Number(card);
  else if (FACE_CARDS.includes(card)) return FACE_CARD_VALUE;
  else return WILD_CARD_VALUES[0]
}