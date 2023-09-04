const $gameboard = document.querySelector('#gameboard');
const gameTiles = [];

$gameboard.onclick = function (e) {
  handleTileClick(e);
  if (gameTiles.length == 2) {
    disableUserInput();
    handleTilePair(gameTiles[0], gameTiles[1]);
    setTimeout(() => {
      resetTileSelection(gameTiles);
      enableUserInput();
    }, 1000);
  }
};

function handleTileClick(e) {
  if (e.target.tagName != 'BUTTON' || gameTiles.includes(e.target)) return;
  showTile(e.target);
  gameTiles.push(e.target);
}

function showTile(tile) {
  tile.classList.remove('hidden-tile');
}

function handleTilePair(tileOne, tileTwo) {
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
    tile.classList.add('matched-tile');
  }, 1000);
}

function hideTile(tile) {
  setTimeout(() => {
    tile.classList.add('hidden-tile');
  }, 1000);
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

function generateTiles() {
  const pairOfTiles = 6;
  const uniqueTileColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red'];
  const duplicatedTileColors = [...uniqueTileColors, ...uniqueTileColors];
  shuffleTileColors(duplicatedTileColors);

  for (let i = 0; i < pairOfTiles * 2; i += 1) {
    const $tileWrapper = document.createElement('div');
    const $tile = document.createElement('button');

    $tileWrapper.classList.add('col', 'tile');
    $tile.classList.add('hidden-tile', duplicatedTileColors[i]);

    $gameboard.appendChild($tileWrapper);
    $tileWrapper.appendChild($tile);
  }
}

function shuffleTileColors(tileColors) {
  for (let i = 0; i < tileColors.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const tempIndex = tileColors[i];
    tileColors[i] = tileColors[randomIndex];
    tileColors[randomIndex] = tempIndex;
  }
}

generateTiles();
