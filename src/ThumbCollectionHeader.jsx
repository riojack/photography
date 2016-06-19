import React from 'react';

class ThumbCollectionHeader extends React.Component {
  render() {
    return <h3 data-component="thumb-collection-header" style={{display: 'none'}}>{this.props.heading}</h3>;
  }
}

export default ThumbCollectionHeader;
