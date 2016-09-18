import PromiseMaker from './promise-maker';
import {statorWithReset} from './state-utilities';
import {injectOnClick} from './transform-utilities';
import NewestPhotosStrategy from './view-strategies/newest-photos';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

var ext = {},
  mergeWorld = () => {
  };

function resetEverything() {
  mergeWorld = statorWithReset.bind({});

  mergeWorld({sorter: false});
}

function whenThumbClicked(item) {
  ext.window.open(item.image, 'iowa-light-view-photo');
}

function whenBannerClicked() {
  ext.document.getElementById('photography-app-container').scrollTop = 0;
  mergeWorld().sorter.reset();
  doRender();
}

function setUpSorter() {
  if (!mergeWorld().sorter) {
    mergeWorld({
      sorter: NewestPhotosStrategy.create(ext.data)
    });
  }
}

function eventuallyRender(resolve) {
  let appProps = {
    groups: mergeWorld().sorter.next(5),
    whenBannerClicked
  };

  appProps.groups.forEach(function (g) {
    g.collections.forEach(function (c) {
      injectOnClick(c.items, whenThumbClicked);
    });
  });

  let element = React.createElement(App, appProps);

  ReactDOM.render(
    element,
    ext.document.getElementById('photography-app-container'),
    resolve
  );
}

function doRender() {
  return PromiseMaker.buildPromise(resolve => {
    setUpSorter();
    eventuallyRender(resolve);
  });
}

resetEverything();

export default {
  withExternals: (nextExt) => ext = nextExt,
  unregisterExternals: () => ext = {},

  peerAtWorld: () => mergeWorld(),

  resetMergers: resetEverything,

  whenThumbClicked,
  whenBannerClicked,

  doRender
}
