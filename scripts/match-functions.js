let matchFuncsToUse = [row, column, square]


/* MATCHING FUNCTIONS */
/*---------------*/

/* vanilla sudoku */
row = function (position) {
    return [position[0], -1, position[2], -1];
}
column = function (position) {
    return [-1, position[1], -1, position[3]];
}
square = function (position) {
    return [position[0], position[1], -1, -1];
}

/* other examples */
kingsMove = function (position) {
    // TODO: do
    return [position[0], position[1], -1, -1];
}

/*---------------*/