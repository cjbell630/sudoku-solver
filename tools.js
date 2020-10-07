function buildTable(board = undefined) {
    let basetile = document.getElementById("basetile");
    basetile = basetile.cloneNode(true);
    basetile.removeAttribute("hidden");
    if (document.getElementById("maintable") != null) {
        document.getElementById("maintable").remove();
    }
    let table = document.createElement("table");
    table.className = "maintable"
    table.id = "maintable";
    //verify var naming
    let tile;
    let row;
    let cell;
    let square;
    let sqrow;
    let sqcell;
    for (let y = 0; y < 3; y++) { //rows of squares
        row = table.insertRow();
        for (let x = 0; x < 3; x++) { //columns of squares
            cell = row.insertCell();
            square = document.createElement("table");
            square.className = "innertable"
            for (let b = 0; b < 3; b++) { // rows of tiles within square
                sqrow = square.insertRow();
                for (let a = 0; a < 3; a++) { // columns of tiles within square
                    sqcell = sqrow.insertCell();
                    tile = basetile.cloneNode(true);
                    if (board !== undefined) {
                        tile.innerText = board[y][x][b][a];
                    }
                    sqcell.appendChild(tile);
                }
            }
            cell.appendChild(square);
        }
    }
    document.body.appendChild(table);
}

function addKeyRulesToTiles() {
    Array.from(document.getElementsByClassName("sudokutile")).forEach(function (element) {
        console.log("adding event listener")
        element.addEventListener("keypress", function (event) {
            console.log("key pressed")
            let key = event.key === undefined ? event.code : event.key;
            if (/^[1-9]/.test(key)) { //if the key can be pressed
                element.innerText = "";
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        })
    });
}

function collect_and_solve() {
    let board = [];
    let row_of_squares;
    let square;
    let row_of_tiles;
    //collect data
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
                    row_of_tiles.push(b.innerText);
                })
            })
        })
    })
    console.log(board);
    buildTable(solve(board));
}