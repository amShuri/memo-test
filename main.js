const $gameboard = document.querySelector('#gameboard');
const gameTiles = [];
let clickedTiles = 0;
let turnsPlayed = 0;

$gameboard.onclick = function (e) {
  handleTileClick(e);
};

function handleTileClick(e) {
  if (e.target.tagName != 'BUTTON' || gameTiles.includes(e.target)) return;
  showTile(e.target);
  gameTiles.push(e.target);
  clickedTiles++;

  if (clickedTiles == 2) {
    turnsPlayed += 1;
    disableUserInput();
    compareTiles(gameTiles[0], gameTiles[1]);
    setTimeout(() => {
      resetTileSelection(gameTiles);
      checkGameStatus();
      enableUserInput();
      clickedTiles = 0;
    }, 1500);
  }
}

function showTile(tile) {
  tile.classList.remove('hidden-tile');
}

function compareTiles(tileOne, tileTwo) {
  if (tileOne.className == tileTwo.className) {
    removeTile(tileOne);
    removeTile(tileTwo);
  } else {
    hideTile(tileOne);
    hideTile(tileTwo);
  }
}

function removeTile(tile) {
  setTimeout(() => {
    tile.remove();
  }, 1500);
}

function hideTile(tile) {
  setTimeout(() => {
    tile.classList.add('hidden-tile');
  }, 1500);
}

function resetTileSelection(tiles) {
  tiles.splice(0);
}

function disableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach((tile) => (tile.disabled = true));
}

function enableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach((tile) => (tile.disabled = false));
}

function checkGameStatus() {
  const $tiles = document.querySelectorAll('.tile');
  if ($tiles.length == 0) {
    const $gameoverMsg = document.querySelector('#gameover');
    $gameoverMsg.querySelector('span').textContent = turnsPlayed;
    $gameoverMsg.classList.remove('d-none');
    $gameboard.classList.add('d-none');
  }
}

function generateTiles() {
  const pairOfTiles = 6;
  const uniqueColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red'];
  const duplicatedColors = [...uniqueColors, ...uniqueColors];
  shuffleColors(duplicatedColors);

  for (let i = 0; i < pairOfTiles * 2; i += 1) {
    const $tileWrapper = document.createElement('div');
    const $tile = document.createElement('button');

    $tileWrapper.classList.add('tile-wrapper');
    $tile.classList.add('tile', 'hidden-tile', duplicatedColors[i]);

    $gameboard.appendChild($tileWrapper);
    $tileWrapper.appendChild($tile);
  }
}

function shuffleColors(colors) {
  for (let i = 0; i < colors.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const tempIndex = colors[i];
    colors[i] = colors[randomIndex];
    colors[randomIndex] = tempIndex;
  }
}

generateTiles();
