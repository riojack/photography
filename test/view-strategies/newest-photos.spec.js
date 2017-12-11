import {expect} from 'chai';
import {sandbox, assert} from 'sinon';
import Chance from 'chance';

import detangler from '../../src/data-detangler';

import NewestPhotosStrategy from '../../src/view-strategies/newest-photos';

describe('Newest photos sort strategy tests', () => {
  let chance,

    groupNameOne,
    listOfGroups,
    countOfItems,

    expectedNewestTime,

    heavierWeight = 20,
    lighterWeight = 15,

    collectionTime,

    strategy,

    sbox;

  beforeEach('set up', () => {
    sbox = sandbox.create();
    chance = new Chance();
    collectionTime = 0;

    countOfItems = 16;
    groupNameOne = chance.word();
    expectedNewestTime = 500;
    listOfGroups = [
      {
        group: groupNameOne,
        collections: [
          {time: 10, items: [chance.word(), chance.word(), chance.word()]},
          {time: 20, items: [chance.word(), chance.word()]}
        ]
      },
      {
        group: chance.word(),
        collections: [
          {time: 30, weight: lighterWeight, items: [chance.word()]},
          {time: 40, items: [chance.word(), chance.word(), chance.word(), chance.word()]}
        ]
      },
      {
        group: groupNameOne,
        collections: [
          {time: 50, weight: heavierWeight, items: [chance.word(), chance.word(), chance.word()]},
          {time: expectedNewestTime, items: [chance.word(), chance.word(), chance.word()]}
        ]
      },
    ];

    sbox.spy(detangler, 'createInstance');

    strategy = new NewestPhotosStrategy(listOfGroups);
  });

  afterEach('tear down', () => {
    sbox.restore();
  });

  describe('when fetching the next n items', () => {
    it('should always return an array', () => {
      let nextSet = strategy.next();

      expect(nextSet).to.be.an('array');
    });

    it('should use detangler.groupByCollectionTime to regroup the data internally, only once', () => {
      assert.notCalled(detangler.createInstance);
      strategy.next();
      assert.calledOnce(detangler.createInstance);
      strategy.next();
      assert.calledOnce(detangler.createInstance);
    });

    it('should return the newest group and group should have one collection with one item if next(1) is called even though the collection has more than one', () => {
      let data = strategy.next(1);

      expect(data).to.have.length(1);

      expect(data[0].collections).to.have.length(1);

      expect(data[0].collections[0].items).to.have.length(1);
    });

    it('should, when fetching with next(3), return the weighted items first followed by the newest items', () => {
      let data = strategy.next(3);

      expect(data[0].collections[0]).to.have.property('weight')
        .that.equals(heavierWeight);
    });

    it('should return two groups, one collection to each group, the collection of the first group should be full and the collection of the second group should be partial', () => {
      let data = strategy.next(4);

      expect(data).to.have.length(2);

      expect(data[1].collections).to.have.length(1);

      expect(data[0].collections[0].items).to.have.length(3);
      expect(data[1].collections[0].items).to.have.length(1);
    });
  });

  describe('when fetching after all items have been fetched', () => {
    it('should simply return all items even if next is call beyond the number of items available', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      let nextSet = strategy.next(countOfItems),
        itemCount = nextSet.reduce((count, gr) => {
          gr.collections.forEach(c => count += c.items.length);
          return count;
        }, 0);

      expect(itemCount).to.equal(countOfItems);
    });
  });

  describe('when resetting', () => {
    it('should reset the items back to zero and progressively rebuild the items when next is called', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      strategy.reset();

      let nextSet = strategy.next(3),
        itemCount = nextSet.reduce((count, gr) => {
          gr.collections.forEach(c => count += c.items.length);
          return count;
        }, 0);

      expect(itemCount).to.equal(3);
    });

    it('should use detangler.groupByCollectionTime to regroup the data internally, only once, even if reset is called', () => {
      assert.notCalled(detangler.createInstance);
      strategy.next(2);
      assert.calledOnce(detangler.createInstance);
      strategy.reset();
      strategy.next(2);
      assert.calledOnce(detangler.createInstance);
    });
  });
});
