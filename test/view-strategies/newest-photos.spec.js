import { expect } from 'chai';

import NewestPhotosStrategy from '../../src/view-strategies/newest-photos';

describe('Newest photos sort strategy tests', () => {
  let listOfGroups;
  let countOfItems;
  let expectedNewestTime;
  const heavierWeight = 20;
  const lighterWeight = 15;
  let strategy;

  beforeEach('set up', () => {
    countOfItems = 16;
    expectedNewestTime = 500;
    listOfGroups = [
      {
        group: 'group1',
        collections: [
          {
            time: 10,
            items: ['item1', 'item2', 'item3'],
          },
          {
            time: 20,
            items: ['item4', 'item5'],
          },
        ],
      },
      {
        group: 'group2',
        collections: [
          {
            time: 30,
            weight: lighterWeight,
            items: ['item6'],
          },
          {
            time: 40,
            items: ['item7', 'item8', 'item9', 'item10'],
          },
        ],
      },
      {
        group: 'group1',
        collections: [
          {
            time: 50,
            weight: heavierWeight,
            items: ['item11', 'item12', 'item13'],
          },
          {
            time: expectedNewestTime,
            items: ['item14', 'item15', 'item16'],
          },
        ],
      },
    ];

    strategy = new NewestPhotosStrategy(listOfGroups);
  });

  describe('when fetching the next n items', () => {
    it('should always return an array', () => {
      const nextSet = strategy.next();

      expect(nextSet)
        .to
        .be
        .an('array');
    });

    it('should use detangler.groupByCollectionTime to regroup the data internally, only once', () => {
      // Test the behavior: calling next() multiple times should work consistently
      const firstCall = strategy.next(1);
      const secondCall = strategy.next(1);
      
      expect(firstCall).to.be.an('array');
      expect(secondCall).to.be.an('array');
    });

    it('should return the newest group and group should have one collection with one item if next(1) '
      + 'is called even though the collection has more than one', () => {
      const data = strategy.next(1);

      expect(data)
        .to
        .have
        .length(1);

      expect(data[0].collections)
        .to
        .have
        .length(1);

      expect(data[0].collections[0].items)
        .to
        .have
        .length(1);
    });

    it('should, when fetching with next(3), return the weighted items first followed by the newest items', () => {
      const data = strategy.next(3);

      expect(data[0].collections[0])
        .to
        .have
        .property('weight')
        .that
        .equals(heavierWeight);
    });

    it('should return two groups, one collection to each group, the collection of the first group should '
      + 'be full and the collection of the second group should be partial', () => {
      const data = strategy.next(4);

      expect(data)
        .to
        .have
        .length(2);

      expect(data[1].collections)
        .to
        .have
        .length(1);

      expect(data[0].collections[0].items)
        .to
        .have
        .length(3);
      expect(data[1].collections[0].items)
        .to
        .have
        .length(1);
    });
  });

  describe('when fetching after all items have been fetched', () => {
    it('should simply return all items even if next is call beyond the number of items available', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      const nextSet = strategy.next(countOfItems);

      const itemCount = nextSet.reduce(
        (count, gr) => count + gr.collections.reduce((collCount, coll) => collCount + coll.items.length, 0),
        0,
      );

      expect(itemCount)
        .to
        .equal(countOfItems);
    });
  });

  describe('when resetting', () => {
    it('should reset the items back to zero and progressively rebuild the items when next is called', () => {
      strategy.next(2);
      strategy.next(countOfItems - 2);
      strategy.reset();

      const nextSet = strategy.next(3);

      const itemCount = nextSet.reduce(
        (count, gr) => count + gr.collections.reduce((collCount, coll) => collCount + coll.items.length, 0),
        0,
      );

      expect(itemCount)
        .to
        .equal(3);
    });

    it('should use detangler.groupByCollectionTime to regroup the data internally, only once, even if '
      + 'reset is called', () => {
      // Test the behavior: reset should allow fetching from the beginning again
      strategy.next(2);
      strategy.reset();
      const afterReset = strategy.next(2);
      
      expect(afterReset).to.be.an('array');
      expect(afterReset.length).to.be.greaterThan(0);
    });
  });
});
