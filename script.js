//Create module for the game board
const gameBoardModule = (() => {
    //Private variable to store the board state
    let board = [[null, null, null],[null, null, null],[null, null, null]];
    let gameIsOver = false;

    //Private function to check if a cell is empty
    const isEmpty = (row, col) => board[row][col] === null;

    const checkHorizontal = () => {
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== null) {
                return board[row][0];
            }
        }
        return null;
    }

    const checkVertical = () => {
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== null) {
                return board[0][col];
            }
        }
        return null;
    }

    const checkDiagonal = () => {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] || board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[1][1] !== null) {
                return board[1][1];
            }
        }
        return null;
    }

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
                for (let col = 0; col < 3; col++) {
                    if (isEmpty(row, col)) {
                        return false; //There's an empty cell, the board is not full
                    }
                }
            }
            return true;
        },

        checkWinner() {
            const horizontalWinner = checkHorizontal();
            const verticalWinner = checkVertical();
            const diagonalWinner = checkDiagonal();
            
            if (horizontalWinner) {
                return horizontalWinner;
            }
            if (verticalWinner) {
                return verticalWinner;
            }
            if (diagonalWinner) {
                return diagonalWinner;
            }

            return null;
        },

        isGameOver() {
            return gameIsOver;
        },

        setGameOver(value) {
            gameIsOver = value;
        },

        reset() {
            board = [[null, null, null],[null, null, null],[null, null, null]];
        },
    };
})();

const PlayerFactory = () => {
    let currentPlayer = 'X';

    return {
        getCurrentPlayer() {
            return currentPlayer;
        },

        switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        },

        resetPlayer() {
            currentPlayer = 'X';
        },
    };
};

//Modal functionality
const modalTrigger = document.getElementById('modal-trigger');
const modalContainer = document.getElementById('modal-container');
const playPersonButton = document.getElementById('play-person');
const playAIButton = document.getElementById('play-ai');
const gameContainer = document.getElementById('game-container');

function showModal() {
    modalContainer.style.display = 'flex';
}

function hideModal() {
    modalContainer.style.display = 'none';
}

modalTrigger.addEventListener('click', () => {
    showModal();
});

playPersonButton.addEventListener('click', () => {
    hideModal();
    gameContainer.style.display = 'flex';
});

playAIButton.addEventListener('click', () => {
    alert('You chose to play with AI');
    hideModal();
})

modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        hideModal();
    }
});

//Game board functionality
const gameBoardHeader = document.getElementById('game-board-header');
const cells = document.querySelectorAll('.cell');
const playerFactory = PlayerFactory();
const restartButton = document.getElementById('restart-button');
const backButton = document.getElementById('main-menu');

//Resets game board, header, cells, isGameOver variable, and player
function resetGame() {
    gameBoardHeader.textContent = 'Player vs. Player';

    gameBoardModule.reset();

    cells.forEach((cell) => {
        cell.textContent = ''
    });

    playerFactory.resetPlayer();

    gameBoardModule.setGameOver(false);
}

//Event listener for adding X or O on the cells that get clicked
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (gameBoardModule.isGameOver()) {
            return;
        }

        if (!cell.textContent) {
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            
            const currentPlayer = playerFactory.getCurrentPlayer()

            const moveSuccess = gameBoardModule.makeMove(row, col, currentPlayer);

            if (moveSuccess) {
                cell.textContent = currentPlayer;

                playerFactory.switchPlayer();

                const winner = gameBoardModule.checkWinner();
                const isBoardFull = gameBoardModule.isFull();

                if (winner) {
                    gameBoardModule.setGameOver(true);
                    setTimeout(() => {
                        gameBoardHeader.textContent = `Player ${winner} wins!`;
                    }, 50);
                    
                } else if (isBoardFull) {
                    gameBoardModule.setGameOver(true);
                    setTimeout(() => {
                        gameBoardHeader.textContent = 'It\'s a tie!';
                    }, 50);
                }
            }
        }
    });
});

//Event listener for the button that resets the board
restartButton.addEventListener('click', () => {
    resetGame();
});

//Event listener for back button that closes game-container page
backButton.addEventListener('click', () => {
    resetGame();
    gameContainer.style.display = 'none';
});