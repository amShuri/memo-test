const $gameboard = document.querySelector('#gameboard');
const gameTiles = [];

$gameboard.onclick = function (e) {
  handleUserTileClick(e);

  if (gameTiles.length == 2) {
    disableUserInput();
    handleTilePair(gameTiles[0], gameTiles[1]);
    setTimeout(() => {
      enableUserInput();
      gameTiles.splice(0);
    }, 1000);
  }
};

function handleUserTileClick(e) {
  if (e.target.tagName != 'BUTTON' || e.target == gameTiles[0]) return;
  e.target.classList.remove('hidden-tile');
  gameTiles.push(e.target);
}

function handleTilePair(tileOne, tileTwo) {
  if (tileOne.className == tileTwo.className) {
    setTimeout(() => {
      tileOne.classList.add('matched-tile');
      tileTwo.classList.add('matched-tile');
    }, 1000);
  } else {
    setTimeout(() => {
      tileOne.classList.add('hidden-tile');
      tileTwo.classList.add('hidden-tile');
    }, 1000);
  }
}

function disableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach((tile) => (tile.disabled = true));
}

function enableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach((tile) => (tile.disabled = false));
}

function generateTiles() {
  const pairOfTiles = 6;
  const tileColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red'];
  const tempArray = [...tileColors, ...tileColors];
  shuffleArray(tempArray);

  for (let i = 0; i < pairOfTiles * 2; i += 1) {
    const $tileWrapper = document.createElement('div');
    const $tile = document.createElement('button');

    $tileWrapper.classList.add('col', 'tile');
    $tile.classList.add('hidden-tile', tempArray[i]);

    $gameboard.appendChild($tileWrapper);
    $tileWrapper.appendChild($tile);
  }
}

function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const tempIndex = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempIndex;
  }
}

generateTiles();
