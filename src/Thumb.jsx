import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url(${this.props.backgroundUrl})`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`,
    height: `${this.props.height}px`
  };
}

function handleClick() {
  this.props.onView({name: this.props.name});
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
      onClick={handleClick.bind(this)}
    ></div>;
  }
}

Thumb.propTypes = {
  onView: React.PropTypes.func,
  name: React.PropTypes.string,
  backgroundUrl: React.PropTypes.string,
  backgroundPosition: React.PropTypes.objectOf(React.PropTypes.number),
  height: React.PropTypes.number
};

Thumb.defaultProps = {
  onView: () => {
  },
  name: 'No name for photo',
  backgroundUrl: '',
  backgroundPosition: {x: 0, y: 0},
  height: 65
};

export default Thumb;
