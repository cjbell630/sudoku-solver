/**
 * Solves the given sudoku board and returns the computed solution.
 * @param board {Tile[][][][]} - the 4d array of Tiles to solve ([y][x][b][a])
 * @returns {Tile[][][][]} - the solved 4d array
 */
function solve(board) {
    //console.log(allPossibleArrays([-1, -1, -1, -1]))
    //console.log(getMatches(0, 0, 0, 0, rows))
    //TODO: remove log messages
    let changed = true;
    while (changed) {
        changed = false;
        for (let y = 0; y < 3; y++) { // rows of squares
            for (let x = 0; x < 3; x++) { // squares
                for (let b = 0; b < 3; b++) { // rows of tiles
                    for (let a = 0; a < 3; a++) { // tiles
                        let tile = board[y][x][b][a];
                        let tileSolution = tile.solution(); // must be stored here or causes some problems with deleting itself
                        if (tileSolution !== -1) { // if it has a solution
                            matchFuncsToUse.forEach(function (matchFunc) { // iterates through the match functions supplied in match-functions.js
                                // tests the position against each of the match functions
                                getOtherMatches([y, x, b, a], matchFunc).forEach(function (match) {
                                    console.log(match + " cannot be " + tileSolution + " because in the same " + matchFunc.name + " as " + [y, x, b, a]);

                                    // if this function produced a change, changed will be true after this line
                                    changed |= board[match[0]][match[1]][match[2]][match[3]].removePossibility(tileSolution);
                                });
                            })
                        }
                    }
                }
            }
        }
        console.log("iterated through all tiles once")
        //TODO: check guess values ex 8 must be in this square and column so no other 8s can be in that column outside of the square
    }

    return board; // solved
}

/**
 * Stores information about a tile and includes helper methods.
 */
class Tile {
    /**
     * Creates a new tile with either the given possibility string
     * OR all numbers 1-9 if the user does not specify / specifies an empty possibilities string.
     * //TODO: throw error if string doesnt match /[^1-9]/
     * @param [possibilities="123456789"] {string} - the possibilities string to base this Tile off of
     */
    constructor(possibilities = "123456789") {
        this.possibilities = (possibilities === "" ? "123456789" : possibilities);
    }

    /**
     * Returns the single solution of the Tile as a number, or -1 if it doesn't have one.
     * //TODO: throw error if number doesnt match /[^1-9]/ except also -1
     * @returns {number} - the solution or -1 (SHOULD only be -1 or 1-9)
     */
    solution() {
        return this.possibilities.length === 1 ? parseInt(this.possibilities) : -1;
    }

    /**
     * Removes a number from the list of possibilities stored for this Tile.
     * //TODO: throw error if num/string doesnt match /[^1-9]/
     * @param value {number|string} - the possibility to remove (SHOULD only be 1-9)
     * @returns {boolean} - true if the value was changed, false if not
     */
    removePossibility(value) {
        if (this.possibilities.includes(value + "")) { // could be simplified with return changed but this is probably faster
            console.log(this.possibilities + " contains " + value);
            console.log("removing possibility " + value + " from " + this.possibilities);
            this.possibilities = this.possibilities.replace(value + "", "");
            console.log("removed. now " + this.possibilities);
            return true; // value was changed
        } else {
            return false; // value was not changed aka possibility has already been removed
        }
    }

    /**
     * Returns the Tile as a string for displaying to the user.
     * Contains minimal information.
     * @override
     * @returns {string|string} - the Tile's solution if it has one, otherwise just a ?
     */
    toString() {
        return this.solution() === -1 ? "?" : this.solution() + "";
    }

    /**
     * Returns the Tile as a string containing more information than this.toString().
     * Useful for debugging.
     * @returns {string} - the Tile's solution if it has one, otherwise all of the guesses surrounded by ?s
     */
    toDebugString() {
        return this.solution() === -1 ? "?" + this.possibilities + "?" : this.solution() + "";
    }
}

/**
 * Gets all matches for the position found using the given condition function, EXCEPT the original position.
 * //TODO: allow multiple position arrays to be returned by the match function (such as for kings move)
 * //TODO: throw error if position doesn't match 1-9
 * //TODO: remove logs
 * @param position {number[]} - the position to find matches for (typically 1d length 4 and only nums 1-9)
 * @param condition {function(number[])} - a function that takes a number array
 *                                          (typically a 1d array with 4 values ranging from 1-9)
 *                                          and returns another 1d of the same length where -1s represent positions
 *                                          which may have any value 1-9. See match-functions.js for more information
 * @returns {number[][]} - a list of all positions (same requirements as position) which matched against the given function and position
 */
function getOtherMatches(position, condition) {
    let matches = allPossibleArrays(condition(position)); //TODO: see above
    console.log("running removeElement on " + matches);
    removeFirst(matches, position); // removes the original position if it was matched against itself
    return matches;
}

/**
 * Returns all possible arrays that can be made using a base array, where each instance of `undefValue` is replaced with
 * all values from `startInc` to `endExc`.
 * For example: `allPossibleArrays([1, -1], 1, 4)   =>    [[1, 1], [1, 2], [1, 3]]
 * Another example: `allPossibleArrays([-1, 4, -1], 0, 2)   =>   [[0, 4, 0], [0, 4, 1], [1, 4, 0], [1, 4, 1]]`
 * It calls itself recursively for each instance of `undefValue`, then adds the arrays together, so it can be called on
 * arrays of infinite length and infinite instances of `undefValue`.
 * TODO: find efficiency big O notation thing
 * TODO: remove log
 * This version is specialized for this script, so it contains default values that fulfill that purpose.
 * It can still be used for any purpose, though.
 * @param array {number[]} - the array to find all possible arrays of
 * @param [startInc=0] {number} - the start of the range of values to replace instances of `undefValue` with (inclusive)
 * @param [endExc=3] {number} - the end of the range of values to replace instances of `undefValue` with (exclusive)
 * @param [undefValue=-1] {!number} - the value to replace ALL instances of. Make sure it's not a value that's going to be used
 *                                   NOTE: the reason this value can't simply be `undefined` is (I think) because
 *                                   (sorry if this is completely wrong, I'm new to JavaScript so I'm basing this guess
 *                                   off of my experience with other programming languages)
 *                                   when JavaScript works with arrays, it fills the end up with `undefined`s to allow
 *                                   for quick expansion. Essentially, if `undefined` is used as the undefValue, it
 *                                   causes issues when used at the end of the array (ex [0, 1, 2, undefined]). So yeah
 * @returns {number[][]} - an array containing all possible arrays where every `undefValue` is replaced with every value within the given range.
 */
function allPossibleArrays(array, startInc = 0, endExc = 3, undefValue = -1) { //returns all possible arrays where the -1s are replaced with numbers 0-3
    /**
     * example: [0, 0, 0, undefined] should return
     * [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 2]]
     */
    let solutions = [];
    //console.log("finding solutions for " + array);
    let firstUndefinedIndex = array.indexOf(undefValue);
    //console.log("found -1 at " + firstUndefinedIndex);
    if (firstUndefinedIndex !== undefValue) {
        for (let i = startInc; i < endExc; i++) {
            array[firstUndefinedIndex] = i;
            //console.log("\n/-----------------------------\\");
            let solutionsForCurrentReplacement = allPossibleArrays(JSON.parse(JSON.stringify(array)));
            //console.log("just recursively tested " + array + ". found " + solutionsForCurrentReplacement);
            //solutionsForCurrentReplacement will always be an array of arrays at least
            solutionsForCurrentReplacement.forEach(function (value) {
                solutions.push(value)
            });
            //console.log("\\-----------------------------/");
        }
        return solutions
    } else {
        return [array];
    }
}

/**
 * Removes the first instance of an element found in an array. Works with multi-dimensional arrays.
 * @template E {any} - can be any data type
 * @param array {E[]} - the array to remove the element from
 * @param element {E} - the element to find and remove the first instance of
 */
function removeFirst(array, element) {
    console.log("removing element " + element + " from " + array);
    let index = 0;
    array.forEach(function (e) {
        if (JSON.stringify(e) === JSON.stringify(element)) { // converts to JSON string to ensure compatibility with multi-dimensional arrays.
            console.log("found at index " + index);
            array.splice(index, 1);
            console.log("removed element. now " + array);
            return true;
        }
        index++;
    });
    return false;
}