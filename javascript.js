function createGameBoard() {
    const gameBoard = [
        [, , ,],
        [, , ,],
        [, , ,]
    ];
    const addMark = (playerMark, row, column) => {
        gameBoard[row][column] = playerMark;
    }
    const showGameBoard = () => console.log(gameBoard);

    return { addMark, showGameBoard };
}

function createPlayer(mark, playerName) {
    const player = playerName;
    const playerMark = mark;
    return { player, playerMark };
}

function createNewGame() {
    const gameBoard = createGameBoard();
    const playerOne = createPlayer('O', 'Jimmy');
    const playerTwo = createPlayer('X', 'Tommy');

    return { gameBoard, playerOne, playerTwo, };
}