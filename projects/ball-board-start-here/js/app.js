const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const TRY = 'NAME'
const GATE = 'GATE';
const GLUEE = '🩹';

const GAMER_IMG = '<img src="img/gamer.png" />';
const BALL_IMG = '<img src="img/ball.png" />';

// THE MODEL:
var gBoard;
var gGamerPos;
var gEmptyCall = [];
var gScore = 0;
var gBallCount = 0;
var gInterval;
var isGlue = false;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBallCount = 0;
	gScore = 0;
	gBoard = buildBoard();
	document.querySelector(".score").innerText = `score: ${gScore}`;
	// console.log(gBoard);
	renderBoard(gBoard);
	gInterval = setInterval(putRandomBall, 5000);
	putGluee();

}

function buildBoard() {
	// Create the Matrix
	// var board = createMat(10, 12)
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			//place hools
			var sizeI = Math.floor((board.length - 1) / 2);
			var sizeJ = Math.floor((board[0].length - 1) / 2);

			if ((i === 0 && j === sizeJ) || (i === sizeI && j === 0)
				|| (i === board.length - 1 && j === sizeJ) || (i === sizeI && j === board[0].length - 1)) {

				cell.type = GATE;
				//console.log(i, j);

			}
			// debugger



			// if (i === 0 && (j === sizeJ)) {
			// 	cell.type = FLOOR;
			// 	console.log(sizeJ);
			// }
			// j === 0 && ((board[0].length - 1 / 2) || i === (board.length - 1 / 2))) {

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	gBallCount += 2;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';
			else if (currCell.type === GATE) cellClass += ' gate';

			//TODO - Change To ES6 template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	var targetCell;

	if (i === -1) {
		i = 9;
	}
	if (i === 10) {
		i = 0;
	}
	if (j === 12) {
		j = 0;
	}
	if (j === -1) {
		j = 11;
	}

	if (!targetCell) {
		var targetCell = gBoard[i][j];
	}

	if (targetCell.type === WALL) return;
	if (targetCell.type === GLUEE) {

	}


	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || targetCell.type === GATE) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			gBallCount--;
			if (gBallCount === 0) {
				gameOver();
			}
			gScore++;
			document.querySelector(".score").innerText = `score: ${gScore}`;
			// console.log(gScore);

		}

		if (targetCell.gameElement === GLUEE) {
			isGlue = true;
			setTimeout(() => {
				isGlue = false;
			}, 3000);
		}


		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

		// else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	if (isGlue) return;
	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

//get random empty cell and put a ball inside
function putRandomBall() {
	var posI = getRandomIntInclusive(1, gBoard.length - 1);
	var posJ = getRandomIntInclusive(1, gBoard[0].length - 1);
	// console.log(posI, posJ);
	var cell = gBoard[posI][posJ];

	if ((cell.type === FLOOR && cell.gameElement === null) || (cell.type === GATE && cell.gameElement === null)) {
		// console.log('lllllllllllllll');
		//js
		gBoard[posI][posJ].gameElement = BALL;
		gBallCount++;
		var position = { i: posI, j: posJ };
		//DOM
		renderCell(position, BALL_IMG);
	}

}

function gameOver() {
	document.querySelector('.game-over').innerText = 'you win!';
	document.querySelector(".score").innerText = `score: ${gScore}`;
	document.querySelector('.start').style.display = 'block';
	clearInterval(gInterval);
}

// function fixTarget(i,j){
// 	if (i === -1) {
// 		i = 9;
// 	}
// 	if (i === 10 ) {
// 		i = 0;
// 	}
// 	if (j === 12) {
// 		j = 0;
// 	}
// 	if ( j === -1) {
// 		j = 11;
// 	}
// }

function putGluee() {
	var count = 0;
	while (count < 2) {
		if (searchCell()) {
			count++;
		}
	}
}

function searchCell() {

	var posI = getRandomIntInclusive(1, gBoard.length - 1);
	var posJ = getRandomIntInclusive(1, gBoard[0].length - 1);
	var cell = gBoard[posI][posJ];

	if ((cell.type === FLOOR && cell.gameElement === null)) {
		//js
		gBoard[posI][posJ].gameElement = GLUEE;
		//dom
		var position = { i: posI, j: posJ };
		renderCell(position, GLUEE);
		return cell;
	}
	return null;

}