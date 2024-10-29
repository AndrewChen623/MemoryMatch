/* 
    Students! You will all be completing this matching card game.
    Follow the directions throughout this file to slowly build out 
    the game's features.
*/


// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// You're going to need this to display the cards on the screen (remember there should be two of each card)
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false;

/* 
    You must initialize the game board. You have been given a shuffleArray() function.
    This function should also reset the entire game board by making sure there's no HTML inside of the game-board div.
    Use the createCard() function to initialize each cardElement and add it to the gameBoard.

*/
function initGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the game board
    cards = []; // Reset cards array

    // Duplicate and shuffle symbols
    const doubleSymbols = [...symbols, ...symbols];
    shuffleArray(doubleSymbols);

    // Create and append each card element to the game board
    doubleSymbols.forEach(symbol => {
        const cardElement = createCard(symbol); // Use createCard to create each card
        cards.push(cardElement);
        gameBoard.appendChild(cardElement); // Append each card to the game board
    });

    resetBoard(); // Reset the game state
}


/// Creates each card element, sets the symbol, and attaches an event listener for flipping
function createCard(symbol) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.symbol = symbol; // Store the symbol within a data attribute
    cardElement.addEventListener('click', () => flipCard(cardElement)); // Attach flip event
    return cardElement;
}

// Handles card flipping logic and sets firstCard and secondCard for matching
function flipCard(card) {
    // Prevent further actions if board is locked or same card is clicked
    if (lockBoard || card === firstCard) return;

    card.classList.add('flipped'); // Visually flip the card
    card.textContent = card.dataset.symbol; // Display the symbol on the card

    // Set firstCard if not already chosen, otherwise set secondCard and check for match
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch(); // Check for a match with the second card flipped
    }
}


/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
// Checks if the two flipped cards match; if they do, disable them, otherwise unflip them
function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards(); // Cards match, disable them
    } else {
        unflipCards(); // No match, unflip the cards
    }
}

// Adds the "matched" class to both cards to disable them, then resets the board state
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard(); // Reset firstCard, secondCard, and lockBoard
}
 
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();