import Thumb from './Thumb';
import React from 'react';

class ThumbCollection extends React.Component {
  render() {
    return <section className="photo-thumb-collection" data-name={this.props.name}>
      <h3>{this.props.name}</h3>
      {this.props.collection.map((p, i) => <Thumb key={i} {...p} />)}
    </section>;
  }
}

ThumbCollection.propTypes = {
  name: React.PropTypes.string,
  collection: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    backgroundUrl: React.PropTypes.string,
    backgroundPosition: React.PropTypes.objectOf(React.PropTypes.number)
  }))
};

ThumbCollection.defaultProps = {
  name: 'This collection has no name',
  collection: []
};

export default ThumbCollection;