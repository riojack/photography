import React from 'react';
import PropTypes from 'prop-types';

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
        role="button"
        tabIndex={0}
        className="photo-thumb"
        data-lookup-id={this.props.lookupId}
        data-tags={createTags.call(this)}
        style={createStyles.call(this)}
        onClick={this.props.onClick.bind({}, this.props)}
        onKeyDown={(e) => e.key === 'Enter' && this.props.onClick(this.props)}
      />
    );
  }
}

Thumb.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  lookupId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Thumb.defaultProps = {
  tags: [],
};

export default Thumb;
