"use strict"

var ticTacToe = {
  gameBoard: [['','',''],
              ['','',''],
              ['','','']],
  
  playerPlay: function(row, column) {
    var title = document.querySelector('.main-title'); 
    var buttonPlay = document.querySelector('.play-button');
    if(title.classList.contains('endgame')){
      buttonPlay.textContent = 'Play Again?'
      buttonPlay.style.visibility = 'visible';
      return;
    }
    this.gameBoard[row][column] = 'X';
    render.displayPlayerMove();
    handlers.resetEventListener();
    handlers.checkWinner();
    handlers.computerPlay();
  },
  computerPlay: function(row, column){
    var title = document.querySelector('.main-title'); 
    var buttonPlay = document.querySelector('.play-button');
    if(title.classList.contains('endgame')) {
      buttonPlay.textContent = 'Play Again?'
      buttonPlay.style.visibility = 'visible';
      return;
    }
    if(this.gameBoard[row][column] === ''){
    this.gameBoard[row][column] = 'O';
    render.displayComputerMove();
    handlers.checkWinner();
    handlers.playerPlay();
  }
    else {
      handlers.computerPlay();
    }
  }, 
};


var handlers = {

  playerPlay: function() {
    var title = document.querySelector('.main-title'); 
    if(title.classList.contains('endgame')){
      ticTacToe.gameBoard = [['','',''],
                             ['','',''],
                             ['','','']]  
      render.refresh();
      title.classList.remove('endgame');
    }
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    cells.forEach(function(cell){
      if(cell.textContent === '') {
        cell.addEventListener('click', function(e){
          var buttonClicked = e.target.getAttribute('value');
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
  checkWinner: function() {

    var board = ticTacToe.gameBoard;
    for (var r = 0; r < 3; r++) {         //checking same column different row conditions
      if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ''){
        var winner = board[r][0];
        render.displayWinner(winner);
      }
    }
    for (var c = 0; c < 3; c++) {         //checking same row different column conditions
      if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != '' ) {
        var winner = board[0][c];
        render.displayWinner(winner);
      }
    }
    //checking diagonal conditions
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ''){
      var winner = board[0][2];
      render.displayWinner(winner);
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
      var winner = board[0][0];
      render.displayWinner(winner);
    }
    //checking tie condition
    else{
      for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
          if(board[i][j] === ''){
            return;
          }
        }
      }
      var winner = 'tie';
      render.displayWinner(winner)
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
       if(temp === "X"){
         if(i < 1) {
           var cell = document.querySelector(`div[value='${j+1}']`);
           cell.textContent = "X";
           cell.classList.add('player');
          }
         else if(i < 2) {
           var cell = document.querySelector(`div[value='${j+4}']`);
           cell.textContent = "X";
           cell.classList.add('player');
          }
         else if(i < 3) {
           var cell = document.querySelector(`div[value='${j+7}']`);
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
  },
  displayWinner: function(winner) {
    var title = document.querySelector('.main-title');
    if(winner === 'X'){
      title.textContent = "YOU WIN!"
      title.classList.add('blink-me', 'endgame');
    }
    if(winner === 'O'){
      title.textContent = "YOU LOSE!"
      title.classList.add('blink-me', 'endgame');
    }
    if(winner === 'tie'){
      title.textContent = "GAME IS TIE!"
      title.classList.add('blink-me', 'endgame');
    }
  },
  refresh: function() {
    var title = document.querySelector('.main-title');
    title.classList.remove('blink-me');
    title.textContent = 'TIC TAC TOE';
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    cells.forEach(function(cell){
      cell.textContent = '';
      cell.classList.remove('computer', 'player');
    })
  }
};

  
  (function initial(){
    var buttonPlay = document.querySelector('.play-button');
    buttonPlay.addEventListener('click', function(){
      handlers.playerPlay();
      buttonPlay.style.visibility = 'hidden';
    });
  })();