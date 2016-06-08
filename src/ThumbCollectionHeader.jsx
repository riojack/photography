import React from 'react';

class ThumbCollectionHeader extends React.Component {
  render() {
    return <h3 data-component="thumb-collection-header">{this.props.heading}</h3>;
  }
}

export default ThumbCollectionHeader;
