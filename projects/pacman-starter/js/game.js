'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '*';
const CHERRY = '🍒';

var gBoard;
var gFoodCount = 0;
var gEmptySpot = [];

var gGame = {
  score: 0,
  isOn: false
};

function init() {
  //CR: I dont need to save this in a variable. like this:
  // document.querySelector('.modal').style.display = 'none';
  var elStart = document.querySelector('.modal').style.display = 'none';
  var elWinner = document.querySelector('.winner').style.display = 'none';

  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gFoodCount--;
      }
    }
  }
  board[1][1] = SUPER_FOOD;
  board[1][SIZE - 2] = SUPER_FOOD;
  board[SIZE - 2][1] = SUPER_FOOD;
  board[SIZE - 2][SIZE - 2] = SUPER_FOOD;
  gFoodCount -= 4;

  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;

}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  //CR: also here i dont need to save this in a variable like this:
  // document.querySelector('.modal').style.display = 'block';
  var elStart = document.querySelector('.modal').style.display = 'block';
  gFoodCount = 0;
  gGame.score = 0;
  clearInterval(gInterval);
}


// function play() {
//   ///CR: I could just call the function init in the html when im clicking restart like onload.
//   init();
// }

function winner() {
  gameOver();
  var elWinner = document.querySelector('.winner').style.display = 'block';
}

function putCherry() {
  gFoodCount--;
  var index = getRandomIntInclusive(0, gEmptySpot.length - 1);
  gBoard[gEmptySpot[index].i][gEmptySpot[index].j] = CHERRY;
  renderCell(gEmptySpot[index], CHERRY);
}


