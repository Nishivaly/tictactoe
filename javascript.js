const gameBoard = (() => {
    const board = [
        [, , ,],
        [, , ,],
        [, , ,]
    ];

    const addMark = (mark, row, column) => {
        if (!board[row][column]) {
            board[row][column] = mark;
        }
    };

    const resetBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = undefined;
            }
        }
    };

    const showBoard = () => console.log(board);

    return { addMark, resetBoard, showBoard };
})();

function createPlayer(playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;
    return { name, mark };
}

function createNewGame() {
    const playerOne = createPlayer('Jimmy', 'O');
    const playerTwo = createPlayer('Tommy', 'X');

    let playerOneScore = 0;
    let playerTwoScore = 0;

    const getScores = () => [playerOneScore, playerTwoScore];
    const givePointOne = () => playerOneScore++
    const givePointTwo = () => playerTwoScore++

    return { playerOne, playerTwo, givePointOne, givePointTwo, getScores };
}