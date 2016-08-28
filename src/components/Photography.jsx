import React from 'react';
import NavManager from './NavManager';
import ThumbManager from './ThumbManager';
import Breadcrumb from './Breadcrumbs';

function getThumbManagerOrDefault() {
  if (this.props.application.selectedCollection) {
    return <div className="collection-presentation">
      <ThumbManager application={this.props.application}/>
    </div>;
  }
}

function getNavManagerOrDefault() {
  if (!this.props.application.selectedCollection && !this.props.application.image) {
    return <div className="navigation-presentation">
      <NavManager application={this.props.application} {...this.props.navState} />
    </div>;
  }
}

function getBreadcrumbs() {
  return <Breadcrumb
    crumbs={this.props.application.crumbs}
    onCrumbClick={this.props.application.onCrumbClick}
  />;
}

class Photography extends React.Component {
  componentDidMount() {
    require('../../sass/photography.scss');
    require('../../sass/core.scss');
  }

  render() {
    return <div className="photography-application">
      {getBreadcrumbs.call(this)}
      {getNavManagerOrDefault.call(this)}
      {getThumbManagerOrDefault.call(this)}
    </div>;
  }
}

export default Photography;
