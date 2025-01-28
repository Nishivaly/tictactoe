const gameBoard = (() => {
    const board = [
        [null, null, null,],
        [null, null, null,],
        [null, null, null,]
    ];

    const addMark = (mark, row, column) => {
        if (board[row][column] === null) {
            board[row][column] = mark;
        }
    };

    const checkWin = (mark) => {
        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) || // Row
                (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark)    // Column
            ) {
                return true;
            }
        }
        if (
            (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) || // Diagonal 1
            (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark)    // Diagonal 2
        ) {
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

    return {
        addMark, reset, checkDraw,
        checkWin, getBoardArray
    };
})();

const displayController = (() => {

    const board = document.querySelector('#board');
    const squares = document.querySelectorAll('.square');
    const playerOneDisplay = document.querySelector('#player1-score');
    const playerTwoDisplay = document.querySelector('#player2-score');
    const restartGameButton = document.querySelector('#restart-game');
    const resetScoresButton = document.querySelector('#reset-scores');
    const scoreDisplay = document.querySelector("#scores")

    const updateBoardDisplay = () => {
        const flatBoardArray = gameBoard.getBoardArray().flat();
        squares.forEach((square, i) => {
            square.textContent = flatBoardArray[i] ===
                null ? '' : flatBoardArray[i];
        });
    }

    const updateScoreDisplay = () => {
        playerOneDisplay.textContent =
            `${game.getPlayerOne().getName()}'s
            score: ${game.getPlayerOne().getScore()}`;

        playerTwoDisplay.textContent =
            `${game.getPlayerTwo().getName()}'s
            score: ${game.getPlayerTwo().getScore()}`;
    }

    board.addEventListener('click', event => {
        if (event.target.classList.contains('square')) {

            if (game.getGameStatus()) {

                const row = parseInt(event.target.dataset.row);
                const col = parseInt(event.target.dataset.col);

                const player = game.setCurrentPlayer(); // Switches player
                const playerMark = player.getMark();

                gameBoard.addMark(playerMark, row, col);
                if (gameBoard.checkWin(playerMark)) {
                    player.addScore();
                    updateScoreDisplay();
                    game.finishGame();
                } else if (gameBoard.checkDraw()) {
                    game.finishGame();
                }
                updateBoardDisplay();
            }
        }
    });

    restartGameButton.addEventListener('click', () => {
        gameBoard.reset();
        updateBoardDisplay();
        game.startGame();
        game.setCurrentPlayer(game.getPlayerTwo()); // Makes p1 start 
    });

    resetScoresButton.addEventListener('click', () => {
        game.getPlayerOne().restartScore();
        game.getPlayerTwo().restartScore();
        updateScoreDisplay();
    });

    scoreDisplay.addEventListener('click', event => {
        if (event.target.classList.contains("change-name")) {
            const newName = prompt("Enter new player name");
            if (event.target.parentElement.id === 'player-one') {
                game.getPlayerOne()
                    .changeName(newName);
            } else {
                game.getPlayerTwo()
                    .changeName(newName);
            }
            updateScoreDisplay();
        }
    });

    return { updateBoardDisplay, updateScoreDisplay };

})();

const game = createGame();

function createPlayer(playerName, playerMark) {
    let name = playerName;
    const mark = playerMark;

    const changeName = newName => name = newName;
    const getName = () => name;
    const getMark = () => mark;

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++
    const restartScore = () => score = 0;

    return {
        getMark, getName, getScore,
        addScore, restartScore,
        changeName,
    };
}

function createGame() {
    const playerOne = createPlayer('Jimmy', 'O');
    const playerTwo = createPlayer('Tommy', 'X');

    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;

    let currentPlayer = playerTwo; // Hack to make p1 go first
    const setCurrentPlayer = (player) => {
        if (player) {
            return currentPlayer = player;
        } else {
            return currentPlayer = currentPlayer ===
                playerOne ? playerTwo : playerOne;
        }
    }

    let gameActive = true;
    const startGame = () => gameActive = true;
    const finishGame = () => gameActive = false;
    const getGameStatus = () => gameActive;

    return {
        setCurrentPlayer, startGame,
        finishGame, getGameStatus,
        getPlayerOne, getPlayerTwo,
    };
}