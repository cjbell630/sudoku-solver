/**
 * builds and displays either an empty table or one based on the given board.
 * @param board {[[[[string]]]]} - the 4d array of strings to build the table from ([y][x][b][a])
 */
function buildAndDisplayTable(board = undefined) {
    let baseTile = document.getElementById("base-tile");
    baseTile = baseTile.cloneNode(true);
    baseTile.removeAttribute("hidden"); // unhide any tiles cloned from this one (but keep the original hidden)
    if (document.getElementById("main-table") != null) { // TODO: refactor so only getElement... is only called once
        document.getElementById("main-table").remove(); // remove any preexisting table
    }
    let table = document.createElement("table"); // create the new one
    table.className = "main-table"
    table.id = "main-table";
    let tile;
    let rowOfSquares;
    let squareHolder;
    let square;
    let rowOfTiles;
    let tileHolder;
    for (let y = 0; y < 3; y++) { // rows of squares
        rowOfSquares = table.insertRow();
        for (let x = 0; x < 3; x++) { // squares
            squareHolder = rowOfSquares.insertCell();
            square = document.createElement("table");
            square.className = "inner-table" // TODO: necessary?
            for (let b = 0; b < 3; b++) { // rows of tiles within square
                rowOfTiles = square.insertRow();
                for (let a = 0; a < 3; a++) { // tiles within square
                    tileHolder = rowOfTiles.insertCell();
                    tile = baseTile.cloneNode(true); // copies the unhidden base tile
                    if (board !== undefined) { // if the user did not supply a board parameter
                        tile.innerText = board[y][x][b][a];
                    }
                    /*tile.setAttribute("contenteditable", false);*/// TODO: falsifying contenteditable messes up proportions
                    tileHolder.appendChild(tile); // puts the tile in the tile holder (cell)
                }
            }
            squareHolder.appendChild(square); // puts the square in the square holder (cell)
        }
    }
    document.body.appendChild(table); // adds the table to the document
}

/**
 * adds the key restrictions (only 1-9, only length 0-1) to every element with the class name "sudoku-tile".
 */
function addKeyRulesToTiles() {
    Array.from(document.getElementsByClassName("sudoku-tile")).forEach(function (element) {
        element.addEventListener("keypress", function (event) {
            let key = event.key === undefined ? event.code : event.key; // should get the correct value for most browsers
            if (/^[1-9]/.test(key)) { // if the key can be pressed
                element.innerText = ""; // remove all text
                return true; // probably unnecessary
            } else {
                event.preventDefault(); // don't allow the key to be pressed
                return false; // probably unnecessary
            }
        })
    });
}

/**
 * collects the information in the displayed table into a more readable array.
 */
function collectAndSolve() {
    let board = [];
    let rowOfSquares;
    let square;
    let rowOfTiles;
    let table = document.getElementById("main-table")
    Array.from(table.rows).forEach(function (y) {
        board.push([]);
        Array.from(y.cells).forEach(function (x) {
            rowOfSquares = board[board.length - 1];
            rowOfSquares.push([]);
            Array.from(x.firstElementChild.rows).forEach(function (a) {
                square = rowOfSquares[rowOfSquares.length - 1];
                square.push([]);
                Array.from(a.cells).forEach(function (b) {
                    rowOfTiles = square[square.length - 1]
                    rowOfTiles.push(b.innerText); // TODO: cast to int
                })
            })
        })
    })
    console.log(board); // TODO: remove when finished
    buildAndDisplayTable(solve(board));
}