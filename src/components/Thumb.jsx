import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url('${this.props.backgroundUrl}')`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`,
    height: `${this.props.height}px`,
    width: `${this.props.width}px`
  };
}

class Thumb extends React.Component {
  componentDidMount() {
    require('./sass/thumb.scss');
  }

  render() {
    return <div
      className="photo-thumb"
      style={createStyles.call(this)}
      onClick={this.props.onClick.bind({}, this.props)} />;
  }
}

export default Thumb;
