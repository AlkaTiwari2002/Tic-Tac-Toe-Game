document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.getAttribute("data-index");

      if (board[index] !== "" || !gameActive) {
        return;
      }

      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkResult();
    }

    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (!board.includes("")) {
        status.textContent = "Game is a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function restartGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach((cell) => (cell.textContent = ""));
    }

    cells.forEach((cell) =>
      cell.addEventListener("click", handleCellClick)
    );
    restartButton.addEventListener("click", restartGame);

    status.textContent = `Player ${currentPlayer}'s turn`;
  });