//Create module for the game board
const gameBoardModule = (() => {
    //Private variable to store the board state
    let board = [[null, null, null],[null, null, null],[null, null, null]];

    //Private function to check if a cell is empty
    const isEmpty = (row, col) => board[row][col] === null;
})
