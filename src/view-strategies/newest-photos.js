class NewestPhotosStrategy {
  static sort(groups) {
    groups.forEach(g => g.collections.sort((a, b) => b.time - a.time));

    groups.sort((a, b) => b.collections[0].time - a.collections[0].time);

    return groups;
  }
}

export default NewestPhotosStrategy;
