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
                    return false; // At least one cell is empty
                }
            }
        }
        return true; // All cells are filled
    }

    const reset = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = null;
            }
        }
    };

    const getBoardArray = () => board;

    const show = () => console.log(board);

    return { addMark, reset, show, checkDraw, checkWin, getBoardArray };
})();

const boarDisplay = (() => {

    // const board = document.querySelector('#board');
    const squares = document.querySelectorAll('#board .square');

    const updateBoard = (boardArray) => {
        const flatBoardArray = boardArray.flat();
        squares.forEach((square, i) => {
            square.textContent = flatBoardArray[i] ===
                null ? 'EMPTY' : flatBoardArray[i];
        });
    }

    return { updateBoard };

})();

function createPlayer(playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++

    return { name, mark, getScore, addScore };
}

function createNewGame() {
    gameBoard.reset();

    const playerOne = createPlayer('Jimmy', 'O');
    const playerTwo = createPlayer('Tommy', 'X');

    return { playerOne, playerTwo };
}