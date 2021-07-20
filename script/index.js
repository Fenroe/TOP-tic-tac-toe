const gameBoard = (() => {
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
        return tile;
    }

    const pregame = () => {
        board.innerHTML = "";
        board.append(boardHeading(), boardButtons("X"), boardButtons("O"));
    }

    const startGame = () => {
        board.innerHTML = "";
        board.id = "pregame-state";
        for(i=1; i<=boardSpace; i++) {
            board.append(boardTile(i));
        }
    }

    return {
        pregame, startGame
    };

})(); 

gameBoard.pregame();
