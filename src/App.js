import React from 'react';
import Thumb from './components/Thumb';

let urljoin = require('url-join');

const months = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

function _toBase64(val) {
  return btoa(val);
}

function getItems(items, collection, group, extras) {
  return items.map((item, key) => {
    let extraProps = {
        lookupId: _toBase64(item.name) + '|' + _toBase64(`${collection.time}`) + '|' + _toBase64(collection.collection) + '|' + _toBase64(group.group)
      },
      overwrites = {
        image: urljoin(extras.cacheUrl, item.image.replace('./', '')),
        backgroundUrl: urljoin(extras.cacheUrl, item.backgroundUrl.replace('./', ''))
      },
      thumbProps = Object.assign({}, item, extraProps, overwrites);

    return <li key={`item-${key}`}>
      <Thumb {...thumbProps} />
    </li>;
  });
}

function getCollections(group, collections, extras) {
  return collections.map((c, key) => {
    let datetime = new Date(c.time);

    return <li key={`collection-${key}`}>
      <div className="collection-info-container">
        <h4
          className="collection-name-and-time">{`${group.group}: ${months[datetime.getMonth()]} ${datetime.getDate()}, ${datetime.getFullYear()}`}</h4>
      </div>
      <ol className="collection-items" data-item-count={c.items.length}>{ getItems(c.items, c, group, extras) }</ol>
    </li>;
  });
}

function getGroups(groups, extras) {
  return groups.map((g, key) => {
    return <li key={`group-${key}`}>
      <ol className="group-collections">{ getCollections(g, g.collections, extras) }</ol>
    </li>;
  });
}

function getCollectionsFromGroups(groups) {
  return groups.reduce((collectionAccumulator, group) => {
    return collectionAccumulator.concat(group.collections);
  }, []);
}

function getPhotoThingsToRender(props) {
  let groups = props.groups, 
    limitRenderTo = props.limitRenderTo, 
    clickHandler = props.whenCollectionNameClicked,
    extras = { cacheUrl: props.cacheUrl };
  if (limitRenderTo === 'collectionNames') {
    let collections = getCollectionsFromGroups(groups);

    return <ol className="collection-names-only">{
      collections.map((collection, collectionNumber) => <li key={`collection-item-${collectionNumber}`}>
        <h3
          onClick={() => clickHandler(collection.collection)}
          onTouchEnd={() => clickHandler(collection.collection)}>
          {collection.collection}
        </h3>
      </li>)
    }</ol>;
  }

  return <ol className="photo-groups">{ getGroups(groups, extras) }</ol>;
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
           onTouchEnd={this.props.whenCollapseToGroupsClicked}>
        <h4>By collection</h4>
      </div>
      {getPhotoThingsToRender(this.props)}
    </div>;
  }
}

export default App;
