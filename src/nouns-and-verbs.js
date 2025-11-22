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

// Constants
const MOUNT_CONTAINER_ID = 'photography-app-container';
const CACHE_PREFIX_URL = 'https://d3rjsdgb9hzkgz.cloudfront.net/';
const WINDOW_TARGET = 'iowa-light-view-photo';
const CHANGING_IMAGE_TAG = 'changing_image';
const SWAP_ANIMATION_DELAY = 250;
const SCROLL_TRIGGER_THRESHOLD = 0.9;

// State management
let ext = {};
let mergeWorld = () => {};

/**
 * Initialize or reset the application state
 */
function resetEverything() {
  mergeWorld = statorWithReset.bind({});
  mergeWorld({
    transformer: false,
    sorter: false,
    limitRenderTo: false,
    skipLoadingNextGroup: false,
  });
}

/**
 * Render the application
 * @returns {Promise} Promise that resolves when rendering is complete
 */
function doRender() {
  return PromiseMaker.buildPromise((resolve) => {
    setUpSorterAndTransformer();
    eventuallyRender(resolve);
  });
}

/**
 * Parse the lookup ID and extract metadata
 * @param {string} lookupId - Base64 encoded lookup identifier
 * @returns {Object} Parsed metadata
 */
function parseLookupId(lookupId) {
  const [itemName, collTime, collectionName, groupName] = lookupId.split('|').map(atob);
  return {
    itemName,
    collectionTime: parseInt(collTime, 10),
    collectionName,
    groupName,
  };
}

/**
 * Find a collection in the data by its metadata
 * @param {Object} metadata - Collection metadata
 * @returns {Object} The matching collection
 */
function findCollection(metadata) {
  const { groupName, collectionName, collectionTime } = metadata;
  const group = ext.data.find(g => g.group === groupName);
  return group.collections.find(c => c.collection === collectionName && c.time === collectionTime);
}

/**
 * Swap two items in a collection with animation
 * @param {Object} collection - The collection containing the items
 * @param {number} index1 - First item index
 * @param {number} index2 - Second item index
 */
function swapItemsWithAnimation(collection, index1, index2) {
  const item1 = collection.items[index1];
  const item2 = collection.items[index2];

  // Add animation tags
  item1.tags.push(CHANGING_IMAGE_TAG);
  item2.tags.push(CHANGING_IMAGE_TAG);

  doRender().then(() => {
    PromiseMaker.buildPromise((resolve) => {
      ext.setTimeout(() => {
        // Swap items
        collection.items[index1] = item2;
        collection.items[index2] = item1;
        doRender();
        resolve();
      }, SWAP_ANIMATION_DELAY);
    }).then(() => {
      // Remove animation tags
      item1.tags.pop();
      item2.tags.pop();
      doRender();
    });
  });
}

/**
 * Handle thumbnail click event
 * @param {Object} item - The clicked item
 */
function whenThumbClicked(item) {
  const metadata = parseLookupId(item.lookupId);
  const collection = findCollection(metadata);
  const clickedIndex = collection.items.findIndex(i => i.name === metadata.itemName);

  // If hero (first) image is clicked, open in new window
  if (clickedIndex === 0) {
    ext.window.open(item.image, WINDOW_TARGET);
    return;
  }

  // Swap clicked item with hero image
  swapItemsWithAnimation(collection, 0, clickedIndex);
}

/**
 * Handle banner click - reset view to top and clear filters
 */
function whenBannerClicked() {
  ext.document.getElementById(MOUNT_CONTAINER_ID).scrollTop = 0;
  mergeWorld({
    sorter: false,
    limitRenderTo: false,
  });
  doRender();
}

/**
 * Count total items across all collections
 * @returns {number} Total item count
 */
function getTotalItemCount() {
  return ext.data.reduce(
    (total, group) => total + group.collections.reduce(
      (count, collection) => count + collection.items.length,
      0,
    ),
    0,
  );
}

/**
 * Handle collapse to groups click - show collection names only
 */
function whenCollapseToGroupsClicked() {
  const itemCount = getTotalItemCount();
  const collectionStrategy = ByCollectionStrategy.create(ext.data);

  collectionStrategy.next(itemCount);
  mergeWorld({
    sorter: collectionStrategy,
    limitRenderTo: 'collectionNames',
  });

  doRender();
}

/**
 * Handle collection name click - show specific collection
 * @param {string} collectionName - Name of the clicked collection
 */
function whenCollectionNameClicked(collectionName) {
  mergeWorld({
    limitRenderTo: false,
    sorter: CollectionInGroupStrategy.create(ext.data, collectionName),
  });

  doRender();
}

/**
 * Ensure sorter is initialized before rendering
 */
function setUpSorterAndTransformer() {
  if (!mergeWorld().sorter) {
    mergeWorld({
      sorter: ByCollectionStrategy.create(ext.data),
    });
  }
}

/**
 * Inject click handlers into all items
 * @param {Array} groups - Array of groups to process
 */
function injectClickHandlers(groups) {
  groups.forEach((group) => {
    group.collections.forEach((collection) => {
      TransformUtilities.injectOnClick(collection.items, whenThumbClicked);
    });
  });
}

/**
 * Build props for the App component
 * @param {Object} world - Current world state
 * @returns {Object} Props for App component
 */
function buildAppProps(world) {
  return {
    cacheUrl: CACHE_PREFIX_URL,
    groups: world.sorter.next(),
    limitRenderTo: world.limitRenderTo,
    whenBannerClicked,
    whenCollapseToGroupsClicked,
    whenCollectionNameClicked,
  };
}

/**
 * Render the application to the DOM
 * @param {Function} resolve - Promise resolver
 */
function eventuallyRender(resolve) {
  const currentWorld = mergeWorld();
  const appProps = buildAppProps(currentWorld);

  injectClickHandlers(appProps.groups);

  const element = React.createElement(App, appProps);
  const container = ext.document.getElementById(MOUNT_CONTAINER_ID);

  ReactDOM.render(element, container, resolve);
}

/**
 * Handle container scroll - trigger render when near bottom
 */
function onContainerScroll() {
  const { clientHeight, scrollTop, scrollHeight } = this;
  const scrollPercent = (scrollTop + clientHeight) / scrollHeight;

  if (scrollPercent >= SCROLL_TRIGGER_THRESHOLD) {
    doRender();
  }
}

/**
 * Process and prepare external data
 * @param {Object} rawData - Raw external data
 * @returns {Array} Processed data
 */
function processExternalData(rawData) {
  const processedData = detangler
    .createInstance(rawData)
    .groupByCollectionTime()
    .sortHeroesFirst()
    .finish();

  processedData.sort(NewestPhotosStrategy.sorter);
  return processedData;
}

// Initialize state
resetEverything();

// Public API
export default {
  /**
   * Register external dependencies
   * @param {Object} nextExt - External dependencies (window, document, data, etc.)
   */
  withExternals: (nextExt) => {
    ext = {
      ...nextExt,
      data: processExternalData(nextExt.data),
    };
  },

  /**
   * Clear external dependencies
   */
  unregisterExternals: () => {
    ext = {};
  },

  /**
   * Set initial state values
   * @param {Object} thingsToStartWith - Initial state
   */
  prime: thingsToStartWith => mergeWorld(thingsToStartWith),

  /**
   * Get current state
   * @returns {Object} Current world state
   */
  peerAtWorld: () => mergeWorld(),

  /**
   * Reset state to initial values
   */
  resetMergers: resetEverything,

  // Event handlers
  whenThumbClicked,
  whenBannerClicked,
  whenCollapseToGroupsClicked,
  whenCollectionNameClicked,

  // Core functions
  doRender,
  onContainerScroll,
};
