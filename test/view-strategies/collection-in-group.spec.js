import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import GroupInCollectionStrategy from '../../src/view-strategies/collection-in-group';

function pickRandomGroupAndCollection(listOfGroups, chance) {
  let randomGroup = chance.pickone(listOfGroups);
  return [randomGroup, chance.pickone(randomGroup.collections)];
}

describe('Group in a collection sort strategy tests', () => {
  let chance,
    listOfGroups,
    expectedGroup,
    expectedCollection;

  beforeEach('set up', () => {
    chance = new Chance();
    listOfGroups = [
      {
        group: 'group-one',
        collections: chance.n(() => ({collection: chance.sentence()}), chance.integer({min: 3, max: 7}))
      },
      {
        group: 'group-two',
        collections: chance.n(() => ({collection: chance.sentence()}), chance.integer({min: 3, max: 7}))
      },
      {
        group: 'group-three',
        collections: chance.n(() => ({collection: chance.sentence()}), chance.integer({min: 3, max: 7}))
      },
    ];

    [expectedGroup, expectedCollection] = pickRandomGroupAndCollection(listOfGroups, chance);
  });

  describe('when calling next()', () => {
    it('should return the group containing only the collection that matches', () => {
      let strategy = new GroupInCollectionStrategy(listOfGroups, expectedCollection.collection),
        expectedExpectedGroup = Object.assign({}, expectedGroup, {collections: [expectedCollection]}),
        group = strategy.next();

      expect(group).to.eql([expectedExpectedGroup]);
    });

    it('should return an empty array if no matching collection was found among all collections in all groups', () => {
      let strategy = new GroupInCollectionStrategy(listOfGroups, chance.string()),
        group = strategy.next();

      expect(group).to.eql([]);
    });

    it('should return an empty array if there are no groups', () => {
      let strategy = new GroupInCollectionStrategy([], 'dont care'),
        group = strategy.next();

      expect(group).to.eql([]);
    });

  });
});
