import React from 'react';

class TransitionableThumb extends React.Component {
  render() {
    return <div>
      <div className="left-shark" style={{backgroundUrl: this.props.backgroundUrl}} />
      <div className="right-shark"/>
    </div>;
  }
}

export default TransitionableThumb;
