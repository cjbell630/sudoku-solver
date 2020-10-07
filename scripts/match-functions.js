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
    static row = function (position) {
        return [position[0], -1, position[2], -1];
    }
    static column = function (position) {
        return [-1, position[1], -1, position[3]];
    }
    static square = function (position) {
        return [position[0], position[1], -1, -1];
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