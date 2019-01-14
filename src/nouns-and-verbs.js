import React from 'react';
import ReactDOM from 'react-dom';
import PromiseMaker from './promise-maker';
import { statorWithReset } from './state-utilities';
import TransformUtilities from './transform-utilities';
import CollectionInGroupStrategy from './view-strategies/collection-in-group';
import NewestPhotosStrategy from './view-strategies/newest-photos';
import ByCollectionStrategy from './view-strategies/by-collection';
import detangler from './data-detangler';
import App from './App';

const mountContainerId = 'photography-app-container';
const CACHE_PREFIX_URL = 'http://d3rjsdgb9hzkgz.cloudfront.net/';
let ext = {};

function doRender() {
  return PromiseMaker.buildPromise((resolve) => {
    // eslint-disable-next-line no-use-before-define
    setUpSorterAndTransformer();
    // eslint-disable-next-line no-use-before-define
    eventuallyRender(resolve);
  });
}

let mergeWorld = () => {
};

function resetEverything() {
  mergeWorld = statorWithReset.bind({});

  mergeWorld({
    transformer: false,
    sorter: false,
    limitRenderTo: false,
    skipLoadingNextGroup: false,
  });
}

function whenThumbClicked(item) {
  const [itemName, collTime, collectionName, groupName] = item.lookupId.split('|')
    .map(atob);
  const collectionTime = parseInt(collTime, 10);
  const collection = ext
    .data.find(x => x.group === groupName
      && x.collections.find(y => y.collection === collectionName && y.time === collectionTime)).collections[0];

  const indexOfItemClicked = collection.items.findIndex(x => x.name === itemName);
  const itemOriginal = collection.items[indexOfItemClicked];
  const firstItem = collection.items[0];

  if (indexOfItemClicked === 0) {
    ext.window.open(item.image, 'iowa-light-view-photo');
    return;
  }

  itemOriginal.tags.push('changing_image');
  firstItem.tags.push('changing_image');

  doRender()
    .then(() => {
      PromiseMaker.buildPromise((resolve) => {
        ext.setTimeout(() => {
          collection.items[0] = itemOriginal;
          collection.items[indexOfItemClicked] = firstItem;

          doRender();
          resolve();
        }, 250);
      })
        .then(() => {
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
    limitRenderTo: false,
  });
  doRender();
}

function whenCollapseToGroupsClicked() {
  const collectionCount = ext.data.reduce(
    (count, g) => count + g.collections.reduce((itemCount, collection) => itemCount + collection.items.length, 0),
    0,
  );
  const nextByCollectionStrat = ByCollectionStrategy.create(ext.data);

  nextByCollectionStrat.next(collectionCount);
  mergeWorld({
    sorter: nextByCollectionStrat,
    limitRenderTo: 'collectionNames',
  });

  doRender();
}

function whenCollectionNameClicked(collectionName) {
  mergeWorld({
    limitRenderTo: false,
    sorter: CollectionInGroupStrategy.create(ext.data, collectionName),
  });

  doRender();
}

function setUpSorterAndTransformer() {
  if (!mergeWorld().sorter) {
    mergeWorld({
      sorter: ByCollectionStrategy.create(ext.data),
    });
  }
}

function eventuallyRender(resolve) {
  const currentWorld = mergeWorld();
  const appProps = {
    cacheUrl: CACHE_PREFIX_URL,
    groups: currentWorld.sorter.next(),
    limitRenderTo: currentWorld.limitRenderTo,
    whenBannerClicked,
    whenCollapseToGroupsClicked,
    whenCollectionNameClicked,
  };

  appProps.groups.forEach((g) => {
    g.collections.forEach((c) => {
      TransformUtilities.injectOnClick(c.items, whenThumbClicked);
    });
  });

  const element = React.createElement(App, appProps);

  ReactDOM.render(
    element,
    ext.document.getElementById(mountContainerId),
    resolve,
  );
}

function onContainerScroll() {
  const height = this.clientHeight;
  const scrollY = this.scrollTop;
  const scrollYMax = this.scrollHeight;
  const scrollPercent = (scrollY + height) / scrollYMax;

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
        .finish(),
    });

    ext.data.sort(NewestPhotosStrategy.sorter);
  },
  unregisterExternals: () => {
    ext = {};
  },

  prime: thingsToStartWith => mergeWorld(thingsToStartWith),

  peerAtWorld: () => mergeWorld(),

  resetMergers: resetEverything,

  whenThumbClicked,
  whenBannerClicked,
  whenCollapseToGroupsClicked,
  whenCollectionNameClicked,

  doRender,
  onContainerScroll,
};
