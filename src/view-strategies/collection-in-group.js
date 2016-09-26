class GroupInCollectionStrategy {
  static create(groups, collectionName) {
    return new GroupInCollectionStrategy(groups, collectionName);
  }

  constructor(groups, collectionName) {
    this.groups = groups;
    this.collectionName = collectionName;
  }

  next() {
    var localCollectionName = this.collectionName,
      matchingGroup = this.groups.find(group => group.collections.find(collection => collection.collection === localCollectionName)),
      nextGroups = [];

    if (matchingGroup !== undefined) {
      nextGroups = [Object.assign(
        {},
        matchingGroup,
        {collections: matchingGroup.collections.filter(collection => collection.collection === localCollectionName)}
      )];
    }

    return nextGroups;
  }
}

export default GroupInCollectionStrategy;
