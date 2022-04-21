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

// var solutionBoard = new Board(findNRooksSolution(n));
// findNRooksSolution(n) generates one matrix of dimensions n x n
// [[1, 0, 0],
//  [0, 1, 0],
//  [0, 0, 1]]

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }
  let movesCount = 0;
  let solutionsCount = 0;
  let board = new Board({n: n});

  let findSolutions = function(board) {
    let piecesOnBoard = 0; // increase each time a new piece is played

    // generate row possiblities
    for (let i = 0; i < n; i++) { // for n=2 i will be 2 aka 2 rows
      let rowIndex = i;

      // generate column possibilities
      for (let i = 0; i < n; i++) { // for n=2 i will be 2 aka 2 columns
        let columnIndex = i;

        // place a piece for each new position
        console.log('rowIndex', rowIndex, 'columnIndex', columnIndex);
        board.togglePiece(rowIndex, columnIndex);

        let test = board.hasAnyColConflicts();
        console.log('test', test);

        let test2 = board.hasAnyRowConflicts();
        console.log('test2', test2);

        // check for conflicts
        if (board.hasAnyRowConflicts()) { // if row conflict remove piece
          console.log('has row conflict!');
          board.togglePiece(rowIndex, colIndex);
          continue;
        }
        if (board.hasAnyColConflicts()) { // if column conflict remove piece
          board.togglePiece(rowIndex, colIndex);
          continue;
        }
        // if there are no conflicts
        movesCount++;
        // if n = movesCount
        if (n === movesCount) {
          console.log('here2');
          solutionsCount++;
          return;
        } else {
          console.log('n not equal to movesCount', board);
          findSolutions(board);
        }

      }

    }
  };
  findSolutions(board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
};


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
