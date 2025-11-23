import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import App from '../src/App';

const urljoin = require('url-join').default;

describe('App Tests', () => {
  let viewProps;
  let listOfGroups;
  let bannerClicked;
  let collapseClicked;
  let collectionNameClicked;

  const CACHE_URL = 'http://www.example.com/cache';

  function _toBase64(val) {
    return Buffer.from(val, 'utf8').toString('base64');
  }

  function makeItem(id) {
    return {
      name: `item-${id}`,
      image: `./images/item-${id}.jpg`,
      backgroundUrl: `./images/bg-${id}.jpg`,
    };
  }

  function makeCollectionWithItems(id, itemCount = 5, baseTime = 1609459200) {
    return {
      collection: `Collection ${id}`,
      time: baseTime * 1000, // Milliseconds since epoch
      items: Array.from({ length: itemCount }, (_, i) => makeItem(`${id}-${i}`)),
    };
  }

  function makeGroupWithCollections(id, collectionCount = 3) {
    return {
      group: `Group ${id}`,
      collections: Array.from({ length: collectionCount }, (_, i) => 
        makeCollectionWithItems(`${id}-${i}`, 5, 1609459200 + (id * 100) + i)
      ),
    };
  }

  beforeEach('set up', () => {
    global.btoa = _toBase64;
    bannerClicked = false;
    collapseClicked = null;
    collectionNameClicked = null;

    listOfGroups = [
      makeGroupWithCollections(1),
      makeGroupWithCollections(2),
      makeGroupWithCollections(3),
    ];

    viewProps = {
      cacheUrl: CACHE_URL,
      groups: listOfGroups,
      whenBannerClicked: () => { bannerClicked = true; },
      whenCollapseToGroupsClicked: (val) => { collapseClicked = val; },
      whenCollectionNameClicked: (val) => { collectionNameClicked = val; },
    };
  });

  afterEach(() => {
    delete global.btoa;
  });

  it('should be a div', () => {
    const { container } = render(<App {...viewProps} />);
    const element = container.firstChild;
    expect(element.tagName.toLowerCase())
      .to
      .equal('div');
  });

  it('should have a className of "iowa-light-application"', () => {
    const { container } = render(<App {...viewProps} />);
    const element = container.firstChild;
    expect(element.className)
      .to
      .equal('iowa-light-application');
  });

  describe('when rendering and interacting with the Iowa Light banner', () => {
    it('should have a child that is a div with a className of "iowa-light-banner"', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const firstDiv = element.querySelectorAll('div')[0];
      expect(firstDiv.className)
        .to
        .equal('iowa-light-banner');
    });

    it('should call props.whenBannerClicked when the banner is clicked', async () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const user = userEvent.setup();
      expect(bannerClicked).to.be.false;
      const banner = element.querySelector('.iowa-light-banner');
      await user.click(banner);
      expect(bannerClicked).to.be.true;
    });
  });

  describe('when rendering and interacting with the site, group, and photography controls', () => {
    it('should have a child that is a div with a className of "iowa-light-controls"', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const secondDiv = element.querySelectorAll('div')[1];
      expect(secondDiv.className)
        .to
        .equal('iowa-light-controls');
    });

    it('should have an H4 inside with the words "By collection"', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const controls = element.querySelector('.iowa-light-controls');
      const h4 = controls.querySelector('h4');
      expect(h4.textContent)
        .to
        .equal('By collection');
    });

    it('should call props.whenCollapseToGroupsClicked when clicked', async () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const user = userEvent.setup();
      expect(collapseClicked).to.be.null;
      const controls = element.querySelector('.iowa-light-controls');
      await user.click(controls);
      expect(collapseClicked).to.not.be.null;
    });
  });

  describe('when rendering and interacting with photograph groups', () => {
    it('should have another child that is an OL with the className "photo-groups"', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const photoGroupsOl = element.querySelector('.photo-groups');
      expect(photoGroupsOl).to.exist;
      expect(photoGroupsOl.tagName).to.equal('OL');
    });

    it('should have an LI for each group in the OL', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const photoGroupsOl = element.querySelector('.photo-groups');
      const directChildren = Array.from(photoGroupsOl.children).filter(child => child.tagName === 'LI');
      expect(directChildren.length)
        .to
        .equal(viewProps.groups.length);
    });

    it('should have one OL with the className "group-collections" and it should be inside the group LI that will '
      + 'contain each collection', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const photoGroupsOl = element.querySelector('.photo-groups');
      const groupLis = Array.from(photoGroupsOl.children).filter(child => child.tagName === 'LI');
      const nestedOls = groupLis
        .map(li => Array.from(li.children).find(child => child.tagName === 'OL'))
        .filter(Boolean);
      expect(nestedOls.length)
        .to
        .equal(viewProps.groups.length);
      expect(nestedOls[0].className)
        .to
        .equal('group-collections');
    });

    it('should have an LI inside the collection OL for each collection', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const expectedLiCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

      const photoGroupsOl = element.querySelector('.photo-groups');
      const groupLis = Array.from(photoGroupsOl.children).filter(child => child.tagName === 'LI');
      const groupCollectionOls = groupLis.map(li => li.querySelector('.group-collections')).filter(Boolean);
      const collectionLis = groupCollectionOls
        .flatMap(ol => Array.from(ol.children).filter(child => child.tagName === 'LI'));
      expect(collectionLis.length)
        .to
        .equal(expectedLiCount);
    });

    it('should have an OL with a className "collection-items", a data-item-count attribute with item count value, '
      + 'and it should be inside the collection OL LIs that will contain each item', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const expectedOlCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

      const actualOrderedListOfItems = element.querySelectorAll('.collection-items');
      expect(actualOrderedListOfItems.length)
        .to
        .equal(expectedOlCount);
      expect(actualOrderedListOfItems[0].className)
        .to
        .equal('collection-items');
      expect(parseInt(actualOrderedListOfItems[0].getAttribute('data-item-count')))
        .to
        .equal(listOfGroups[0].collections[0].items.length);
    });

    it('should have an LI inside the OL inside the collection OL LIs for each item', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const expectedLiCount = viewProps.groups.reduce(
        (pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0),
        0,
      );

      const collectionItemsOls = element.querySelectorAll('.collection-items');
      const itemLis = Array.from(collectionItemsOls).flatMap(ol => Array.from(ol.querySelectorAll('li')));
      expect(itemLis.length)
        .to
        .equal(expectedLiCount);
    });

    it('should have an H4 with className "collection-name-and-time" and text that matches collection name followed '
      + 'by a date-like string', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const colNameDate = element.querySelectorAll('.collection-name-and-time');

      expect(colNameDate[0].className)
        .to
        .equal('collection-name-and-time');

      expect(colNameDate[0].textContent.trim())
        .to
        .match(/[a-z0-9\s]+: [a-z]+ [0-9]+, [0-9]+/gi);
    });

    it('should have one TransitionableThumb for each item in each collection in each group', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const expectedThumbCount = viewProps.groups.reduce(
        (pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0),
        0,
      );

      const collectionItemsOls = element.querySelectorAll('.collection-items');
      const itemLis = Array.from(collectionItemsOls).flatMap(ol => Array.from(ol.querySelectorAll('li')));
      expect(itemLis.length)
        .to
        .equal(expectedThumbCount);
    });

    it('should pass each item as props to each TransitionableThumb', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const photoGroupsOl = element.querySelector('ol.photo-groups');
      const groupLis = Array.from(photoGroupsOl.children);
      
      groupLis.forEach((g, gi) => {
        const group = listOfGroups[gi];
        const groupCollectionsOl = g.querySelector('ol.group-collections');
        const collectionLis = Array.from(groupCollectionsOl.children);
        
        collectionLis.forEach((c, ci) => {
          const collection = group.collections[ci];
          const collectionItemsOl = c.querySelector('ol.collection-items');
          const itemLis = Array.from(collectionItemsOl.children);
          
          itemLis.forEach((i, ii) => {
            const item = collection.items[ii];
            const expectedLookupId = `${_toBase64(item.name)}`
              + `|${_toBase64(`${collection.time}`)}`
              + `|${_toBase64(collection.collection)}`
              + `|${_toBase64(group.group)}`;
            
            const thumbDiv = i.querySelector('div');
            const actualName = thumbDiv.getAttribute('data-name');
            const actualLookupId = thumbDiv.getAttribute('data-lookup-id');
            
            expect(actualName, `Group ${gi} collection ${ci} item ${ii} name`)
              .to
              .equal(item.name);
            expect(actualLookupId, `Group ${gi} collection ${ci} item ${ii} lookupId`)
              .to
              .equal(expectedLookupId);
          });
        });
      });
    });

    it('should update item.image and item.backgroundUrl if the cache location is specified', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const photoGroupsOl = element.querySelector('ol.photo-groups');
      const groupLis = Array.from(photoGroupsOl.children);
      
      groupLis.forEach((g, gi) => {
        const group = listOfGroups[gi];
        const groupCollectionsOl = g.querySelector('ol.group-collections');
        const collectionLis = Array.from(groupCollectionsOl.children);
        
        collectionLis.forEach((c, ci) => {
          const collection = group.collections[ci];
          const collectionItemsOl = c.querySelector('ol.collection-items');
          const itemLis = Array.from(collectionItemsOl.children);
          
          itemLis.forEach((i, ii) => {
            const item = collection.items[ii];
            const image_url = item.image;
            const background_url = item.backgroundUrl;
            const expected_image_url = urljoin(CACHE_URL, image_url.replace('./', ''));
            const expected_backround_url = urljoin(CACHE_URL, background_url.replace('./', ''));
            
            const thumbDiv = i.querySelector('div');
            const actualImage = thumbDiv.getAttribute('data-image');
            const leftShark = thumbDiv.querySelector('.left-shark');
            const rightShark = thumbDiv.querySelector('.right-shark');
            const actualBackgroundUrl = leftShark.style.backgroundImage || rightShark.style.backgroundImage;
            
            expect(actualImage, `Group ${gi} collection ${ci} item ${ii}.image`)
              .to
              .include(expected_image_url);
            expect(actualBackgroundUrl, `Group ${gi} collection ${ci} item ${ii}.backgroundUrl`)
              .to
              .include(expected_backround_url);
          });
        });
      });
    });
  });

  describe('when rendering only collection names from groups', () => {
    let collectionNames;
    let collectionCount;

    beforeEach('set up', () => {
      collectionNames = viewProps.groups.reduce((prevGroup, group) => {
        const names = group.collections.map(collection => collection.collection);
        return prevGroup.concat(names);
      }, []);
      collectionCount = collectionNames.length;

      viewProps.limitRenderTo = 'collectionNames';
    });

    it('should render OL with a className of "collection-names-only" when limited to collection names', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const ols = element.querySelectorAll('ol');
      expect(ols.length)
        .to
        .equal(1);
      expect(ols[0].className)
        .to
        .equal('collection-names-only');
    });

    it('should have an LI for each collection among all groups', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const ol = element.querySelector('ol');
      const lis = ol.querySelectorAll('li');
      expect(lis.length)
        .to
        .equal(collectionCount);
    });

    it('should place each collection\'s name in an H3 inside the LIs', () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const ol = element.querySelector('ol');
      const h3s = ol.querySelectorAll('h3');
      const actualCollectionNames = Array.from(h3s).map(h3 => h3.textContent);

      expect(actualCollectionNames)
        .to
        .have
        .members(collectionNames);
    });

    it('should register a click handler on each H3 that fires the props.whenCollectionNameClicked handler with the '
      + 'collection name', async () => {
      const { container } = render(<App {...viewProps} />);
      const element = container.firstChild;
      const user = userEvent.setup();
      expect(collectionNameClicked).to.be.null;

      const ol = element.querySelector('ol');
      const h3s = ol.querySelectorAll('h3');
      
      for (const h3 of h3s) {
        collectionNameClicked = null; // Reset for each click
        await user.click(h3);
        expect(collectionNameClicked).to.equal(h3.textContent);
      }
    });
  });
});
