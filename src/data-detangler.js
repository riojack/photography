function doGroupingByCollectionTime(data) {
  let byGroupAndTime = data.reduce((accumulator, g) => {
    let groupName = g.group;

    g.collections.forEach(c => {
      let time = c.time,
        compKey = groupName + '-' + time;

      if (!accumulator[compKey]) {
        accumulator[compKey] = {
          group: groupName,
          collections: []
        };
      }

      accumulator[compKey].collections.push(c);
    });

    return accumulator;

  }, {});

  return Object.keys(byGroupAndTime)
    .map(k => byGroupAndTime[k]);
}

export default {
  groupByCollectionTime: doGroupingByCollectionTime
}
