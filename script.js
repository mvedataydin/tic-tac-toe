"use strict"

var ticTacToe = {
  gameBoard: [['','',''],
              ['','',''],
              ['','','']],
  
  playerPlay: function(row, column) {
    this.gameBoard[row][column] = 'X';
    render.displayPlayerMove();
    handlers.resetEventListener();
  },
  computerPlay: function(row, column){
    this.gameBoard[row][column] = 'O';
    render.displayPlayerMove();
    handlers.resetEventListener();
  }, 
}


var handlers = {

  playerPlay: function() {
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    var buttonClicked;
    cells.forEach(function(cell){
      console.log(cells.textContent)
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

  displayPlayerMove: function() {
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++){
       var temp = ticTacToe.gameBoard[i][j];
       console.log(temp+ "  " + i + "  " + j);
       if(temp === "X"){
         if(i < 1) {
           var cell = document.querySelector(`div[value='${j+1}']`);
           console.log(cell)
           cell.textContent = "X";
           cell.classList.add('player');
          }
         else if(i < 2) {
           var cell = document.querySelector(`div[value='${j+4}']`);
           console.log(cell)
           cell.textContent = "X";
           cell.classList.add('player');
          }
         else if(i < 3) {
           var cell = document.querySelector(`div[value='${j+7}']`);
           console.log(cell)
           cell.textContent = "X";
           cell.classList.add('player');
          }
        }
      }
    }
  },

}