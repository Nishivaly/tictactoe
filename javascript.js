const gameBoard = (() => {
    const board = [
        [, , ,],
        [, , ,],
        [, , ,]
    ];

    const addMark = (mark, row, column) => {
        if (!board[row][column]) {
            board[row][column] = mark;
        } else {
            console.log('Space already taken!');
        }
        console.log(board);
    };

    const resetBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = null;
            }
        }
    };

    const showBoard = () => console.log(board);

    return { addMark, resetBoard, showBoard };
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
    gameBoard.resetBoard();

    const playerOne = createPlayer('Jimmy', 'O');
    const playerTwo = createPlayer('Tommy', 'X');

    return { playerOne, playerTwo };
}