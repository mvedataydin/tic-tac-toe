"use strict"

var ticTacToe = {
  gameBoard: [['O','O','O'],
              ['X','X','X'],
              ['O','O','O']],
  
  playerPlay: function(row, column) {
    this.gameBoard[row][column] = 'X';
    handlers.resetEventListener();
  },
  computerPlay: function(row, column){
    this.gameBoard[row][column] = 'O';
    handlers.resetEventListener();
  }, 
}


var handlers = {

  playerPlay: function() {
    
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    var buttonClicked;
    cells.forEach(function(cell){
      cell.addEventListener('click', function(e){
        buttonClicked = e.target.getAttribute('value');
        if(buttonClicked < 4) {               // check if first row
          ticTacToe.playerPlay(0, buttonClicked - 1);
        }
        else if(buttonClicked < 7) {          // check if second row
          ticTacToe.playerPlay(1, buttonClicked - 4);
        }
        else if(buttonClicked < 10) {         // check if third row
          ticTacToe.playerPlay(2, buttonClicked - 7);
        }
      })
    })
  },
  computerPlay: function() {
    var square = document.querySelector('.square');
    ticTacToe.computerPlay(row, column);
  },
  resetEventListener: function() {
    var el = document.querySelectorAll(".square");
    el.forEach(square => {
      let elClone = square.cloneNode(true);
      square.parentNode.replaceChild(elClone, square);
    });
  },
}


var render = {


}