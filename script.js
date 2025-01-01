// DOM Elements
const gameStatus = document.querySelector(".game--status");
const gameContainer = document.querySelector(".game--container");
const restartButton = document.querySelector(".game--restart");

// Game Messages
const messages = {
    xTurn: "It's X's turn!",
    oTurn: "It's O's turn!",
    xWin: "Player X has won!",
    oWin: "Player O has won!",
    draw: "Game ended in a draw!"
};

gameStatus.innerHTML = messages.xTurn;

// Game State
let gameRecord = Array(9).fill(null);
let counter = 0;

// Click handler for the game container
gameContainer.addEventListener("click", (event) => {
    const cell = event.target.closest("div");
    if (!cell || cell.innerHTML || gameStatus.innerHTML.includes("won") || gameStatus.innerHTML === messages.draw) {
        return;
    }

    const cellIndex = cell.getAttribute("data-cell-index");

    // Update cell and toggle turns
    const isXTurn = gameStatus.innerHTML === messages.xTurn;
    cell.innerHTML = isXTurn ? "X" : "O";
    gameStatus.innerHTML = isXTurn ? messages.oTurn : messages.xTurn;
    gameRecord[cellIndex] = cell.innerHTML;
    counter++;

    // Check for a winner or a draw
    if (counter >= 5) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const [a, b, c] of winningCombinations) {
            if (
                gameRecord[a] &&
                gameRecord[a] === gameRecord[b] &&
                gameRecord[a] === gameRecord[c]
            ) {
                gameStatus.innerHTML = gameRecord[a] === "X" ? messages.xWin : messages.oWin;
                gameContainer.style.pointerEvents = "none"; // Disable further clicks
                return;
            }
        }

        if (counter === 9) {
            gameStatus.innerHTML = messages.draw;
        }
    }
});

// Restart button handler
restartButton.addEventListener("click", () => {
    Array.from(gameContainer.children).forEach((child) => {
        child.innerHTML = "";
    });
    gameStatus.innerHTML = messages.xTurn;
    gameRecord.fill(null);
    counter = 0;
    gameContainer.style.pointerEvents = "auto"; // Re-enable clicks
});
