import React from 'react';

class Collection extends React.Component {
  render() {
    return <div className="photo-collection">
      <h3>{this.props.collection}</h3>
    </div>;
  }
}

export default Collection;
