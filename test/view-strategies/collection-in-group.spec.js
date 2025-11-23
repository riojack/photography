import { expect } from 'chai';
import GroupInCollectionStrategy from '../../src/view-strategies/collection-in-group';

describe('Group in a collection sort strategy tests', () => {
  let listOfGroups;
  let expectedGroup;
  let expectedCollection;

  beforeEach('set up', () => {
    listOfGroups = [
      {
        group: 'group-one',
        collections: [
          { collection: 'collection A' },
          { collection: 'collection B' },
          { collection: 'collection C' },
        ],
      },
      {
        group: 'group-two',
        collections: [
          { collection: 'collection D' },
          { collection: 'collection E' },
          { collection: 'collection F' },
        ],
      },
      {
        group: 'group-three',
        collections: [
          { collection: 'collection G' },
          { collection: 'collection H' },
          { collection: 'collection I' },
        ],
      },
    ];

    expectedGroup = listOfGroups[0];
    expectedCollection = expectedGroup.collections[1]; // collection B
  });

  describe('when calling next()', () => {
    it('should return the group containing only the collection that matches', () => {
      const strategy = new GroupInCollectionStrategy(listOfGroups, expectedCollection.collection);
      const expectedInnerGroup = { ...expectedGroup, collections: [expectedCollection] };
      const group = strategy.next();

      expect(group).to.eql([expectedInnerGroup]);
    });

    it('should return an empty array if no matching collection was found among all collections in all groups', () => {
      const strategy = new GroupInCollectionStrategy(listOfGroups, 'non-existent-collection');
      const group = strategy.next();

      expect(group).to.eql([]);
    });

    it('should return an empty array if there are no groups', () => {
      const strategy = new GroupInCollectionStrategy([], 'dont care');
      const group = strategy.next();

      expect(group).to.eql([]);
    });
  });
});
