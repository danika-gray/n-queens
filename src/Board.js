// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(row) { // renamed rowIndex to row to minimize confusion
      var pieceCount = 0;

      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          pieceCount += 1;
        }
        if (pieceCount >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      console.log('row conflicts function acts on:', this);
      var rows = this.rows();
      console.log(rows);
      var hasConflict = false;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let hasConflict = this.hasRowConflictAt(row); // boolean value
        console.log(hasConflict);
        if (hasConflict) {
          hasConflict = true;
        }
      }
      return hasConflict;
    },

    // hasAnyRowConflicts: function() {
    //   var rows = this.rows();
    //   var hasConflict = false;

    //   rows.forEach(function(row) {
    //     var pieceCount = 0;
    //     for (let i = 0; i < row.length; i++) {
    //       if (row[i] === 1) {
    //         pieceCount += 1;
    //       }
    //       if (pieceCount >= 2) {
    //         hasConflict = true;
    //       }
    //     }
    //   });
    //   return hasConflict;
    // },
//[
// [0, 0, 0],    0  row[0][0, 1, 2]
// [0, 0, 0],    1  row[1][0, 1, 2]
// [0, 0, 0] ]   2  row[2][0, 1, 2]




    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if ONE specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) { // colIndex is a number
      let rows = this.rows();
      let pieceCount = 0;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]; // each row
        if (row[colIndex] === 1) {
          pieceCount += 1;
        }
        if (pieceCount >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      console.log('column conflicts function acts on:', this);
      let rows = this.rows();
      let numColumns = rows.length;

      for (let i = 0; i < numColumns; i++) {
        var column = i;

        let hasConflict = this.hasColConflictAt(column);
        if (hasConflict) {
          return true;
        }
      }
      return false;
    },

    // hasAnyRowConflicts: function() {
    //   var rows = this.rows();
    //   var hasConflict = false;

    //   for (let i = 0; i < rows.length; i++) {
    //     let row = rows[i];
    //     let hasConflict = this.hasRowConflictAt(row); // boolean value
    //     if (hasConflict) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    // var matrix = [
    //   [0, 1, 0, 0],
    //   [0, 0, 1, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ];
    // hasAnyColConflicts: function() {
    //   var rows = this.rows();
    //   var hasConflict = false;
    //   var columnIndex;

    //   rows.forEach(function(row) {
    //     var pieceCount = 0;
    //     if (row.indexOf(1) > -1) { // first time we find 1 in a row
    //       columnIndex = row.indexOf(1); // check all rows at this index

    //       let hasColConflictAt = function(colIndex) {
    //         console.log(colIndex, 'here');

    //         for (let i = 0; i < rows.length; i++) { // iterate through each row
    //           if (rows[i][colIndex] === 1) { // check if there is a 1 at columnIndex for each row
    //             pieceCount += 1; // if so, increase pieceCount
    //           }
    //           if (pieceCount >= 2) {
    //             hasConflict = true;
    //           }
    //         }
    //       };

    //       hasColConflictAt(columnIndex);
    //     }
    //   });

    //   return hasConflict;
    // },




    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
