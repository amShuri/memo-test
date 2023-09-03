const $gameboard = document.querySelector('#gameboard');

function generateTiles() {
  const pairOfTiles = 6;
  const tileColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red'];
  const tempArray = [...tileColors, ...tileColors];
  shuffleArray(tempArray);

  for (let i = 0; i < pairOfTiles * 2; i += 1) {
    const $tileWrapper = document.createElement('div');
    const $tile = document.createElement('button');

    $tileWrapper.classList.add('col', 'tile');
    $tile.classList.add(tempArray[i]);

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
