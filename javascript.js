function createGameBoard(){
    const gameBoard = [
        [ , , ,],
        [ , , ,],
        [ , , ,]
      ];
    const addO = (row, column) => gameBoard[row][column] = 'O';
    const addX = (row, column) => gameBoard[row][column] = 'X';
    const showGameBoard = () => console.log(gameBoard);

    return {addO, addX, showGameBoard};
}