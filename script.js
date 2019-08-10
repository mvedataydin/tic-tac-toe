"use strict";

(function initial(){
  var buttonPlay = document.querySelector('.play-button');
  buttonPlay.addEventListener('click', function(){
    var title = document.querySelector('.main-title'); 
    if(title.classList.contains('endgame')){
      ticTacToe.gameBoard = [['','',''],
                             ['','',''],
                             ['','','']]  
      render.refresh();
      handlers.resetEventListener();
      title.classList.remove('endgame');
    }
    handlers.playerPlay();
    buttonPlay.style.visibility = 'hidden';
  });
})();

var ticTacToe = {
  gameBoard: [['','',''],
              ['','',''],
              ['','','']],
  
  playerPlay: function(row, column) {
    var title = document.querySelector('.main-title'); 
    if(title.classList.contains('endgame')) return;
    this.gameBoard[row][column] = 'X';
    render.displayPlayerMove();
    handlers.resetEventListener();
    if(handlers.checkWinner(ticTacToe.gameBoard)){render.displayWinner(handlers.checkWinner(ticTacToe.gameBoard));}
    handlers.computerPlay();
  },
  computerPlay: function(row, column){
    var title = document.querySelector('.main-title'); 
    if(title.classList.contains('endgame')) return;
    this.gameBoard[row][column] = 'O';
    render.displayComputerMove();
    if(handlers.checkWinner(ticTacToe.gameBoard)){render.displayWinner(handlers.checkWinner(ticTacToe.gameBoard));}
    handlers.playerPlay();
  }, 
};


var handlers = {

  playerPlay: function() {
    var square = document.getElementsByClassName('square');
    var cells = Array.prototype.slice.call(square);
    cells.forEach(function(cell){
      if(cell.textContent === '') {
        cell.addEventListener('click', function(e){
          var buttonClicked = e.target.getAttribute('value');
          if(buttonClicked < 4) {               // check if first row
            ticTacToe.playerPlay(0, buttonClicked - 1);
            return;
          }
          if(buttonClicked < 7) {          // check if second row
            ticTacToe.playerPlay(1, buttonClicked - 4);
            return;
          }
          if(buttonClicked < 10) {         // check if third row
            ticTacToe.playerPlay(2, buttonClicked - 7);
            return;
          }
        })
      }
    })
  },
  computerPlay: function() {
    var best = handlers.minimax(ticTacToe.gameBoard, 'O').index;
    if(best < 4) {
      ticTacToe.computerPlay(0, best - 1);
    }
    if(best >= 4 && best < 7) {
      ticTacToe.computerPlay(1, best - 4);
    }
    if(best >= 7 && best < 10) {
      ticTacToe.computerPlay(2, best - 7);
    }
  },
  minimax: function(newBoard, player) {
    var availCells = handlers.emptyCells(newBoard)

    //simulate human wins
    if (handlers.checkWinner(newBoard) === 'X') {
      return {score: -10};
    } 
    //simulate AI wins
    else if (handlers.checkWinner(newBoard) === 'O') {
      return {score: 10};
    } 
    //simulate tie
    else if (availCells.length === 0) {
      return {score: 0};
    }
    
    var moves = [];
    for (var i = 0; i < availCells.length; i++) {
      var move = {};
      var row;
      var column;
      if(availCells[i] < 4) {
        move.index = availCells[i];
        newBoard[0][availCells[i]-1] = player;
        row = 0;
        column = availCells[i]-1;
      }
      if(availCells[i] >= 4 && availCells[i] < 7) {
        move.index = availCells[i];
        newBoard[1][availCells[i]-4] = player;
        row = 1;
        column = availCells[i]-4;
      }
      if(availCells[i] >= 7 && availCells[i] < 10) {
        move.index = availCells[i];
        newBoard[2][availCells[i]-7] = player;
        row = 2;
        column = availCells[i]-7;
      }
  
      if (player === 'O') {
        var result = handlers.minimax(newBoard, 'X');
        move.score = result.score;
        
      } else {
        var result = handlers.minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[row][column] = '';
      moves.push(move);
    }
  
    var bestMove;
    if(player === 'O') {
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  },
  emptyCells: function(newBoard) {
    // convert empty cells on game board to single array
    var availSpots = [];
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j ++){
        if(i < 1) {
          if(newBoard[i][j] === '') {availSpots.push(j+1)}
         }
        else if(i < 2) {
          if(newBoard[i][j] === '') {availSpots.push(j+4)}
         }
        else if(i < 3) {
          if(newBoard[i][j] === '') {availSpots.push(j+7)}
         }
      }
    }
    return availSpots;
  },
  checkWinner: function(board) {
    var winner = '';
    var board = ticTacToe.gameBoard;
    for (var r = 0; r < 3; r++) {         //checking same column different row conditions
      if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ''){
        var winner = board[r][0];
        return winner;
      }
    }
    for (var c = 0; c < 3; c++) {         //checking same row different column conditions
      if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != '' ) {
        var winner = board[0][c];
        return winner;
      }
    }
    //checking diagonal conditions
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ''){
      var winner = board[0][2];
      return winner;
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
      var winner = board[0][0];
      return winner;
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
      return winner;
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
    var buttonPlay = document.querySelector('.play-button');
    if(winner === 'X'){
      title.textContent = "YOU WIN!"
      title.classList.add('blink-me', 'endgame');
      buttonPlay.textContent = 'Play Again?'
      buttonPlay.style.visibility = 'visible';
    }
    if(winner === 'O'){
      title.textContent = "YOU LOSE!"
      title.classList.add('blink-me', 'endgame');
      buttonPlay.textContent = 'Play Again?'
      buttonPlay.style.visibility = 'visible';
    }
    if(winner === 'tie'){
      title.textContent = "GAME IS TIE!"
      title.classList.add('blink-me', 'endgame');
      buttonPlay.textContent = 'Play Again?'
      buttonPlay.style.visibility = 'visible';
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
}