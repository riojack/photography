import React from 'react';

class Nav extends React.Component {
  componentDidMount() {
    require('../sass/nav.scss');
  }

  render() {
    return <nav className="navigation-set">
      <h4>{this.props.group}</h4>
      <ul>
        {this.props.collections.map((c, i) => <li key={i}>{c.collection}</li>)}
      </ul>
    </nav>;
  }
}

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
