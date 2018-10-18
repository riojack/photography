import PromiseMaker from "./promise-maker";
import { statorWithReset } from "./state-utilities";
import { injectOnClick } from "./transform-utilities";
import CollectionInGroupStrategy from "./view-strategies/collection-in-group";
import NewestPhotosStrategy from "./view-strategies/newest-photos";
import ByCollectionStrategy from "./view-strategies/by-collection";
import detangler from "./data-detangler";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mountContainerId = 'photography-app-container';

const CACHE_PREFIX_URL = 'http://d3rjsdgb9hzkgz.cloudfront.net/';

let ext = {},
  mergeWorld = () => {
  };

function resetEverything() {
  mergeWorld = statorWithReset.bind({});

  mergeWorld({
    transformer: false,
    sorter: false,
    limitRenderTo: false,
    skipLoadingNextGroup: false
  });
}

function whenThumbClicked(item) {
  let [itemName, collectionTime, collectionName, groupName] = item.lookupId.split('|').map(atob);

  collectionTime = parseInt(collectionTime);

  let collection = ext
    .data.find(x => x.group === groupName
      && x.collections.find(y => y.collection === collectionName && y.time === collectionTime)).collections[0];

  let indexOfItemClicked = collection.items.findIndex(x => x.name === itemName),
    itemOriginal = collection.items[indexOfItemClicked],
    firstItem = collection.items[0];

  if (indexOfItemClicked === 0) {
    ext.window.open(item.image, 'iowa-light-view-photo');
    return;
  }

  itemOriginal.tags.push('changing_image');
  firstItem.tags.push('changing_image');

  doRender()
    .then(function () {
      PromiseMaker.buildPromise(resolve => {
        ext.setTimeout(function () {
          collection.items[0] = itemOriginal;
          collection.items[indexOfItemClicked] = firstItem;

          doRender();
          resolve();
        }, 250);
      }).then(function () {
        itemOriginal.tags.pop();
        firstItem.tags.pop();

        doRender();
      });
    });
}

function whenBannerClicked() {
  ext.document.getElementById(mountContainerId).scrollTop = 0;
  mergeWorld({
    sorter: false,
    limitRenderTo: false
  });
  doRender();
}

function whenCollapseToGroupsClicked() {
  let collectionCount = ext.data.reduce((count, g) => {
    return count + g.collections.reduce((itemCount, collection) => itemCount + collection.items.length, 0);
  }, 0),
    nextByCollectionStrat = ByCollectionStrategy.create(ext.data);

  nextByCollectionStrat.next(collectionCount);
  mergeWorld({
    sorter: nextByCollectionStrat,
    limitRenderTo: 'collectionNames'
  });

  doRender();
}

function whenCollectionNameClicked(collectionName) {
  mergeWorld({
    limitRenderTo: false,
    sorter: CollectionInGroupStrategy.create(ext.data, collectionName)
  });

  doRender();
}

function setUpSorterAndTransformer() {
  if (!mergeWorld().sorter) {
    mergeWorld({
      sorter: ByCollectionStrategy.create(ext.data)
    });
  }
}

function eventuallyRender(resolve) {
  let currentWorld = mergeWorld(),
    appProps = {
      cacheUrl: CACHE_PREFIX_URL,
      groups: currentWorld.sorter.next(),
      limitRenderTo: currentWorld.limitRenderTo,
      whenBannerClicked,
      whenCollapseToGroupsClicked,
      whenCollectionNameClicked
    };

  appProps.groups.forEach(function (g) {
    g.collections.forEach(function (c) {
      injectOnClick(c.items, whenThumbClicked);
    });
  });

  let element = React.createElement(App, appProps);

  ReactDOM.render(
    element,
    ext.document.getElementById(mountContainerId),
    resolve
  );
}

function doRender() {
  return PromiseMaker.buildPromise(resolve => {
    setUpSorterAndTransformer();
    eventuallyRender(resolve);
  });
}

function onContainerScroll() {
  const height = this.clientHeight,
    scrollY = this.scrollTop,
    scrollYMax = this.scrollHeight,
    scrollPercent = (scrollY + height) / scrollYMax;

  if (scrollPercent >= 0.9) {
    doRender();
  }
}

resetEverything();

export default {
  withExternals: (nextExt) => {
    ext = Object.assign({}, nextExt, {
      data: detangler
        .createInstance(nextExt.data)
        .groupByCollectionTime()
        .sortHeroesFirst()
        .finish()
    });

    ext.data.sort(NewestPhotosStrategy.sorter);
  },
  unregisterExternals: () => ext = {},

  prime: (thingsToStartWith) => mergeWorld(thingsToStartWith),

  peerAtWorld: () => mergeWorld(),

  resetMergers: resetEverything,

  whenThumbClicked,
  whenBannerClicked,
  whenCollapseToGroupsClicked,
  whenCollectionNameClicked,

  doRender,
  onContainerScroll
}
