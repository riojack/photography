import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url(${this.props.backgroundUrl})`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`
  };
}

class Thumb extends React.Component {
  render() {
    return <div
      className="photo-thumb"
      style={createStyles.call(this)}
      data-name={this.props.name}
    />;
  }
}

Thumb.propTypes = {
  name: React.PropTypes.string,
  backgroundUrl: React.PropTypes.string,
  backgroundPosition: React.PropTypes.objectOf(React.PropTypes.number)
};

Thumb.defaultProps = {
  name: 'No name for photo',
  backgroundUrl: '',
  backgroundPosition: {x: 0, y: 0}
};

export default Thumb;
