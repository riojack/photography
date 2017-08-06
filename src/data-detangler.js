function doGroupingByCollectionTime(data) {
  let byGroupAndTime = data.reduce((accumulator, g) => {
    let groupName = g.group;

    g.collections.forEach(c => {
      let time = c.time,
        compKey = groupName + '-' + time;

      if (!accumulator[compKey]) {
        accumulator[compKey] = {
          group: groupName,
          collections: []
        };
      }

      accumulator[compKey].collections.push(c);
    });

    return accumulator;

  }, {});

  return Object.keys(byGroupAndTime)
    .map(k => byGroupAndTime[k]);
}

class Detangler {

  constructor(data) {
    this.data = data;
  }

  groupByCollectionTime() {
    let byGroupAndTime = this.data.reduce((accumulator, g) => {
      let groupName = g.group;

      g.collections.forEach(c => {
        let time = c.time,
          compKey = groupName + '-' + time;

        if (!accumulator[compKey]) {
          accumulator[compKey] = {
            group: groupName,
            collections: []
          };
        }

        accumulator[compKey].collections.push(c);
      });

      return accumulator;

    }, {});

    let detangledData = Object.keys(byGroupAndTime)
      .map(k => byGroupAndTime[k]);

    return new Detangler(detangledData);
  }

  sortHeroesFirst() {
    this.data.forEach(g => {

      g.collections.forEach(c => {

        let {heroes, nonHeroes} = c.items.reduce((sorters, item) => {

          if (item.tags && item.tags.indexOf('hero') >= 0) {
            sorters.heroes.push(item);
          } else {
            sorters.nonHeroes.push(item);
          }

          return sorters;

        }, {heroes: [], nonHeroes: []});

        c.items = [].concat(heroes, nonHeroes);

      });

    });

    return new Detangler(this.data);
  }

  finish() {
    return this.data;
  }
}

export default {
  createInstance: (data) => new Detangler(data)
}
