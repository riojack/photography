import React from 'react';
import Nav from './Nav';

class NavManager extends React.Component {
  render() {
    return <section className="navigation-manager">
      {this.props.groups.map((g, i) => <Nav key={i} {...g} />)}
    </section>;
  }
}

NavManager.propTypes = {};

NavManager.defaultProps = {};

export default NavManager;
