import { expect } from 'chai';
import detangler from '../src/data-detangler';

describe('Data detangler tests', () => {
  describe('when grouping by collection time', () => {
    it('should have 6 distinct groups when 3 groups each have 2 collections with unique timestamps', () => {
      const someData = [
        {
          group: 'group1',
          collections: [{
            time: 20,
            items: ['item1'],
          }, {
            time: 50,
            items: ['item2'],
          }],
        },
        {
          group: 'group2',
          collections: [{
            time: 30,
            items: ['item3'],
          }, {
            time: 10,
            items: ['item4'],
          }],
        },
        {
          group: 'group3',
          collections: [{
            time: 40,
            items: ['item5'],
          }, {
            time: 20,
            items: ['item6'],
          }],
        },
      ];

      const grouped = detangler.createInstance(someData)
        .groupByCollectionTime()
        .finish();

      expect(grouped)
        .to
        .have
        .length(6);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to
        .equal(6);
    });

    it('should have 6 distinct groups even if there are 3 groups with the same name but each collection has a '
      + 'different timestamp', () => {
      const groupNameOne = 'group1';
      const someData = [
        {
          group: groupNameOne,
          collections: [{
            time: 10,
            items: ['item'],
          }, {
            time: 20,
            items: ['item'],
          }],
        },
        {
          group: groupNameOne,
          collections: [{
            time: 30,
            items: ['item'],
          }, {
            time: 40,
            items: ['item'],
          }],
        },
        {
          group: groupNameOne,
          collections: [{
            time: 50,
            items: ['item'],
          }, {
            time: 60,
            items: ['item'],
          }],
        },
      ];

      const grouped = detangler.createInstance(someData)
        .groupByCollectionTime()
        .finish();

      expect(grouped)
        .to
        .have
        .length(6);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to
        .equal(6);
    });

    it('should have 4 distinct groups and 6 total collections if one group is duplicated with the exact same name '
      + 'and two collections with same time stamps but different contents, and a second group exists with same name '
      + 'but collections with different time stamps', () => {
      const groupNameOne = 'group1';
      const someData = [
        {
          group: groupNameOne,
          collections: [{
            time: 10,
            items: ['item'],
          }, {
            time: 20,
            items: ['item'],
          }],
        },
        {
          group: groupNameOne,
          collections: [{
            time: 30,
            items: ['item'],
          }, {
            time: 40,
            items: ['item'],
          }],
        },
        {
          group: groupNameOne,
          collections: [{
            time: 10,
            items: ['item'],
          }, {
            time: 20,
            items: ['item'],
          }],
        },
      ];

      const grouped = detangler.createInstance(someData)
        .groupByCollectionTime()
        .finish();

      expect(grouped)
        .to
        .have
        .length(4);
      expect(grouped.reduce((count, g) => count + g.collections.length, 0))
        .to
        .equal(6);
    });
  });

  describe('when sorting hero images first', () => {
    it('should sort items tagged "hero" first in each collection\'s item list', () => {
      const groupNameOne = 'group1';
      const someData = [
        {
          group: groupNameOne,
          collections: [
            {
              items: [
                { name: 'a' },
                {
                  name: 'b',
                  tags: ['hero'],
                },
                { name: 'c' },
              ],
            },
          ],
        },
      ];

      const heroified = detangler.createInstance(someData)
        .sortHeroesFirst()
        .finish();
      const heroedItems = heroified[0].collections[0].items;

      expect(heroedItems)
        .to
        .deep
        .equal([
          {
            name: 'b',
            tags: ['hero'],
          },
          { name: 'a' },
          { name: 'c' },
        ]);
    });
  });
});
