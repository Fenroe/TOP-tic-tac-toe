const player = token => {
    capturedTiles = [];
    status = notWon;
    return {token, capturedTiles, status};
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
    return {
        winConditions,
        turnCount,
        currentPlayer,
        winner
    }
})(); 

const displayController = (() => {
    const board = document.querySelector(".gameboard");
    const boardSpace = 9;

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
        tile.setAttribute("data-index-number", index);
        tile.innerHTML = index;
        return tile;
    }

    const pregame = () => {
        board.innerHTML = "";
        board.id = "pregame-state";
        board.append(boardHeading(), boardButtons("X"), boardButtons("O"));
        buttons = board.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                startGame(button.dataset.token);
            })
        })
    }

    const startGame = (token) => {
        board.innerHTML = "";
        board.id = "game-state";
        for(i=1; i<=boardSpace; i++) {
            tile = boardTile(i);
            board.append(tile);
        }      
    }

    const gameTurn = token => {
        tiles = board.querySelectorAll(".gameboard-tile");
        tiles.forEach(tile => {
            tile.addEventListener("click", () => {
                tile.innerHTML = token;
            })
        })
    }

    return {
        pregame, 
        startGame, 
        gameTurn,
    };

})();

displayController.pregame();
