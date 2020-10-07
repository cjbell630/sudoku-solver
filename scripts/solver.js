/**
 * solves the given sudoku board and returns the computed solution.
 * @param board {Tile[][][][]} - the 4d array of Tiles to solve ([y][x][b][a])
 * @returns {Tile[][][][]} - the solved 4d array
 */
function solve(board) {
    //console.log(allPossibleArrays([-1, -1, -1, -1]))
    //console.log(getMatches(0, 0, 0, 0, rows))
    let changed = true;
    while (changed) {
        changed = false;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                for (let b = 0; b < 3; b++) {
                    for (let a = 0; a < 3; a++) {
                        let tile = board[y][x][b][a]
                        let tileSolution = tile.solution();
                        if (tileSolution !== -1) { // if it has a solution
                            matchFuncsToUse.forEach(function (matchFunc) {
                                getOtherMatches([y, x, b, a], matchFunc).forEach(function (match) {
                                    console.log(match + " cannot be " + tileSolution + " because in the same " + matchFunc.name + " as " + [y, x, b, a]);
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

    return board; //solved
}

/**
 * TODO
 */
class Tile {
    /**
     * TODO
     * @param possibilities {string}
     */
    constructor(possibilities = "123456789") {
        this.possibilities = possibilities === "" ? "123456789" : possibilities;
    }

    /**
     * TODO
     * @returns {number}
     */
    solution() {
        return this.possibilities.length === 1 ? parseInt(this.possibilities) : -1;
    }

    /**
     * //TODO
     * @param value {number}
     * @returns {boolean}
     */
    removePossibility(value) {
        if (this.possibilities.includes(value + "")) {
            console.log(this.possibilities + " contains " + value);
            console.log("removing possibility " + value + " from " + this.possibilities);
            this.possibilities = this.possibilities.replace(value + "", ""); // could be simplified with return changed but this is probably faster
            console.log("removed. now " + this.possibilities);
            return true; // value was changed
        } else {
            return false; // value was not changed aka possibility has already been removed
        }
    }

    /**
     * TODO
     * @returns {string}
     */
    toString() {
        return this.solution() === -1 ? "?" + this.possibilities + "?" : this.solution() + "";
    }

    /**
     * TODO
     * @returns {string|string}
     */
    toFunctionalString() {
        return this.solution() === -1 ? "" : this.solution() + "";
    }
}

/**
 * TODO
 * @param position {number[]}
 * @param condition {function(number[])}
 * @returns {number[][]}
 */
function getOtherMatches(position, condition) {
    let matches = allPossibleArrays(condition(position));
    console.log("running removeElement on " + matches)
    removeFirst(matches, position);
    return matches;
}

/**
 * TODO
 * @param array {number[]}
 * @returns {number[][]}
 */
function allPossibleArrays(array) { //returns all possible arrays where the -1s are replaced with numbers 0-3
    /**
     * example: [0, 0, 0, undefined] should return
     * [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 2]]
     */
    let solutions = [];
    //console.log("finding solutions for " + array);
    let firstUndefinedIndex = array.indexOf(-1);
    //console.log("found -1 at " + firstUndefinedIndex);
    if (firstUndefinedIndex !== -1) {
        for (let i = 0; i < 3; i++) {
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
 * @param array {[E]} - the array to remove the element from
 * @param element {E} - the element to find and remove the first instance of
 */
function removeFirst(array, element) {
    console.log("removing element " + element + " from " + array);
    let index = 0;
    array.forEach(function (e) {
        if (JSON.stringify(e) === JSON.stringify(element)) {
            console.log("found at index " + index);
            array.splice(index, 1);
            console.log("removed element. now " + array);
            return true;
        }
        index++;
    });
    return false;
}