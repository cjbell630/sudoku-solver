/**
 * builds (displays) either an empty table or one based on the given board.
 * @param board {[[[[string]]]]} - the 4d array of strings to build the table from ([y][x][b][a])
 */
function buildTable(board = undefined) {
    let basetile = document.getElementById("basetile");
    basetile = basetile.cloneNode(true);
    basetile.removeAttribute("hidden"); //unhide any tiles cloned from this one (but keep the original hidden)
    if (document.getElementById("maintable") != null) {
        document.getElementById("maintable").remove(); //remove any preexisting table
    }
    let table = document.createElement("table"); // create the new one
    table.className = "maintable"
    table.id = "maintable";
    let tile;
    let row_of_squares;
    let square_holder;
    let square;
    let row_of_tiles;
    let tile_holder;
    for (let y = 0; y < 3; y++) { // rows of squares
        row_of_squares = table.insertRow();
        for (let x = 0; x < 3; x++) { // squares
            square_holder = row_of_squares.insertCell();
            square = document.createElement("table");
            square.className = "innertable" //TODO: necessary?
            for (let b = 0; b < 3; b++) { // rows of tiles within square
                row_of_tiles = square.insertRow();
                for (let a = 0; a < 3; a++) { // tiles within square
                    tile_holder = row_of_tiles.insertCell();
                    tile = basetile.cloneNode(true); //copies the unhidden base tile
                    if (board !== undefined) { // if the user did not supply a board parameter
                        tile.innerText = board[y][x][b][a];
                        tile.setAttribute("contenteditable", false); //TODO: decide later
                    }
                    tile_holder.appendChild(tile); // puts the tile in the tile holder (cell)
                }
            }
            square_holder.appendChild(square); // puts the square in the square holder (cell)
        }
    }
    document.body.appendChild(table); //adds the table to the document
}

/**
 * adds the key restrictions (only 1-9, only length 0-1) to every element with the class name "sudokutile".
 */
function addKeyRulesToTiles() {
    Array.from(document.getElementsByClassName("sudokutile")).forEach(function (element) {
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
function collect_and_solve() {
    let board = [];
    let row_of_squares;
    let square;
    let row_of_tiles;
    let table = document.getElementById("maintable")
    Array.from(table.rows).forEach(function (y) {
        board.push([]);
        Array.from(y.cells).forEach(function (x) {
            row_of_squares = board[board.length - 1];
            row_of_squares.push([]);
            Array.from(x.firstElementChild.rows).forEach(function (a) {
                square = row_of_squares[row_of_squares.length - 1];
                square.push([]);
                Array.from(a.cells).forEach(function (b) {
                    row_of_tiles = square[square.length - 1]
                    row_of_tiles.push(b.innerText); //TODO: cast to int
                })
            })
        })
    })
    console.log(board); //TODO: remove when finished
    buildTable(solve(board));
}