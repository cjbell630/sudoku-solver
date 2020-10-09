/**
 * MATCHING FUNCTIONS
 * -----------------
 * A valid matching function must take a 1d length 4 array of numbers (the tile position) and return another array
 * which dictates which positions may not hold that value. Don't worry about not including the position itself, that is
 * handled in solver.js.
 *
 * Here's how you do it:
 * Let's say you're playing a custom sudoku game where no two numbers of the same value may be touching (not counting diagonally)
 * (this is known as a King's Move sudoku)
 * Vertically adjacent tiles are similar to matching columns... they all share the same x and a, and their position is +/-1 off of the center.
 * This can be represented like so:
 * TODO
 *
 *
 * NOTE: They don't technically have to be in this class, it just makes it easier to generate documentation this way.
 */
class MatchFunctions {
    /* vanilla sudoku */

    static checkIfSafe(values) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] === undefined) {
                console.log("invalid options supplied, " + values + " is unsafe");
                return false;
            }
        }
        return true;
    }

    static row = function (position) {
        if (MatchFunctions.checkIfSafe([position[0], position[2]])) {
            return [position[0], -1, position[2], -1];
        } else {
            return [];
        }
    }
    static column = function (position) {
        if (MatchFunctions.checkIfSafe([position[1], position[3]])) {
            return [-1, position[1], -1, position[3]];
        } else {
            return [];
        }
    }
    static square = function (position) {
        if (MatchFunctions.checkIfSafe([position[0], position[1]])) {
            return [position[0], position[1], -1, -1];
        } else {
            return [];
        }
    }

    /* other examples */
    static kingsMove = function (position) {
        // TODO: do
        let directions = [
            function (position) {
                return []
            },
            function (position) {
            },
            function (position) {
            },
            function (position) {

            }
        ]
        return [position[0], position[1], -1, -1];
    }


    /**
     * Put all functions you want the script to check for matches against in this array!
     */
    static matchFuncsToUse = [MatchFunctions.row, MatchFunctions.column, MatchFunctions.square]
}