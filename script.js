"use strict"

var ticTacToe = {
  gameBoard : [['O','O','O'],
               ['X','X','X'],
               ['O','O','O']],
  
  playerPlay: function(row, column) {
    this.gameBoard[row][column] = "X";
  },
  computerPlay: function(row, column){
    this.gameBoard[row][column] = "O";
  } 
}
console.log(ticTacToe.gameBoard[0][0]);
ticTacToe.playerPlay(0,0);
console.log(ticTacToe.gameBoard[0][0]);