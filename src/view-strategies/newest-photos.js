import detangler from '../data-detangler';

class NewestPhotosStrategy {
  static create(groups) {
    return new NewestPhotosStrategy(groups);
  }

  constructor(groups) {
    this.groups = groups;
    this.regrouped = false;
    this.itemsFetchedSoFar = 0;
  }

  reset() {
    this.itemsFetchedSoFar = 0;
  }

  static sorter(a, b) {
    if (a.collections[0].weight && b.collections[0].weight) {
      return b.collections[0].weight - a.collections[0].weight;
    }
    if (a.collections[0].weight) {
      return -1;
    }
    if (b.collections[0].weight) {
      return 1;
    }

    return b.collections[0].time - a.collections[0].time;
  }

  next(count) {
    if (!this.regrouped) {
      this.regrouped = detangler
        .createInstance(this.groups)
        .groupByCollectionTime()
        .sortHeroesFirst()
        .finish();

      this.regrouped.sort(NewestPhotosStrategy.sorter);
    }

    this.itemsFetchedSoFar += count;

    let countOfItemsAccumulated = 0;


    const nToGet = this.itemsFetchedSoFar;

    return this.regrouped.reduce((accumulator, gr) => {
      if (countOfItemsAccumulated !== nToGet) {
        const replicatedGroup = { ...gr, collections: [] };
        accumulator.push(replicatedGroup);

        for (let i = 0; i < gr.collections.length; i++) {
          if (countOfItemsAccumulated === nToGet) break;

          const collection = gr.collections[i];


          const replicatedCollection = { ...collection, items: [] };

          replicatedGroup.collections.push(replicatedCollection);

          for (let j = 0; j < collection.items.length; j++) {
            if (countOfItemsAccumulated === nToGet) break;
            countOfItemsAccumulated += 1;

            replicatedCollection.items.push(collection.items[j]);
          }
        }
      }

      return accumulator;
    }, []);
  }
}

export default NewestPhotosStrategy;
