/// <reference types="Cypress" />

const URL = '127.0.0.1:8080';
const AMOUNT_TILES = 12;

context('Memotest', () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  describe('opening the game', () => {
    it('verifies that a gameboard and its tiles exist', () => {
      cy.get('#gameboard').find('.tile').should('have.length', AMOUNT_TILES);
    });

    it('verifies the random placement of tiles on the gameboard', () => {
      let firstTiles = [];
      cy.get('.tile').then((tiles) => {
        tiles.each((i, tile) => firstTiles.push(tile));
      });

      cy.visit(URL);

      let secondTiles = [];
      cy.get('.tile').then((tiles) => {
        tiles.each((i, tile) => secondTiles.push(tile));
      });
      cy.wrap(firstTiles).should('not.deep.equal', secondTiles);
    });
  });

  describe('playing the game', () => {
    let tilePairsMap, tilePairsList;
    beforeEach(() => {
      cy.get('.tile').then((tiles) => {
        tilePairsMap = getTilePairs(tiles);
        tilePairsList = Object.values(tilePairsMap);
      });
    });

    it('works with non-matching tiles', () => {
      cy.get(tilePairsList[0][0]).click();
      cy.get(tilePairsList[3][0]).click();
      cy.get('.tile').should('have.length', 12);
    });

    it('completes the game successfully and shows the gameover message', () => {
      cy.get('.tile').should('have.length', 12);
      tilePairsList.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });
      cy.get('.tile').should('have.length', 0);
      cy.get('#gameboard').should('not.be.visible');
      cy.get('#gameover').should('be.visible');
    });
  });
});

function getTilePairs(tiles) {
  const pairs = {};

  tiles.each((i, tile) => {
    const colorClass = tile.className.replace('tile hidden-tile ', '');

    if (pairs[colorClass]) {
      pairs[colorClass].push(tile);
    } else {
      pairs[colorClass] = [tile];
    }
  });

  return pairs;
}
