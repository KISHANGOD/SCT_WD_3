const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, i) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) cellElement.classList.add('taken');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] || gameOver) return;
    board[index] = currentPlayer;
    checkWinner();
    if (!gameOver) currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGame();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusDisplay.textContent = `Player ${board[a]} wins!`;
            gameOver = true;
            highlightWinner(combo);
            return;
        }
    }
    if (!board.includes(null)) {
        statusDisplay.textContent = 'It\'s a tie!';
        gameOver = true;
    }
}

function highlightWinner(combo) {
    combo.forEach((index) => {
        const cells = gameBoard.children;
        cells[index].classList.add('win');
    });
}

function updateGame() {
    board.forEach((cell, i) => {
        const cellElement = gameBoard.children[i];
        cellElement.textContent = cell;
        if (cell) cellElement.classList.add('taken');
    });
    if (!gameOver) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameOver = false;
    statusDisplay.textContent = "Player X's turn";
    createBoard();
}

createBoard();