import Thumb from "./Thumb";
import React from "react";

function mapThumbnailsOrDefault() {
  return this.props.application.selectedCollection.items.map((p, i) => {
    return <Thumb key={i} {...p} application={this.props.application}/>;
  });
}

class ThumbCollection extends React.Component {
  componentDidMount() {
    require('../sass/thumb-collection.scss');
  }

  render() {
    return <div className="photo-thumb-collection">
      {mapThumbnailsOrDefault.call(this)}
    </div>;
  }
}

export default ThumbCollection;
