const PACMAN = '&#9786;';

var gPacman;
var gInterval;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gFoodCount--;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  if (gEmptySpot.length > 0) {
    if (!gInterval) {
      gInterval = setInterval(putCherry, 15000);
    }
  }
  // console.log('eventKeyboard:', eventKeyboard);
  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gEmptySpot.push({
      i: gPacman.location.i,
      j: gPacman.location.j
    });
    console.log(gEmptySpot);
    updateScore(1);
    gFoodCount--;
    console.log(gFoodCount);

    if (gFoodCount === 0) {
      winner();
    }
  }
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      //CR: its ok to do actions on ghosts inside pacman file but its more right to call a
      // function here like: removeGhost(nextLocation) and this function will be inside ghost file.
      removeGhost(nextLocation);
    } else {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }
  else if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    superFood();
  }
  else if (nextCell === CHERRY) {
    updateScore(10);
  }


  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function superFood() {
  //CR: here i would write a function that will be in the ghost file.
  changeGhostColor('yellow');
  gPacman.isSuper = true;
  setTimeout(unSuper, 5000);
}

function unSuper() {
  console.log('un super');
  
  //CR: here i would wright a function that will be in the ghost file.
  // var color = getRandomColor();
  changeGhostColor();
  gPacman.isSuper = false;
}



