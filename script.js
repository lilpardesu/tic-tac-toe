const gameStatus = document.getElementsByClassName("game--status");
const xTurn = "It's X's turn!"
const oTurn = "It's O's turn!"
const xWin = "Player X has won"
const oWin = "Player O has won"
gameStatus[0].innerHTML = xTurn;

const gameContainer = document.getElementsByClassName("game--container");
const restartButton = document.getElementsByClassName("game--restart");
let gameRecord = [];
let counter = 0;

gameContainer[0].onclick  = function(event) {


    counter++;
    let cell = event.target.closest('div')
    let cellIndex = cell.getAttribute('data-cell-index');


    if (cell.innerHTML == "") {
        if (gameStatus[0].innerHTML == xTurn) {
            cell.innerHTML = "X"
            gameStatus[0].innerHTML = oTurn
        } else if (gameStatus[0].innerHTML == oTurn) {
            cell.innerHTML = "O"
            gameStatus[0].innerHTML = xTurn
        } else {
            return;
        }
    }

    gameRecord[cellIndex] = cell.innerHTML; 

    function checkWin(index) {
        gameContainer.onclick = null;
        if (gameRecord[index] == "X") {
            gameStatus[0].innerHTML = xWin;
        } else if (gameRecord[index] == "O") {
            gameStatus[0].innerHTML = oWin;
        }
    }

    if (counter >= 5) {
        if (gameRecord[0] != undefined && gameRecord[0] == gameRecord[1] && gameRecord[1] == gameRecord[2]) {
            checkWin(0);

        } else if (gameRecord[0] != undefined && gameRecord[0] == gameRecord[3] && gameRecord[3] == gameRecord[6]) {
            checkWin(0);

        } else if (gameRecord[0] != undefined && gameRecord[0] == gameRecord[4] && gameRecord[4] == gameRecord[8]) {
            checkWin(0);

        } else if (gameRecord[1] != undefined && gameRecord[1] == gameRecord[4] && gameRecord[4] == gameRecord[7]) {
            checkWin(1);

        } else if (gameRecord[2] != undefined && gameRecord[2] == gameRecord[5] && gameRecord[5] == gameRecord[8]) {
            checkWin(2);

        } else if (gameRecord[2] != undefined && gameRecord[2] == gameRecord[4] && gameRecord[4] == gameRecord[6]) {
            checkWin(2);

        } else if (gameRecord[3] != undefined && gameRecord[3] == gameRecord[4] && gameRecord[4] == gameRecord[5]) {
            checkWin(3);

        } else if (gameRecord[6] != undefined && gameRecord[6] == gameRecord[7] && gameRecord[7] == gameRecord[8]) {
            checkWin(6);

        } else if (counter == 9) {
            gameStatus[0].innerHTML = "Game ended in a draw"

        }
 
    }
   
}


restartButton[0].onclick = function() {
    for (const child of gameContainer[0].children) {
        child.innerHTML = "";
    }
    gameStatus[0].innerHTML = xTurn;
    gameRecord = [];
    counter = 0;
}