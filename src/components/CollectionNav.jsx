import React from 'react';

class CollectionNav extends React.Component {
  componentDidMount() {
    require('sass/collection-nav.scss');
  }

  render() {
    return <div className="collection-navigator">
      <nav>
        <ul>
          {this.props.collections.map((c, i) => {
            return <li key={`${i}-${c.collection}`}>
              <h3><a onClick={this.props.application.onCollectionClick.bind({}, c)}>{c.collection}</a></h3>
            </li>;
          })}
        </ul>
      </nav>
    </div>;
  }
}

export default CollectionNav;
