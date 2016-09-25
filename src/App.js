import React from 'react';
import Thumb from './components/Thumb';

const months = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

function getItems(items) {
  return items.map((item, key) => {
    return <li key={`item-${key}`}>
      <Thumb {...item} />
    </li>;
  });
}

function getCollections(group, collections) {
  return collections.map((c, key) => {
    let datetime = new Date(c.time);
    return <li key={`collection-${key}`}>
      <h4 className="collection-name-and-time">{`${group.group}: ${months[datetime.getMonth()]} ${datetime.getDate()}, ${datetime.getFullYear()}`}</h4>
      <ol className="collection-items">{ getItems(c.items) }</ol>
    </li>;
  });
}

function getGroups(groups) {
  return groups.map((g, key) => {
    return <li key={`group-${key}`}>
      <ol className="group-collections">{ getCollections(g, g.collections) }</ol>
    </li>;
  });
}

function getCountOfCollectionsFromGroups(groups) {
  return groups.reduce((countAccumulator, group) => {
    return countAccumulator + group.collections.length;
  }, 0);
}

function getAllCollectionItems(groups) {
  let collectionCount = getCountOfCollectionsFromGroups(groups),
    collectionItems = [];

  for (var i = 0; i < collectionCount; i++) {
    collectionItems.push(<li key={`collection-item-${i}`} />);
  }

  return collectionItems;
}

function getPhotoThingsToRender(groups, limitRenderTo) {
  if (limitRenderTo === 'collectionNames') {
    return <ol className="collection-names-only">{getAllCollectionItems(groups)}</ol>;
  }
  return <ol className="photo-groups">{ getGroups(groups) }</ol>;
}

class App extends React.Component {
  componentDidMount() {
    require('./sass/app.scss');
  }

  render() {
    return <div className="iowa-light-application">
      <div className="iowa-light-banner"
           onClick={this.props.whenBannerClicked}
           onTouchEnd={this.props.whenBannerClicked}>
        <h1>Iowa Light</h1>
      </div>
      <div className="iowa-light-controls"
           onClick={this.props.whenCollapseToGroupsClicked}
           onTouchEnd={this.props.whenCollapseToGroupsClicked}/>
      {getPhotoThingsToRender(this.props.groups, this.props.limitRenderTo)}
    </div>;
  }
}

export default App;
