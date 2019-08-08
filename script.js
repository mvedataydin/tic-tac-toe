"use strict"

var ticTacToe = {
  gameBoard: [['','',''],
              ['','',''],
              ['','','']],
  
  playerPlay: function(row, column) {
    this.gameBoard[row][column] = 'X';
    render.displayPlayerMove();
    handlers.resetEventListener();
    handlers.computerPlay();
  },
  computerPlay: function(row, column){
    if(this.gameBoard[row][column] === ''){
    this.gameBoard[row][column] = 'O';
    render.displayComputerMove();
    handlers.playerPlay();
  }
    else {
      handlers.computerPlay();
    }
  }, 
};


var handlers = {

  playerPlay: function() {
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    var buttonClicked;
    cells.forEach(function(cell){
      if(cell.textContent === '') {
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
      }
    })
  },
  computerPlay: function() {
    var computerChoice = Math.floor(Math.random()*9);
    if(computerChoice < 4) {               // check if first row
      ticTacToe.computerPlay(0, computerChoice - 1);
    }
    else if(computerChoice < 7) {          // check if second row
      ticTacToe.computerPlay(1, computerChoice - 4);
    }
    else if(computerChoice < 10) {         // check if third row
      ticTacToe.computerPlay(2, computerChoice - 7);
    }
  },
  resetEventListener: function() {
    var el = document.querySelectorAll(".square");
    el.forEach(square => {
      let elClone = square.cloneNode(true);
      square.parentNode.replaceChild(elClone, square);
    });
  },
};


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
  displayComputerMove: function() {
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++){
       var temp = ticTacToe.gameBoard[i][j];
       if(temp === "O"){
         if(i < 1) {
           var cell = document.querySelector(`div[value='${j+1}']`);
           cell.textContent = "O";
           cell.classList.add('computer');
          }
         else if(i < 2) {
           var cell = document.querySelector(`div[value='${j+4}']`);
           cell.textContent = "O";
           cell.classList.add('computer');
          }
         else if(i < 3) {
           var cell = document.querySelector(`div[value='${j+7}']`);
           cell.textContent = "O";
           cell.classList.add('computer');
          }
        }
      }
    }
  }
};

  
  (function initial(){
    var buttonPlay = document.querySelector('.play-button');
    buttonPlay.addEventListener('click', function(){
      handlers.playerPlay();
    });
  })();