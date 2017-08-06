import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url('${this.props.backgroundUrl}')`,
    backgroundPosition: `${this.props.backgroundPosition.x}px ${this.props.backgroundPosition.y}px`,
    height: `${this.props.height}px`,
    width: `${this.props.width}px`
  };
}

function createTags() {
  let tags = this.props.tags || [],
    combinedTags = tags.join(' ');

  return `thumbnails ${combinedTags}`;
}

class Thumb extends React.Component {
  render() {
    return <div
      className="photo-thumb"
      data-tags={createTags.call(this)}
      style={createStyles.call(this)}
      onClick={this.props.onClick.bind({}, this.props)}/>;
  }
}

export default Thumb;
