 function Gameboard() {
    const board = [];
    const row = 3;
    const column = 3;



    const getBoard = () => board;

    const refreshBoard = () => {
        
        for (let i = 0; i < row; i++) {
            board[i] = [];
    
            for (let j = 0; j < column; j++) {
                board[i].push(Cell());
            }
        }
    }

    refreshBoard();

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

    return {getBoard, dropToken, printBoard, refreshBoard};

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
    let playerOneScore = 0;
    let playerTwoScore = 0;


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

    const getPlayerOneScore = () => playerOneScore;
    const getPlayerTwoScore = () => playerTwoScore;

    const refreshGame = () => {
        gameBoard.refreshBoard();
    }

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
            playerOneScore++;
            console.log(playerOneScore);
            console.log(playerTwoScore);
            return `${players[0].name} wins`;
        }
        else if (winner == players[1].token) {
            playerTwoScore++;
            console.log(playerOneScore);
            console.log(playerTwoScore);
            return `${players[1].name} wins`;
        }

        const cells = [board[0][0], board[0][2], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]];
        let emptyCells = cells.filter((cell) => cell.getValue() === "");

        if (emptyCells.length === 0) {
            console.log(playerOneScore);
            console.log(playerTwoScore);
            return "it ends in a tie";;
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


    

    return {playRound, getActivePlayer, checkWinner, board, players, getPlayerOneScore, getPlayerTwoScore, refreshGame};
}


function ScreenController() {
    const startPage = document.querySelector(".startPage");
    const gamePage = document.querySelector(".gamepage");
    const startBtn = document.querySelector(".startBtn");
    const playerOne = document.querySelector("#playerOneName");
    const playerTwo = document.querySelector("#playerTwoName");
    const playerOneNameCard = document.querySelector(".playerOneNameCard");
    const playerTwoNameCard = document.querySelector(".playerTwoNameCard");
    const playerOneScoreCard = document.querySelector(".playerOneScore");
    const playerTwoScoreCard = document.querySelector(".playerTwoScore");
    const resultDiv = document.querySelector(".result");

    let playerOneName;
    let playerTwoName;
    let game;

    const startGame = () => {
        
        
        playerOneName = playerOne.value;
        console.log(playerOne.value);
        playerTwoName = playerTwo.value;

       
    
       if (playerOneName != "" && playerTwoName != "") {
        
        gamePage.classList.remove("hidden");
        startPage.classList.remove("active");
        startPage.classList.add("hidden");

        game = GameController(playerOneName, playerTwoName);

        updateScreen();
       }
    }

    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const result = document.querySelector(".roundResult");
    const continueBtn = document.querySelector(".continue");

    const restartGame = () => {
        resultDiv.classList.toggle("hidden");
        resultDiv.classList.toggle("active");
        game.refreshGame();
        updateScreen();
    }

    const updateScreen = () => { 
        
        playerOneNameCard.textContent = playerOneName;
        playerOneScoreCard.textContent = game.getPlayerOneScore();
        playerTwoNameCard.textContent = playerTwoName;
        playerTwoScoreCard.textContent = game.getPlayerTwoScore();

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

        const round = game.playRound(selectedRow, selectedColumn);

        if (round !== undefined) {
            resultDiv.classList.toggle("hidden");
            resultDiv.classList.toggle("active");
            result.textContent = round;
        }
    
        updateScreen();
    }



    boardDiv.addEventListener("click", clickHandlerBoard);
    
    startBtn.addEventListener("click", startGame);

    continueBtn.addEventListener("click", restartGame);
}

ScreenController();