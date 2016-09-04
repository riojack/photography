import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import NewestPhotosStrategy from '../../src/view-strategies/newest-photos';

describe('Newest photos sort strategy tests', () => {
  let chance,

    listOfGroups,
    sortedCollections,
    countOfItems,

    collectionTime,

    strategy;

  function makeCollectionWithItems() {
    return {
      collection: chance.sentence({words: 5}),
      time: collectionTime++,
      items: [
        {image: chance.string()},
        {image: chance.string()},
        {image: chance.string()}
      ]
    };
  }

  function makeGroupWithCollections() {
    return {
      group: chance.sentence({words: 3}),
      collections: chance.n(makeCollectionWithItems, chance.integer({min: 3, max: 8}))
    }
  }

  beforeEach('set up', () => {
    chance = new Chance();
    collectionTime = 0;

    listOfGroups = chance.n(makeGroupWithCollections, chance.integer({min: 3, max: 8}));

    sortedCollections = listOfGroups.reduce((pv, cv) => {
      cv.collections.forEach(c => pv.push(c));
      return pv;
    }, []).sort((a, b) => b.time - a.time);

    countOfItems = sortedCollections.reduce((pv, cv) => pv + cv.items.length, 0);

    strategy = new NewestPhotosStrategy(listOfGroups);
  });

  describe('when fetching the next n items', () => {
    it('should always return an array with a single group', () => {
      let nextSet = strategy.next();

      expect(nextSet).to.be.an('array')
        .that.has.length(1);
    });

    it('should fetch items sorted correctly', () => {
      let nextSet = strategy.next(3)[0].collections[0].items;

      expect(nextSet).to.have.length(3);
      expect(nextSet).to.eql(sortedCollections[0].items);
    });

    it('should return next 3 after fetching the first 3', () => {
      strategy.next(3);
      let nextSet = strategy.next(3)[0].collections[0].items,
        expectedItems = sortedCollections[0].items.concat(sortedCollections[1].items);

      expect(nextSet).to.have.length(6);
      expect(nextSet).to.eql(expectedItems);
    });
  });

  describe('when fetching after all items have been fetched', () => {
    it('should simply return all items even if next is call beyond the number of items available', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      let nextSet = strategy.next(countOfItems),
        itemCount = nextSet[0].collections.reduce((pv, cv) => pv + cv.items.length, 0);

      expect(itemCount).to.equal(countOfItems);
    });
  });

  describe('when resetting', () => {
    it('should reset the items back to zero and progressively rebuild the items when next is called', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      strategy.reset();
      let nextSet = strategy.next(3)[0].collections[0].items;

      expect(nextSet).to.have.length(3);
      expect(nextSet).to.eql(sortedCollections[0].items);
    });
  });

  describe('when weighting itself relative to other strategies', () => {
    const expectedWeight = 1000;

    it(`should give itself a weight of ${expectedWeight}`, () => {
      expect(strategy.weight()).to.equal(expectedWeight);
    });
  });
});
