class ByCollectionStrategy {
  static create(groups) {
    return new ByCollectionStrategy(groups);
  }

  constructor(groups) {
    this.groups = groups;
    this.groupsFetched = 0;
  }

  reset() {
    this.groupsFetched = 0;
  }

  next(numCollectionsToLoad) {
    this.groupsFetched += 1;
    if (numCollectionsToLoad) {
      this.groupsFetched = numCollectionsToLoad;
    }

    let collectionCount = 0;

    const groupsToRender = [];

    for (let i = 0; i < this.groups.length; i++) {
      const groupCollections = this.groups[i].collections;
      const groupShallowCopy = { ...this.groups[i], collections: [] };

      let exitedEarly = false;
      let j = 0;

      for (; j < groupCollections.length; j++) {
        const collection = groupCollections[j];

        groupShallowCopy.collections.push(collection);

        collectionCount += 1;

        if (collectionCount === this.groupsFetched) {
          exitedEarly = true;
          break;
        }
      }
      groupsToRender.push(groupShallowCopy);

      if (exitedEarly) {
        break;
      }
    }

    return groupsToRender;
  }
}

export default ByCollectionStrategy;
