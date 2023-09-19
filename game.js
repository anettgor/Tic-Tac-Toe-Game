"use strict";
const tiles = document.querySelectorAll(".game-tile");
const reset = document.querySelector(".reset-button");
const currentPlayerIndicator = document.querySelector(".current-player");
const playerContainer = document.querySelector(".current-player-container");
const gameTileContainer = document.querySelector(".game-tile-container");
const winnerPlayer = document.querySelector(".winner");
const winnerContainer = document.querySelector(".winner-container");
const WIN_SEQUENCES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let playerX = [];
let playerO = [];
let gameOver = false;
let turn = playerO;
const changeTurn = () => (turn = turn === playerO ? playerX : playerO);
const isWinner = (player) => WIN_SEQUENCES.some((sequence) => {
    return sequence.every((position) => player.includes(position));
});
const setBoardToGameOver = () => {
    gameOver = true;
    gameTileContainer === null || gameTileContainer === void 0 ? void 0 : gameTileContainer.classList.add("disable");
    playerContainer === null || playerContainer === void 0 ? void 0 : playerContainer.classList.add("hide");
    winnerContainer === null || winnerContainer === void 0 ? void 0 : winnerContainer.classList.remove("hide");
    tiles.forEach((tile) => tile.setAttribute("disabled", "true"));
};
const showWinner = () => {
    if (isWinner(turn)) {
        setBoardToGameOver();
        if (winnerPlayer) {
            winnerPlayer.textContent =
                turn === playerO ? "Player O Congrats!" : "Player X Congrats!";
            winnerPlayer.classList.add(turn === playerO ? "color-playerO" : "color-playerX");
        }
    }
    else if (playerO.length + playerX.length === 9) {
        setBoardToGameOver();
        if (winnerPlayer) {
            winnerPlayer.textContent = "TIE";
        }
    }
};
const move = () => {
    if (tiles) {
        tiles.forEach((tile) => tile.addEventListener("click", () => {
            if (!playerX.includes(+tile.id) &&
                !playerO.includes(+tile.id) &&
                !gameOver) {
                if (currentPlayerIndicator) {
                    currentPlayerIndicator.innerHTML =
                        turn === playerX ? "PLAYER O" : "PLAYER X";
                    turn.push(+tile.id);
                    tile.setAttribute("disabled", "true");
                    tile.textContent = turn === playerO ? "O" : "X";
                    tile.classList.add(turn === playerO ? "color-playerO" : "color-playerX");
                    showWinner();
                    changeTurn();
                }
            }
        }));
    }
};
move();
const resetGame = () => {
    tiles.forEach((tile) => {
        gameOver = false;
        tile.textContent = "";
        tile.removeAttribute("disabled");
        tile.classList.remove("color-playerO", "color-playerX");
    });
    playerX = [];
    playerO = [];
    turn = playerO;
    gameTileContainer === null || gameTileContainer === void 0 ? void 0 : gameTileContainer.classList.remove("disable");
    playerContainer === null || playerContainer === void 0 ? void 0 : playerContainer.classList.remove("hide");
    winnerContainer === null || winnerContainer === void 0 ? void 0 : winnerContainer.classList.add("hide");
    winnerPlayer === null || winnerPlayer === void 0 ? void 0 : winnerPlayer.classList.remove("color-playerO", "color-playerX");
    if (currentPlayerIndicator !== null) {
        currentPlayerIndicator.textContent = "PLAYER O";
    }
};
reset === null || reset === void 0 ? void 0 : reset.addEventListener("click", () => resetGame());
