import React from 'react';

class PhotoControls extends React.Component {
  componentDidMount() {
    require('../sass/photo-controls.scss');
  }

  render() {
    return <ul className="photo-controls">
      <li>
        <a onClick={this.props.onViewPhoto}>View full</a>
      </li>
    </ul>;
  }
}

export default PhotoControls;
