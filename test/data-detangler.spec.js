import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import detangler from '../src/data-detangler';

describe(' tests', () => {
  let chance;

  beforeEach('set up', () => {
    chance = new Chance();
  });

  describe('when grouping by collection time', () => {
    it('should have a function named groupByCollectionTime', () => {
      expect(detangler.groupByCollectionTime).to.be.a('function');
    });

    it('should have 6 distinct groups when 3 groups each have 2 collections with unique timestamps', () => {
      let groupNameOne = chance.word(),
        groupNameTwo = chance.word(),
        groupNameThree = chance.word(),
        someData = [
          {group: groupNameOne, collections: [{time: 20, items: [chance.word()]}, {time: 50, items: [chance.word()]}]},
          {group: groupNameTwo, collections: [{time: 30, items: [chance.word()]}, {time: 10, items: [chance.word()]}]},
          {group: groupNameThree, collections: [{time: 40, items: [chance.word()]}, {time: 20, items: [chance.word()]}]}
        ],

        grouped = detangler.groupByCollectionTime(someData);

      expect(grouped).to.have.length(6);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to.equal(6);
    });

    it('should have 6 distinct groups even if there are 3 groups with the same name but each collection has a different timestamp', () => {
      let groupNameOne = chance.word(),
        someData = [
          {group: groupNameOne, collections: [{time: 10, items: [chance.word()]}, {time: 20, items: [chance.word()]}]},
          {group: groupNameOne, collections: [{time: 30, items: [chance.word()]}, {time: 40, items: [chance.word()]}]},
          {group: groupNameOne, collections: [{time: 50, items: [chance.word()]}, {time: 60, items: [chance.word()]}]},
        ],

        grouped = detangler.groupByCollectionTime(someData);

      expect(grouped).to.have.length(6);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to.equal(6);
    });

    it('should have 4 distinct groups and 6 total collections if one group is duplicated with the exact same name and two collections with same time stamps but different contents, and a second group exists with same name but collections with different time stamps', () => {
      let groupNameOne = chance.word(),
        someData = [
          {group: groupNameOne, collections: [{time: 10, items: [chance.word()]}, {time: 20, items: [chance.word()]}]},
          {group: groupNameOne, collections: [{time: 30, items: [chance.word()]}, {time: 40, items: [chance.word()]}]},
          {group: groupNameOne, collections: [{time: 10, items: [chance.word()]}, {time: 20, items: [chance.word()]}]},
        ],

        grouped = detangler.groupByCollectionTime(someData);

      expect(grouped).to.have.length(4);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to.equal(6);
    });
  });
});
