import ThumbCollection from './ThumbCollection';
import Photo from './Photo';
import React from 'react';

function shouldRenderCollection() {
  return !this.props.application.image && this.props.application.selectedCollection;
}

function shouldRenderPhoto() {
  return this.props.application.image;
}

function getPhotoOrDefault() {
  if (shouldRenderPhoto.call(this)) {
    return <Photo application={this.props.application} />;
  }
}

function getCollectionBodyOrDefault() {
  if (shouldRenderCollection.call(this)) {
    return <ThumbCollection application={this.props.application} />;
  }
}

class ThumbManager extends React.Component {
  render() {
    return <div className="thumb-manager">
      {getPhotoOrDefault.call(this)}
      {getCollectionBodyOrDefault.call(this)}
    </div>;
  }
}

export default ThumbManager;
