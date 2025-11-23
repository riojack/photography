import React from 'react';
import PropTypes from 'prop-types';

class TransitionableThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = { useLeftShark: true };
  }

  componentDidUpdate(previousProps) {
    if (this.props.backgroundUrl !== previousProps.backgroundUrl) {
      this.setState({
        useLeftShark: !this.state.useLeftShark,
      });
    }
  }

  render() {
    return (
      <div
        role="button"
        tabIndex={0}
        className="transitionable-photo-thumb"
        data-tags={this.getTags()}
        data-name={this.props.name}
        data-image={this.props.image}
        data-lookup-id={this.props.lookupId}
        onClick={this.props.onClick.bind({}, this.props)}
        onKeyDown={(e) => e.key === 'Enter' && this.props.onClick(this.props)}
      >
        <div className="left-shark" {...this.getLeftSharkStyles()} />
        <div className="right-shark" {...this.getRightSharkStyles()} />
      </div>
    );
  }

  getTags() {
    return ['thumbnail'].concat(this.props.tags)
      .join(' ');
  }

  getLeftSharkStyles() {
    if (this.state.useLeftShark) {
      return {
        style: { backgroundImage: `url("${this.props.backgroundUrl}")` },
      };
    }
    return {};
  }

  getRightSharkStyles() {
    if (!this.state.useLeftShark) {
      return {
        style: { backgroundImage: `url("${this.props.backgroundUrl}")` },
      };
    }
    return {};
  }
}

TransitionableThumb.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  image: PropTypes.string,
  lookupId: PropTypes.string,
};

TransitionableThumb.defaultProps = {
  tags: [],
  name: undefined,
  image: undefined,
  lookupId: undefined,
};

export default TransitionableThumb;
