import { expect } from 'chai';

import ByCollectionStrategy from '../../src/view-strategies/by-collection';

describe('ByCollectionStrategy tests', () => {
  const GROUP_1 = { group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] };
  const GROUP_2 = {
    group: 'Group 2', collections: [
      { collection: 'G2 Collection 1', items: [] },
      { collection: 'G2 Collection 2', items: [] },
      { collection: 'G2 Collection 3', items: [] }
    ]
  };

  const GROUPS = [GROUP_1, GROUP_2];

  it('should return collections one at a time for each call to next()', () => {
    const strat = new ByCollectionStrategy(GROUPS);

    expect(strat.next())
      .to.eql([{ group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] }]);

    expect(strat.next())
      .to.eql([
        { group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] },
        { group: 'Group 2', collections: [{ collection: 'G2 Collection 1', items: [] }] }
      ]);

    expect(strat.next())
      .to.eql([
        { group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] },
        {
          group: 'Group 2', collections: [
            { collection: 'G2 Collection 1', items: [] },
            { collection: 'G2 Collection 2', items: [] }
          ]
        }
      ]);

    expect(strat.next())
      .to.eql([
        { group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] },
        {
          group: 'Group 2', collections: [
            { collection: 'G2 Collection 1', items: [] },
            { collection: 'G2 Collection 2', items: [] },
            { collection: 'G2 Collection 3', items: [] },
          ]
        }
      ]);
  });

  it('should return all groups if next is called again after returning all collections already', () => {
    const strat = new ByCollectionStrategy(GROUPS);

    strat.next();
    strat.next();
    strat.next();
    strat.next();
    strat.next();
    strat.next();
    strat.next();
    strat.next();

    expect(strat.next())
      .to.eql([
        { group: 'Group 1', collections: [{ collection: 'G1 Collection 1', items: [] }] },
        {
          group: 'Group 2', collections: [
            { collection: 'G2 Collection 1', items: [] },
            { collection: 'G2 Collection 2', items: [] },
            { collection: 'G2 Collection 3', items: [] },
          ]
        }
      ]);
  });
});
