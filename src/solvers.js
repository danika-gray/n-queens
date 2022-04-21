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
  //create a new board
  var board = new Board({n: n});
  // board.rows() = matrix
  var solution = board.rows(); //fixme

  for (var rowIndex = 0; rowIndex < solution.length; rowIndex++) {
    var row = solution[rowIndex];
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      board.togglePiece(rowIndex, colIndex);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log(solution);
  return solution;
};

// var solutionBoard = new Board(findNRooksSolution(n));
// findNRooksSolution(n) generates one matrix of dimensions n x n
// [[1, 0, 0],
//  [0, 1, 0],
//  [0, 0, 1]]

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionsCount = 0;
  let board = new Board({n: n});

  // every row can be a recursive call
  // we need a base case inside the recursive function
  // if we found a solution aka row n we need to backtrack up the tree and recurse again
  // we go through rows with recursion, we go through columns with for loops
  // if we reach a base case

  let matrix = board.rows();
  // each row is matrix[row][for-loop index]
  var findSolutions = function(board, row) {
    for (let i = 0; i < matrix[row].length; i++) {
      board.togglePiece(row, i);

      //check conflicts
      if (board.hasAnyRooksConflicts()) {
        board.toggle(row, i);
      }

      if (row !== n) {
        return findSolutions(board, row + 1);
      } else {
        solutionsCount++;
        board.toggle(row, i);
        findSolutions(board, row - 1);
      }

    }
  // check conflicts // false
  // toggle piece on board // 1st piece
  // recurse call with row + 1 - return findSolutions(row+1)

  // check conflicts // true
  // check column index
  // toggle piece off the board

  // base case: if rows = n
    // increase solutionsCount
    // toggle piece off the board
    // return out of function

  };

  findSolutions(board, 0);
  return solutionsCount;
};

// window.countNRooksSolutions = function(n) {
//   if (n === 0) {
//     return 1;
//   }
//   let solutionsCount = 0;
//   let board = new Board({n: n});
//   let matrix = board.rows();

//   let occupiedRows = [];
//   console.log('occupiedRows', occupidedRows);
//   let occupidedColumns = [];

//   let findSolutions = function(board, row) {
//     let piecesOnBoard = 0;

//     // every row can be a recursive call
//     // we need a base case inside the recursive function
//     // if we found a solution aka row n we need to backtrack up the tree and recurse again
//     // we go through rows with recursion, we go through columns with for loops


//     for (let i = 0; i < matrix.length; i++) { // for n=2 i will be 2 aka 2 rows
//       let rowIndex = matrix[i]; // current row or array
//       if (occupiedRows.indexOf(i) > -1) { // then row is occupied, avoid it!
//         continue;
//       }

//       for (let j = 0; j < rowIndex.length; j++) { // for n=2 i will be 2 aka 2 columns
//         if (occupidedColumns.indexOf(j) > -1) { // then column is occupied, avoid it!
//           continue;
//         }

//         occupidedRows.push(i);
//         occupidedColumns.push(j);

//         board.togglePiece(i, j);
//         piecesOnBoard++;

//         if (n === piecesOnBoard) {
//           // if we reach a base case
//           // pieces on Board needs to be changed
//           solutionsCount++;
//           occupiedRows = [];
//           occupidedColumns = [];
//           // remove
//           return;

//         } else {
//           let nextRow = row+1;
//           findSolutions(board, row +1); // return from inner functions
//           // piece

//         }
//       }
//     }
//   };
//   findSolutions(board, 0);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
//   return solutionsCount;
// };

// window.findNRooksSolution = function(n) {
//   //create a new board
//   var board = new Board({n: n});
//   // board.rows() = matrix
//   var solution = board.rows(); //fixme

//   for (var rowIndex = 0; rowIndex < solution.length; rowIndex++) {
//     var row = solution[rowIndex];
//     for (var colIndex = 0; colIndex < row.length; colIndex++) {
//       board.togglePiece(rowIndex, colIndex);

//       if (board.hasAnyRooksConflicts()) {
//         board.togglePiece(rowIndex, colIndex);
//       }
//     }
//   }

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   console.log(solution);
//   return solution;
// };

// var solutionBoard = new Board(findNRooksSolution(n));
// findNRooksSolution(n) generates one matrix of dimensions n x n
// [[1, 0, 0],
//  [0, 1, 0],
//  [0, 0, 1]]

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   if (n === 0) {
//     return 0;
//   }
//   var movesCount = 0;
//   var solutionsCount = 0;
//   //var movesCount = 0;
//   //create new board of n size
//   var board = new Board({n: n}); // [0]
//   // [1, 0, 0 0 0 0 0 0 0]
//   // [0, 1, 0]
//   // [0, 0, 1]

//   var test = board.hasAnyColConflicts();
//   //console.log(test);

//   // [[0, 0],
//   // [0, 0]]

//   // [[1, 0],   // save this index? [00, 10, 01, 11]
//   // [0, 0]]

//   // [[1, 0],
//   // [0, 1]]

//   // [[0, 0],
//   // [0, 0]]

//   // [[0, 1],
//   // [0, 0]]

//   var findSolution = function(board) {
//     // iterate through all possible moves

//     var rows = board.rows();
//     //console.log('rows', rows);

//     for (let i = 0; i < rows.length; i++) { // row = 0
//       let rowIndex = i; // index for each row?
//       //console.log('rowIndex', rowIndex);
//       let row = rows[i];

//       for (let i = 0; i < row.length; i++) { //00  // 01

//         let colIndex = row[i]; // row[i][i] row[0][0] [1][1]
//         //console.log('colIndex', colIndex);

//         board.togglePiece(rowIndex, colIndex); // place piece on board

//         if (board.hasAnyRooksConflicts()) {
//           board.togglePiece(rowIndex, colIndex); // remove piece
//           continue;
//         }
//         if (board.hasAnyColConflicts()) {
//           board.togglePiece(rowIndex, colIndex); // remove piece
//           continue;
//         }
//         // only keep piece on board if there are no conflicts
//         movesCount++; // 1
//         if (movesCount < n) {
//           //console.log('movesCount', movesCount);
//           //return findSolution(board); // next move
//         }
//         if (movesCount === n) {
//           // console.log('board', board);
//           solutionsCount++;
//           // return to the top of for loop
//         }

//       }

//     }

//   };
//   // call findSolution();
//   findSolution(board);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
//   return solutionsCount;
// };



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
