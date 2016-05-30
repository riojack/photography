import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url(${this.props.backgroundUrl})`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`,
    height: `${this.props.height}px`
  };
}

class Thumb extends React.Component {
  componentDidMount() {
    require('../sass/thumb.scss');
  }

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
  backgroundPosition: React.PropTypes.objectOf(React.PropTypes.number),
  height: React.PropTypes.number
};

Thumb.defaultProps = {
  name: 'No name for photo',
  backgroundUrl: '',
  backgroundPosition: {x: 0, y: 0},
  height: 65
};

export default Thumb;
