class NewestPhotosStrategy {
  static sort(groups) {
    groups.forEach(g => g.collections.sort((a, b) => b.time - a.time));

    groups.sort((a, b) => b.collections[0].time - a.collections[0].time);

    return groups;
  }

  static mergeAllCollections(groups) {
    return groups.reduce((pv, cv) => {
      cv.collections.forEach((coll) => {
        pv.push(coll);
      });
      return pv;
    }, []);
  }

  constructor(groups) {
    this.groups = groups;
    this.allItems = false;
    this.nSoFar = 0;
  }

  weight() {
    return 1000;
  }

  reset() {
    this.allItems = false;
    this.nSoFar = 0;
  }

  next(count) {
    if (!this.allItems) {
      let mergedAndSorted = NewestPhotosStrategy
        .mergeAllCollections(this.groups)
        .sort((a, b) => b.time - a.time);

      this.allItems = mergedAndSorted.reduce((pv, cv) => {
        cv.items.forEach(item => pv.push(item));
        return pv;
      }, []);
    }

    this.nSoFar += count;

    if (this.nSoFar > this.allItems.length) {
      this.nSoFar = this.allItems.length;
    }

    let localAllItems = this.allItems,
      localNSoFar = this.nSoFar;

    return [{
      group: 'Newest',
      collections: [
        {
          collection: 'Newest photos',
          items: (() => {
            let itemList = [];
            for (let i = 0; i < localNSoFar; i++) {
              itemList.push(localAllItems[i]);
            }
            return itemList;
          })()
        }
      ]
    }];
  }
}

export default NewestPhotosStrategy;
