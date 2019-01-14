import React from 'react';

function createStyles() {
  return {
    backgroundImage: `url('${this.props.backgroundUrl}')`,
  };
}

function createTags() {
  const tags = this.props.tags || [];


  const combinedTags = tags.join(' ');

  return `thumbnails ${combinedTags}`;
}

class Thumb extends React.Component {
  render() {
    return (
      <div
        className="photo-thumb"
        data-lookup-id={this.props.lookupId}
        data-tags={createTags.call(this)}
        style={createStyles.call(this)}
        onClick={this.props.onClick.bind({}, this.props)}
      />
    );
  }
}

export default Thumb;
