import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import newestPhotosStrat from '../../src/view-strategies/newest-photos';

describe('Newest photos sort strategy tests', () => {
  let chance,

    listOfGroups;

  function makeCollectionWithItems() {
    return {
      collection: chance.sentence({words: 5}),
      time: chance.timestamp(),
      items: []
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

    listOfGroups = chance.n(makeGroupWithCollections, chance.integer({min: 3, max: 8}));
  });

  it('should have a static function called "sort"', () => {
    expect(newestPhotosStrat).to.have.property('sort')
      .that.is.a('function');
  });

  it('should return an array that is the same size as the array passed in', function () {
    expect(newestPhotosStrat.sort(listOfGroups)).to.be.an('array')
      .with.length(listOfGroups.length);
  });

  it('should sort list of collections descending by time for each group', () => {
    let sorted = newestPhotosStrat.sort(listOfGroups);

    sorted.forEach(g => {
      g.collections.forEach((c, ci) => {
        if (ci !== 0) {
          let lastColl = g.collections[ci - 1];

          expect(c.time).to.be.at.most(lastColl.time);
        }
      });
    });
  });

  it('should sort the groups descending by the time of the most recent collection of the group', () => {
    let sorted = newestPhotosStrat.sort(listOfGroups);

    sorted.forEach((g, gi) => {
      if (gi !== 0) {
        let lastGroup = sorted[gi - 1];

        expect(g.collections[0].time).to.be.at.most(lastGroup.collections[0].time);
      }
    });
  });
});
