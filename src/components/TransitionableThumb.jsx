import React from 'react';

class TransitionableThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {useLeftShark: true};
  }

  componentDidUpdate(previousProps) {
    if (this.props.backgroundUrl !== previousProps.backgroundUrl) {
      this.setState({
        useLeftShark: !this.state.useLeftShark
      });
    }
  }

  render() {
    return <div data-tags={this.getTags()} onClick={this.props.onClick.bind({}, this.props)}>
      <div className="left-shark" style={this.getLeftSharkStyles()}/>
      <div className="right-shark" style={this.getRightSharkStyles()}/>
    </div>;
  }

  getTags() {
    return ['thumbnail'].concat(this.props.tags).join(' ');
  }

  getLeftSharkStyles() {
    if (this.state.useLeftShark) {
      return {backgroundUrl: `url("${this.props.backgroundUrl}")`};
    }
    return {};
  }

  getRightSharkStyles() {
    if (!this.state.useLeftShark) {
      return {backgroundUrl: `url("${this.props.backgroundUrl}")`};
    }
    return {};
  }
}

export default TransitionableThumb;
