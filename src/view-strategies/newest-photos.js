import detangler from '../data-detangler';

class NewestPhotosStrategy {
  constructor(groups) {
    this.groups = groups;
    this.regrouped = false;
    this.itemsFetchedSoFar = 0;
  }

  weight() {
    return 1000;
  }

  reset() {
    this.itemsFetchedSoFar = 0;
  }

  next(count) {
    if (!this.regrouped) {
      this.regrouped = detangler.groupByCollectionTime(this.groups);

      this.regrouped.sort((a,b) => b.collections[0].time - a.collections[0].time);
    }

    this.itemsFetchedSoFar += count;

    let countOfItemsAccumulated = 0,
      nToGet = this.itemsFetchedSoFar;

    return this.regrouped.reduce((accumulator, gr) => {
      if (countOfItemsAccumulated !== nToGet) {
        var replicatedGroup = Object.assign({}, gr, {collections: []});
        accumulator.push(replicatedGroup);

        for (let i = 0; i < gr.collections.length; i++) {
          if (countOfItemsAccumulated === nToGet) break;

          var collection = gr.collections[i],
            replicatedCollection = Object.assign({}, collection, {items: []});

          replicatedGroup.collections.push(replicatedCollection);

          for (let j = 0; j < collection.items.length; j++) {
            if (countOfItemsAccumulated === nToGet) break;
            countOfItemsAccumulated++;

            replicatedCollection.items.push(collection.items[j]);
          }
        }
      }

      return accumulator;
    }, []);
  }
}

export default NewestPhotosStrategy;
