import React from 'react';

function assembleImageAttributes() {
  let attrs = {
    'data-focusing': this.props.focusing
  };

  if (this.props.image.src) {
    attrs.src = this.props.image.src;
  }

  return attrs;
}

class ImageViewer extends React.Component {
  componentDidMount() {
    require('../sass/image-viewer.scss');
  }

  render() {
    return <section className="image-viewer">
      <img {...assembleImageAttributes.call(this)} />
    </section>;
  }
}

ImageViewer.propTypes = {};

ImageViewer.defaultProps = {};

export default ImageViewer;
