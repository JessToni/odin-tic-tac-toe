//Create module for the game board
const gameBoardModule = (() => {
    //Private variable to store the board state
    let board = [[null, null, null],[null, null, null],[null, null, null]];

    //Private function to check if a cell is empty
    const isEmpty = (row, col) => board[row][col] === null;

    return {
        //Method for making a move on the board
        makeMove(row, col, player) {
            if (isEmpty(row, col)) {
                board[row][col] = player;
                return true; //Move was successful
            }
            return false; //Move was invalid
        },

        isFull() {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; row++) {
                    if (isEmpty(row, col)) {
                        return false; //There's an empty cell, the board is not full
                    }
                }
            }
            return true;
        },

        checkWinner() {
            //Implement a logic for finding the winner
        },

        reset() {
            board = [[null, null, null],[null, null, null],[null, null, null]];
        },
    };
})();
