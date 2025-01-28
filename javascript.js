const gameBoard = (() => {
    const board = [
        [null, null, null,],
        [null, null, null,],
        [null, null, null,]
    ];

    const addMark = (mark, row, column) => {
        if (board[row][column] === null) {
            board[row][column] = mark;
        } else {
            console.log('Space already taken!');
        }
        console.log(board);
    };

    const checkWin = (mark) => {
        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) || // Row
                (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark)    // Column
            ) {
                console.log(`${mark} wins!`)
                return true;
            }
        }
        if (
            (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) || // Diagonal 1
            (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark)    // Diagonal 2
        ) {
            console.log(`${mark} wins!`)
            return true;
        }
        return false;
    };

    // Should only be called after checking for a win
    const checkDraw = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    const reset = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = null;
            }
        }
    };

    const getBoardArray = () => board;

    return { addMark, reset, checkDraw, checkWin, getBoardArray };
})();

const displayController = (() => {

    const board = document.querySelector('#board');
    const squares = document.querySelectorAll('.square');
    const playerOneDisplay = document.querySelector('#player1-score');
    const playerTwoDisplay = document.querySelector('#player2-score');
    const restartButton = document.querySelector('#restart-game');

    const updateBoard = () => {
        const flatBoardArray = gameBoard.getBoardArray().flat();
        squares.forEach((square, i) => {
            square.textContent = flatBoardArray[i] ===
                null ? '' : flatBoardArray[i];
        });
    }

    board.addEventListener('click', event => {
        if (event.target.classList.contains('square')) {

            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);

            const player = game.setCurrentPlayer();

            gameBoard.addMark(player.mark, row, col);
            if (gameBoard.checkWin(player.mark)) {
                player.addScore();
                if (player === game.playerOne) {
                    playerOneDisplay.textContent =
                        `Player one score: ${[player.getScore()]}`
                } else {
                    playerTwoDisplay.textContent =
                        `Player two score: ${[player.getScore()]}`
                }
            } else if (gameBoard.checkDraw()) {
                alert('nmo one wins lmao');
            }

            displayController.updateBoard();
        }
    });

    restartButton.addEventListener('click', () => {
        gameBoard.reset();
        displayController.updateBoard();
    })

    return { updateBoard };

})();

const game = createGame();

function createPlayer(playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++

    return { name, mark, getScore, addScore };
}

function createGame() {
    const playerOne = createPlayer('Jimmy', 'O');
    const playerTwo = createPlayer('Tommy', 'X');

    let currentPlayer = playerTwo;
    const setCurrentPlayer = () => {
        return currentPlayer = currentPlayer ===
            playerOne ? playerTwo : playerOne;
    }

    return { playerOne, playerTwo, setCurrentPlayer };
}