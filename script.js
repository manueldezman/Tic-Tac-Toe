function Gameboard() {
    const board = [];
    const row = 3;
    const column = 3;


    for (let i = 0; i < row; i++) {
        board[i] = [];

        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;



    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addToken(player);
        }
        else {
            return;
        }
    }
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    return {getBoard, dropToken, printBoard};

}


function Cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {

    console.log(Gameboard());
    const gameBoard = Gameboard();
    const board = gameBoard.getBoard();


    const players = [
        {
            name: playerOneName, token: "X"
        },
        {
            name: playerTwoName, token: "O"
        }
    ];


    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];

    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }


    const playRound = (row, column) => {
        
        let newRow = Number(row) + 1;
        let newCol = Number(column) + 1;

        console.log(`Dropping ${getActivePlayer().name}'s token into row ${newRow} and column ${newCol}....`);
        
        gameBoard.dropToken(row, column, getActivePlayer().token);
        

        let winner = checkWinner();

        if (winner == players[0].token) {
            console.log(`player ${winner} wins`);
            return;
        }
        else if (winner == players[1].token) {
            console.log(`player ${winner} wins`);
            return;
        }

        const cells = [board[0][0], board[0][2], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]];
        let emptyCells = cells.filter((cell) => cell.getValue() === "");

        if (emptyCells.length === 0) {
            console.log("it ends in a tie");
            return;
        }

        switchPlayerTurn();
        printNewRound();

    };

    function checkWinner() {
        let winner = "";

        if (board[0][0].getValue() === board[0][1].getValue() && board[0][0].getValue() === board[0][2].getValue()) {

            if (board[0][0].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`)
            }
            else if (board[0][0].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`)
            }
        }
        else if (board[1][0].getValue() === board[1][1].getValue() && board[1][0].getValue() === board[1][2].getValue()) {

            if (board[1][0].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[1][0].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[2][0].getValue() === board[2][1].getValue() && board[2][0].getValue() === board[2][2].getValue()) {

            if (board[2][0].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[2][0].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[0][0].getValue() === board[1][0].getValue() && board[0][0].getValue() === board[2][0].getValue()) {

            if (board[0][0].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[0][0].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[0][1].getValue() === board[1][1].getValue() && board[0][1].getValue() === board[2][1].getValue()) {

            if (board[0][1].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[0][1].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[0][2].getValue() === board[1][2].getValue() && board[0][2].getValue() === board[2][2].getValue()) {

            if (board[0][2].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[0][2].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[0][0].getValue() === board[1][1].getValue() && board[0][0].getValue() === board[2][2].getValue()) {

            if (board[0][0].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);

            }
            else if (board[0][0].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        else if (board[0][2].getValue() === board[1][1].getValue() && board[0][2].getValue() === board[2][0].getValue()) {

            if (board[0][2].getValue() === "X"){
                winner = "X";
                console.log(`player ${winner} wins`);
            }
            else if (board[0][2].getValue() === "O") {
                winner = "O";
                console.log(`player ${winner} wins`);
            }
        }
        
        return winner;
    }

    printNewRound();


    

    return {playRound, getActivePlayer, checkWinner, board, players};
}


function ScreenController() {
    
    const startBtn = document.querySelector(".startBtn");
    const playerOne = document.querySelector("#playerOneName");
    const playerTwo = document.querySelector("#playerTwoName");
    let playerOneName;
    let playerTwoName;
    let game;

    const startGame = () => {
        playerOneName = playerOne.value;
        console.log(playerOne.value);
        playerTwoName = playerTwo.value;

        game = GameController(playerOneName, playerTwoName);

        updateScreen();
    }
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    


    const updateScreen = () => {
        boardDiv.textContent = "";


        const board = game.board;
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        board.forEach((row, index) => {
            const rowIndex = index;
            row.forEach((cell, index) => {
                
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = index;

                cellButton.textContent = cell.getValue();

                boardDiv.appendChild(cellButton);
            })
        })
    }


    function clickHandlerBoard(e) {

        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    
    startBtn.addEventListener("click", startGame);

}

ScreenController();