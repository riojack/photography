class Detangler {
  constructor(data) {
    this.data = data;
  }

  groupByCollectionTime() {
    const byGroupAndTime = this.data.reduce((accumulator, g) => {
      const groupName = g.group;

      g.collections.forEach((c) => {
        const { time } = c;
        const compKey = `${groupName}-${time}`;

        if (!accumulator[compKey]) {
          accumulator[compKey] = {
            group: groupName,
            collections: [],
          };
        }

        accumulator[compKey].collections.push(c);
      });

      return accumulator;
    }, {});

    const detangledData = Object.keys(byGroupAndTime)
      .map(k => byGroupAndTime[k]);

    return new Detangler(detangledData);
  }

  sortHeroesFirst() {
    this.data.forEach((g) => {
      g.collections.forEach((c) => {
        const { heroes, nonHeroes } = c.items.reduce((sortCategories, item) => {
          if (item.tags && item.tags.indexOf('hero') >= 0) {
            sortCategories.heroes.push(item);
          } else {
            sortCategories.nonHeroes.push(item);
          }

          return sortCategories;
        }, {
          heroes: [],
          nonHeroes: [],
        });

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
  createInstance: data => new Detangler(data),
};
