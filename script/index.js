let playerOne = {};
let playerTwo = {};

const player = token => {
    capturedTiles = [];
    winner = false;
    return {token, capturedTiles, winner};
};

const gameBoard = (() => {
    const winConditions = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"]
    ]

    let turnCount = 0;
    let currentTurn = "X";
    let nextTurn = "O";

    const checkForWinner = playerX => {
        gameBoard.winConditions.forEach(winCondition => {
            if(playerX.capturedTiles.includes(winCondition[0]) === true &&
            playerX.capturedTiles.includes(winCondition[1]) === true && 
            playerX.capturedTiles.includes(winCondition[2]) === true) {
                playerX.winner = true;
                return;
            }
        })

    }

    return {
        winConditions,
        turnCount,
        currentTurn,
        nextTurn,
        checkForWinner
    }

})(); 

const displayController = (() => {
    const board = document.querySelector(".gameboard");
    const boardInfo = document.querySelector(".game-info-text");
    const boardSpace = 9;

    let gameTiles = [];

    const boardHeading = () => {
        let headingContainer = document.createElement("div");
        headingContainer.classList.add("page-heading-container");
        let heading = document.createElement("h2");
        let headingText = document.createTextNode("Choose Your Token");
        heading.append(headingText);
        heading.classList.add("pregame-heading");
        headingContainer.append(heading);
        return headingContainer;
    }

    const boardButtons = token => {
        let button = document.createElement("button");
        button.innerHTML = token;
        button.setAttribute("data-token", token);
        button.classList.add("button-"+token);
        return button;
    }

    const boardTile = index => {
        let tile = document.createElement("div");
        tile.classList.add("gameboard-tile");
        tile.setAttribute("data-index", index);
        return tile;
    }

    const updateBoardInfo = text => {
        boardInfo.innerHTML = text;
    }

    const pregame = () => {
        board.innerHTML = "";
        updateBoardInfo("");
        board.id = "pregame-state";
        board.append(boardHeading(), boardButtons("X"), boardButtons("O"));
    }

    const startGame = () => {
        board.id = "game-state";
        gameBoard.turncount = 0;
        fillGameTiles();
    }

    const fillGameTiles = () => {
        board.innerHTML = "";
        gameTiles = [];
        for(i=1; i<=boardSpace; i++) {
            i = String(i);
            if(playerOne.capturedTiles.includes(i)) {
                tile = boardTile(playerOne.token);
                tile.innerHTML = playerOne.token;
            } else if(playerTwo.capturedTiles.includes(i)) {
                tile = boardTile(playerTwo.token);
                tile.innerHTML = playerTwo.token;
            } else {
                tile = boardTile(i);
            }
            gameTiles.push(tile);
            board.append(tile);
        }      
        switch(gameBoard.turnCount) {
            case 9:
                gameBoard.checkForWinner(playerOne);
                gameBoard.checkForWinner(playerTwo)
                postGame();
                return;
            case 5: case 6: case 7: case 8:
                gameBoard.checkForWinner(playerOne);
                gameBoard.checkForWinner(playerTwo);
                if (playerOne.winner === true || playerTwo.winner === true) {
                    postGame();
                    return;
                }
                break;
            default:
                break;                
        }
        updateBoardInfo(gameBoard.currentTurn+"'s Move");
        gameStartListeners(gameTiles);
    };

    const tileCapture = (tile, token) => {
        tile.innerHTML = token;
    }

    const postGame = () => {
        if(playerOne.winner === true) {
            updateBoardInfo(playerOne.token+" Wins <br>Click the board to play again.");
        }
        else if(playerTwo.winner === true) {
            updateBoardInfo(playerTwo.token+" Wins <br>Click the board to play again.");
        }
        else {
            updateBoardInfo("It's A Tie <br>Click the board to play again.");
        }
        postGameListener();
    }

    const postGameListener = () => {
        board.addEventListener("click", () => {
            console.log("test");
            playerOne = {};
            playerTwo = {};
            startGame();
        })
    }

    return {
        gameTiles,
        board,
        pregame, 
        startGame, 
        tileCapture,
        fillGameTiles
    };

})();

preGameListeners = () => {
    buttons = displayController.board.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playerOne = player(button.dataset.token);
            button.dataset.token === "X" ? playerTwo = player("O") : playerTwo = player("X");
            displayController.startGame(button.dataset.token);
        })
    })
}

gameStartListeners = (tiles) => {
    tiles.forEach(tile => {
        if(tile.dataset.index !== "X" && tile.dataset.index !== "O") {
            tile.addEventListener("click", () => {
                if(playerOne.token === gameBoard.currentTurn) {
                    playerOne.capturedTiles.push(tile.dataset.index);
                    gameBoard.nextTurn = playerOne.token;
                    gameBoard.currentTurn = playerTwo.token;
                } else {
                    playerTwo.capturedTiles.push(tile.dataset.index);
                    gameBoard.nextTurn = playerTwo.token;
                    gameBoard.currentTurn = playerOne.token;
                };  
                gameBoard.turnCount++;             
                displayController.fillGameTiles();
            })
        } else return;
    })          
}

displayController.pregame();
preGameListeners();
