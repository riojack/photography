class GroupInCollectionStrategy {
  static create(groups, collectionName) {
    return new GroupInCollectionStrategy(groups, collectionName);
  }

  constructor(groups, collectionName) {
    this.groups = groups;
    this.collectionName = collectionName;
  }

  next() {
    const localCollName = this.collectionName;
    const matchingGroup = this.groups.find(group => group.collections.find(coll => coll.collection === localCollName));

    let nextGroups = [];

    if (matchingGroup !== undefined) {
      nextGroups = [Object.assign(
        {},
        matchingGroup,
        {
          collections: matchingGroup.collections.filter(collection => collection.collection === localCollName),
        },
      )];
    }

    return nextGroups;
  }
}

export default GroupInCollectionStrategy;
