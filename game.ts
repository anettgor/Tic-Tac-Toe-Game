const tiles = document.querySelectorAll(".game-tile");
const reset = document.querySelector(".reset-button");
const currentPlayerIndicator = document.querySelector(".current-player");
const playerContainer = document.querySelector(".current-player-container");
const winnerPlayer = document.querySelector(".winner");
const winnerContainer = document.querySelector(".winner-container");

type Tiles = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const WIN_SEQUENCES: Array<[Tiles, Tiles, Tiles]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Player = Array<number>;

let playerX: Player = [];
let playerO: Player = [];
let gameOver: boolean = false;
let turn = playerO;

const changeTurn = () => (turn = turn === playerO ? playerX : playerO);

const isWinner = (player: any): boolean =>
  WIN_SEQUENCES.some((sequence) => {
    return sequence.every((position) => player.includes(position));
  });

const showWinner = () => {
  if (isWinner(turn)) {
    gameOver = true;
    if (winnerPlayer) {
      winnerPlayer.textContent =
        turn === playerO ? "Player O Congrats!" : "Player X Congrats!";
      winnerPlayer.classList.add(
        turn === playerO ? "color-playerO" : "color-playerX"
      );
    }
    playerContainer?.classList.add("hide");
    winnerContainer?.classList.remove("hide");
  } else if (playerO.length + playerX.length === 9) {
    gameOver = true;
    if (winnerPlayer) {
      winnerPlayer.textContent = "TIE";
    }
    playerContainer?.classList.add("hide");
    winnerContainer?.classList.remove("hide");
  }
};

const move = () => {
  if (tiles) {
    tiles.forEach((tile) =>
      tile.addEventListener("click", () => {
        if (
          !playerX.includes(+tile.id) &&
          !playerO.includes(+tile.id) &&
          !gameOver
        ) {
          if (currentPlayerIndicator) {
            currentPlayerIndicator.innerHTML =
              turn === playerX ? "PLAYER O" : "PLAYER X";
            turn.push(+tile.id);
            tile.setAttribute("disabled", "true");
            tile.innerHTML = turn === playerO ? "O" : "X";
            tile.textContent = turn === playerO ? "O" : "X";
            tile.classList.add(
              turn === playerO ? "color-playerO" : "color-playerX"
            );
            showWinner();
            changeTurn();
          }
        }
      })
    );
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
  playerContainer?.classList.remove("hide");
  winnerContainer?.classList.add("hide");

  winnerPlayer?.classList.remove("color-playerO", "color-playerX");

  if (currentPlayerIndicator !== null) {
    currentPlayerIndicator.textContent = "PLAYER O";
  }
};

reset?.addEventListener("click", () => resetGame());
