import ThumbCollection from './ThumbCollection';
import ThumbCollectionHeader from './ThumbCollectionHeader';
import React from 'react';

function findSelectedCollection() {
  let selectedCollection = this.props.application.selectedCollection;
  return this.props.collections.find(c => selectedCollection === c.collection);
}

function getCollectionHeaderOrDefault(collection) {
  if (collection) {
    return <ThumbCollectionHeader heading={collection.collection}/>;
  }
}

function getCollectionBodyOrDefault(collection, application) {
  if (collection) {
    return <ThumbCollection
      application={application}
      {...collection} />;
  }
}

class ThumbManager extends React.Component {
  render() {
    let collection = findSelectedCollection.call(this),
      application = this.props.application;

    return <div data-component="thumb-manager">
      {getCollectionHeaderOrDefault(collection)}
      {getCollectionBodyOrDefault(collection, application)}
    </div>;
  }
}

ThumbManager.propTypes = {};

ThumbManager.defaultProps = {};

export default ThumbManager;
