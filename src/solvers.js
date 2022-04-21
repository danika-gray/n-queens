/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }
  var movesCount = 0;
  var solutionsCount = 0;
  //var movesCount = 0;
  //create new board of n size
  var board = new Board({n: n}); // [0]
  // [1, 0, 0 0 0 0 0 0 0]
  // [0, 1, 0]
  // [0, 0, 1]

  var test = board.hasAnyColConflicts();
  console.log(test);

  // [[0, 0],
  // [0, 0]]

  // [[1, 0],   // save this index? [00, 10, 01, 11]
  // [0, 0]]

  // [[1, 0],
  // [0, 1]]

  // [[0, 0],
  // [0, 0]]

  // [[0, 1],
  // [0, 0]]

  var findSolution = function(board) {
    // iterate through all possible moves

    var rows = board.rows();
    console.log('rows', rows);

    for (let i = 0; i < rows.length; i++) { // row = 0
      let rowIndex = i; // index for each row?
      console.log('rowIndex', rowIndex);
      let row = rows[i];

      for (let i = 0; i < row.length; i++) { //00  // 01

        let colIndex = row[i]; // row[i][i] row[0][0] [1][1]
        console.log('colIndex', colIndex);

        board.togglePiece(rowIndex, colIndex); // place piece on board

        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(rowIndex, colIndex); // remove piece
          continue;
        }
        if (board.hasAnyColConflicts()) {
          board.togglePiece(rowIndex, colIndex); // remove piece
          continue;
        }
        // only keep piece on board if there are no conflicts
        movesCount++; // 1
        if (movesCount < n) {
          console.log('movesCount', movesCount);
          //return findSolution(board); // next move
        }
        if (movesCount === n) {
          console.log('board', board);
          solutionsCount++;
          // return to the top of for loop
        }

      }

    }

  };
  // call findSolution();
  findSolution(board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
