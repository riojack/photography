import ThumbCollection from './ThumbCollection';
import React from 'react';

function findSelectedCollection() {
  let selectedCollection = this.props.selectedCollection;
  return this.props.thumbCollections.find(c => selectedCollection === c.name);
}

class ThumbManager extends React.Component {
  render() {
    let collection = findSelectedCollection.call(this);

    return <ThumbCollection
      {...collection}
      focusing={this.props.focusing}
      pinned={this.props.pinned}
      onNavigateToCollection={this.props.onNavigateToCollection}
      onPinnedSwitch={this.props.onPinnedSwitch}
    />;
  }
}

ThumbManager.propTypes = {};

ThumbManager.defaultProps = {};

export default ThumbManager;
