class ByCollectionStrategy {
  static create(groups) {
    return new ByCollectionStrategy(groups);
  }

  constructor(groups) {
    this.groups = groups;
    this.nextCalls = 0;
  }

  reset() { }

  next() {
    this.nextCalls++;

    let collectionCount = 0;

    const groupsToRender = [];

    for (let i = 0; i < this.groups.length; i++) {
      const groupCollections = this.groups[i].collections;
      const groupShallowCopy = Object.assign({}, this.groups[i], { collections: [] });

      let exitedEarly = false;
      let j = 0;

      for (; j < groupCollections.length; j++) {
        const collection = groupCollections[j];

        groupShallowCopy.collections.push(collection);

        collectionCount++;

        if (collectionCount === this.nextCalls) {
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
