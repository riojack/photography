import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url(${this.props.backgroundUrl})`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`,
    height: `${this.props.height}px`
  };
}

function handleClick() {
  this.props.application.onView({name: this.props.name});
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

Thumb.defaultProps = {
  application: {
    onView: () => {
    }
  },
  name: 'No name for photo',
  backgroundUrl: '',
  backgroundPosition: {x: 0, y: 0},
  height: 65
};

export default Thumb;
