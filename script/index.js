let playerOne = {};
let playerTwo = {};

const player = token => {
    capturedTiles = [];
    winner = false;
    return {token, capturedTiles, winner};
};

const gameBoard = (() => {
    const winConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    let turnCount = 1;
    let currentPlayer = "";
    let winner = "";
    let currentTurn = "X";
    let nextTurn = "O";

    const turnChange = () => {
        let turnPast = gameBoard.currentTurn;
        gameBoard.currentTurn = gameBoard.nextTurn;
        gameBoard.nextTurn = turnPast;
    }

    return {
        winConditions,
        turnCount,
        currentPlayer,
        winner,
        currentTurn,
        nextTurn,
        turnChange    
    }

})(); 

const displayController = (() => {
    const board = document.querySelector(".gameboard");
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

    const pregame = () => {
        board.innerHTML = "";
        board.id = "pregame-state";
        board.append(boardHeading(), boardButtons("X"), boardButtons("O"));
    }

    const startGame = () => {
        board.id = "game-state";
        fillGameTiles();
    }

    const fillGameTiles = () => {
        board.innerHTML = "";
        gameTiles = [];
        for(i=1; i<=boardSpace; i++) {
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
            console.log(tile.dataset.index);
        }      
        gameStartListeners(gameTiles);
    };

    const tileCapture = (tile, token) => {
        tile.innerHTML = token;
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
            displayController.startGame();
        })
    })
}

gameStartListeners = (tiles) => {
    tiles.forEach(tile => {
        if(tile.index !== "X" && tile.index !== "O") {
            tile.addEventListener("click", () => {
                if(playerOne.token === displayController.currentTurn) {
                    playerOne.capturedTiles.push(tile.dataset.index);
                } else {
                    playerTwo.capturedTiles.push(tile.dataset.index);
                };                
                gameBoard.turnChange();
                displayController.fillGameTiles();
            })
        } else return;
    })          
}

displayController.pregame();
preGameListeners();
