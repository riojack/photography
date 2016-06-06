import Thumb from './Thumb';
import React from 'react';

function createHeadingOrDefault() {
  if (this.props.focusing) {
    return <h3>{this.props.name}</h3>;
  }
}

function mapThumbnailsOrDefault() {
  if (this.props.focusing) {
    return this.props.collection.map((p, i) => <Thumb key={i} {...p} />);
  }
}

class ThumbCollection extends React.Component {
  componentDidMount() {
    require('../sass/thumb-collection.scss');
  }

  render() {
    return <section
      className="photo-thumb-collection"
      data-name={this.props.name}
      data-focusing={this.props.focusing}>
      {mapThumbnailsOrDefault.call(this)}
    </section>;
  }
}

ThumbCollection.propTypes = {
  name: React.PropTypes.string,
  collection: React.PropTypes.arrayOf(React.PropTypes.shape({
    onView: React.PropTypes.func,
    name: React.PropTypes.string,
    backgroundUrl: React.PropTypes.string,
    backgroundPosition: React.PropTypes.shape({x: React.PropTypes.number, y: React.PropTypes.number}),
    height: React.PropTypes.number
  }))
};

ThumbCollection.defaultProps = {
  name: 'This collection has no name',
  collection: []
};

export default ThumbCollection;
