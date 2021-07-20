const gameBoard = (() => {
    const boardPosition = document.querySelector("main");
    const setupBoard = () => {
        let board = document.createElement("div");
        board.classList.add(".gameboard")
        boardPosition.append(board);
    }
    const preGame = () => {
        let subheading = document.createElement("h2");
        let subheadingText = document.createTextNode("Choose Your Token");
        subheading.append(subheadingText);
        let buttonO = document.createElement("button");
    }
}) 