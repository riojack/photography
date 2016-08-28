import React from 'react';

import PhotoControls from './PhotoControls';

function getPhotoControlsIfNotLoading() {
  if (!this.props.application.imageAttributes.isLoading) {
    return <PhotoControls
      onViewPhoto={this.props.application.onViewPhoto}
    />;
  }
}

class Photo extends React.Component {
  componentDidMount() {
    require('../../sass/photo.scss');
  }

  render() {
    return <div className="photo-viewer">
      {getPhotoControlsIfNotLoading.call(this)}
      <img
        data-loading={this.props.application.imageAttributes.isLoading}
        onClick={this.props.application.onImageClick}
        title={this.props.application.image}
        src={this.props.application.image}
        style={{
          height: this.props.application.imageAttributes.height,
          width: this.props.application.imageAttributes.width
        }}
      />
    </div>;
  }
}

export default Photo;
