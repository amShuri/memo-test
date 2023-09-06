const $gameboard = document.querySelector('#gameboard');
const activeTiles = [];
let turnsPlayed = 0;

$gameboard.onclick = function (e) {
  const $activeTile = e.target;
  if (!$activeTile.classList.contains('hidden-tile')) return;
  handleTileClick($activeTile);
};

function handleTileClick($tile) {
  showTile($tile);
  activeTiles.push($tile);

  if (activeTiles.length == 2) {
    turnsPlayed++;
    disableUserInput();
    compareTiles(activeTiles[0], activeTiles[1]);
    setTimeout(() => {
      resetActiveTiles(activeTiles);
      enableUserInput();
    }, 1500);
  }
}

function showTile($tile) {
  $tile.classList.remove('hidden-tile');
}

function compareTiles($tileOne, $tileTwo) {
  if ($tileOne.className == $tileTwo.className) {
    removeTile($tileOne);
    removeTile($tileTwo);
  } else {
    hideTile($tileOne);
    hideTile($tileTwo);
  }
}

function removeTile($tile) {
  setTimeout(() => {
    $tile.remove();
    handleGameOver();
  }, 1500);
}

function hideTile($tile) {
  setTimeout(() => {
    $tile.classList.add('hidden-tile');
  }, 1500);
}

function resetActiveTiles(tiles) {
  tiles.splice(0);
}

function disableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach(($tile) => ($tile.disabled = true));
}

function enableUserInput() {
  document.querySelectorAll('.hidden-tile').forEach(($tile) => ($tile.disabled = false));
}

function handleGameOver() {
  if (document.querySelectorAll('.tile').length == 0) {
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
