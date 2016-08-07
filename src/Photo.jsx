import React from 'react';

class Photo extends React.Component {
  componentDidMount() {
    require('../sass/photo.scss');
  }

  render() {
    return <div className="photo-viewer">
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
