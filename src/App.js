import React from 'react';
import Thumb from './components/Thumb';

function getItems(items) {
  return items.map((item, key) => {
    return <li key={`item-${key}`}>
      <Thumb {...item} />
    </li>;
  });
}

function getCollections(collections) {
  return collections.map((c, key) => {
    return <li key={`collection-${key}`}>
      <ol>{ getItems(c.items) }</ol>
    </li>;
  });
}

function getGroups(groups) {
  return groups.map((g, key) => {
    return <li key={`group-${key}`}>
      <ol>{ getCollections(g.collections) }</ol>
    </li>;
  });
}

class App extends React.Component {
  render() {
    return <div className="iowa-light-application">
      <ol>{ getGroups(this.props.groups) }</ol>
    </div>;
  }
}

export default App;
