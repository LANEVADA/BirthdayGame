// Variables for game state
const icons = ['💖', '🌸', '📚', '😄', '🍎', '🍀', '👗', '🌟'];
const meanings = {
    '💖': 'Kindness',
    '🌸': 'Grace',
    '📚': 'Wisdom',
    '😄': 'Happiness',
    '🍎': 'Health',
    '🍀': 'Luck',
    '👗': 'Elegance',
    '🌟': 'Hope'
};
let flippedCards = [];
let matchedPairs = 0;

// The message to reveal after all cards are matched
const letterMessage = "To：人美心善的王可儿,\n   生日快乐呀!🎉虽然现在美国时间可能还没到点，"+
"但是为了防止我忘了，我决定按照中国时间祝你生日快乐，算是一点心意吧！祝你在新的一岁里能够心想事成，万事如意，天天开心！还记得刚刚的游戏里的8个图案吗？" + 
"💖代表善良,"+
"🌸代表优雅,"+
"📚代表智慧,"+
"😄代表快乐,"+
"🍎代表健康,"+
"🍀代表幸运,"+
"👗代表端庄,"+
"🌟代表希望,"+
"这也是我希望给你送上的最真挚的祝福呀！水平比较有限游戏比较简单，希望你能喜欢，也希望你能度过属于自己的完美的23岁呀！\n"+
"                       2025.01.05 杨澍"

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
    createGameBoard();
});

// Create Game Board
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    const cardIcons = [...icons, ...icons]; // Duplicate icons for pairs
    cardIcons.sort(() => 0.5 - Math.random()); // Shuffle cards

    // Clear any existing cards (if reinitializing)
    gameBoard.innerHTML = '';

    // Create and append cards to the board
    cardIcons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.innerHTML = `
            <span class="card-front">${icon}</span>
            <span class="card-back"></span>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Flip Card
function flipCard(card) {
    // Ignore already flipped or matched cards
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) return;

    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check for a match when two cards are flipped
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Check for Match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        // Cards match - mark as matched
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        // Add a present to the present area
        addPresent(firstCard.dataset.icon);

        // Check if all pairs are matched
        if (matchedPairs === icons.length) {
            setTimeout(() => {
                revealLetter();
                alert('Surprise! Happy Birthday! Please go on and read the letter 🎉');
            }, 500);
        }
    } else {
        // Cards do not match - flip them back
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    // Reset flipped cards array
    flippedCards = [];
}

// Add Present to Present Area
function addPresent(icon) {
    const presentArea = document.getElementById('present-area');
    const present = document.createElement('div');
    present.className = 'present';
    present.textContent = icon; // Use the matched icon as the present
    presentArea.appendChild(present);
}

// Reveal the Letter
function revealLetter() {
    const gameBoard = document.getElementById('game-board');
    const letterArea = document.getElementById('letter-area');

    // Hide the game board
    gameBoard.style.display = 'none';

    // Show the letter in place of the game board
    letterArea.textContent = letterMessage;
    letterArea.innerHTML = letterMessage.replace(/\n/g, '<br>');
    letterArea.style.display = 'block';
}
