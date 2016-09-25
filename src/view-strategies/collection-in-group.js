class GroupInCollectionStrategy {
  constructor(groups, collectionName) {
    this.groups = groups;
    this.collectionName = collectionName;
  }

  next() {
    var localCollectionName = this.collectionName,
      matchingGroup = this.groups.find(group => group.collections.find(collection => collection.collection === localCollectionName));

    if (matchingGroup === undefined) {
      return [];
    }

    return [Object.assign(
      {},
      matchingGroup,
      {collections: matchingGroup.collections.filter(collection => collection.collection === localCollectionName)}
    )];
  }
}

export default GroupInCollectionStrategy;
