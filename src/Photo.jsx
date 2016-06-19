import React from 'react';

const scaleMachine = {
  'small': 'mid',
  'mid': 'full',
  'full': 'small'
};

function whenImgClicked() {
  let currentScale = this.state.scale;
  this.setState({scale: scaleMachine[currentScale]});
}

function assembleImageAttributes() {
  let attrs = {
    onClick: whenImgClicked.bind(this),
    'data-focusing': this.props.focusing,
    'data-scale-mode': this.state.scale
  };

  if (this.props.image.src) {
    attrs.src = this.props.image.src;
  }

  return attrs;
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scale: 'small'};
  }

  componentDidMount() {
    require('../sass/photo.scss');
  }

  render() {
    return <section className="image-viewer">
      <img {...assembleImageAttributes.call(this)} />
    </section>;
  }
}

Photo.propTypes = {};

Photo.defaultProps = {};

export default Photo;
