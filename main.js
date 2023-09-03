const $gameboard = document.querySelector('#gameboard');

function generateTiles() {
  const pairOfTiles = 6;
  const tileColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red'];

  for (let i = 0; i < pairOfTiles * 2; i += 1) {
    const $tileWrapper = document.createElement('div');
    const $tile = document.createElement('button');

    $tileWrapper.classList.add('col', 'tile');
    $tile.classList.add(tileColors[i % tileColors.length]);

    $gameboard.appendChild($tileWrapper);
    $tileWrapper.appendChild($tile);
  }
}

generateTiles();
