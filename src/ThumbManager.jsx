import ThumbCollection from './ThumbCollection';
import ThumbCollectionHeader from './ThumbCollectionHeader';
import React from 'react';

function findSelectedCollection() {
  let selectedCollection = this.props.application.selectedCollection;
  return this.props.collections.find(c => selectedCollection === c.collection);
}

class ThumbManager extends React.Component {
  render() {
    let collection = findSelectedCollection.call(this);

    return <div data-component="thumb-manager">
      <ThumbCollectionHeader heading={collection.collection}/>
      <ThumbCollection
        application={this.props.application}
        {...collection} />
    </div>;
  }
}

ThumbManager.propTypes = {};

ThumbManager.defaultProps = {};

export default ThumbManager;
