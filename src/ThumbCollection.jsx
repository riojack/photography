import Thumb from './Thumb';
import React from 'react';

function mapThumbnailsOrDefault() {
  let application = this.props.application;
  if (this.props.application.focusing) {
    return this.props.items.map((p, i) => <Thumb key={i} {...p} application={application} />);
  }
}

class ThumbCollection extends React.Component {
  componentDidMount() {
    require('../sass/thumb-collection.scss');
  }

  render() {
    return <section
      className="photo-thumb-collection"
      data-name={this.props.collection}
      data-focusing={this.props.application.focusing}>
      {mapThumbnailsOrDefault.call(this)}
    </section>;
  }
}

ThumbCollection.defaultProps = {
  application: {},
  collection: 'This collection has no name',
  items: []
};

export default ThumbCollection;
