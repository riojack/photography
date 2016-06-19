import React from 'react';

function handleClick(group, collection) {
  let clickHandler = this.props.onCollectionClicked;

  clickHandler(group, collection);
}

class Nav extends React.Component {
  componentDidMount() {
    require('../sass/nav.scss');
  }

  render() {
    var group = this.props.group;
    return <nav className="navigation-set">
      <h4>{group}</h4>
      <ul>
        {this.props.collections.map((c, i) => <li key={i} onClick={handleClick.bind(this, group, c.collection)}>{c.collection}</li>)}
      </ul>
    </nav>;
  }
}

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
