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
const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            alert('Hello');
        }
    });
});

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
