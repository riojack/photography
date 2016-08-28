import React from 'react';
import CollectionNav from './CollectionNav';
import GroupNav from './GroupNav';

function getCollectionNav() {
  return <CollectionNav {...this.props.application.selectedGroup} application={this.props.application} />;
}

function getGroupNav() {
  return <GroupNav groups={this.props.groups} application={this.props.application} />;
}

function getNav() {
  if (this.props.groups) {
    if (this.props.application.selectedGroup) {
      return getCollectionNav.call(this);
    }
    return getGroupNav.call(this);
  }
}

class NavManager extends React.Component {
  componentDidMount() {
    require('../../sass/nav-manager.scss');
  }

  render() {
    return <div className="navigation-manager">
      {getNav.call(this)}
    </div>;
  }
}

export default NavManager;
