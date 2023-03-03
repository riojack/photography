import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Chance from 'chance';
import { assert, stub } from 'sinon';
import TransitionableThumb from '../src/components/TransitionableThumb';
import App from '../src/App';
import urlJoin from 'url-join';
import renderer from 'react-test-renderer';

describe.skip('App Tests', () => {
  let viewProps;
  let container;
  let chance;
  let listOfGroups;

  const CACHE_URL = 'http://www.example.com/cache';

  function _toBase64(val) {
    return (Buffer.from(val, 'utf8')).toString('base64');
  }

  function makeItem() {
    return {
      name: `some-name-${chance.word()}-${chance.string()}`,
      image: `./foo/bar/${chance.word()}.jpg`,
      backgroundUrl: `./foo/bar/${chance.word()}.jpg`,
    };
  }

  function makeCollectionWithItems() {
    return {
      collection: chance.sentence({ words: 5 }),
      time: chance.timestamp(),
      items: chance.n(makeItem, chance.integer({
        min: 5,
        max: 10,
      })),
    };
  }

  function makeGroupWithCollections() {
    return {
      group: `${chance.word()} ${chance.word()} ${chance.word()}`,
      collections: chance.n(makeCollectionWithItems, chance.integer({
        min: 3,
        max: 8,
      })),
    };
  }

  function doRender(props) {
    const renderer = render(<App {...props} />);
    container = renderer.container;
  }

  beforeEach(() => {
    chance = new Chance();
    global.btoa = _toBase64;

    listOfGroups = chance.n(makeGroupWithCollections, chance.integer({
      min: 3,
      max: 8,
    }));

    viewProps = {
      cacheUrl: CACHE_URL,
      groups: listOfGroups,
      whenBannerClicked: stub(),
      whenCollapseToGroupsClicked: stub(),
      whenCollectionNameClicked: stub(),
    };

    doRender(viewProps);
  });

  afterEach(() => {
    delete global.btoa;
    cleanup();
  });

  it('should be a div', () => {
    // expect(container.type())
    //   .to
    //   .equal('div');
  });

  it('should have a className of "iowa-light-application"', () => {
    // expect(container.props())
    //   .to
    //   .have
    //   .property('className')
    //   .that
    //   .equals('iowa-light-application');
  });

  describe('when rendering and interacting with the Iowa Light banner', () => {
    it('should have a child that is a div with a className of "iowa-light-banner"', () => {
      // expect(container.children('div')
      //   .at(0)
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('iowa-light-banner');
    });

    it('should call props.whenBannerClicked when the banner is clicked', () => {
      // assert.notCalled(viewProps.whenBannerClicked);
      // container.children('.iowa-light-banner')
      //   .simulate('click');
      // assert.calledOnce(viewProps.whenBannerClicked);
    });

    it('should call props.whenBannerClicked when the banner is touched (onTouchEnd)', () => {
      // assert.notCalled(viewProps.whenBannerClicked);
      // container.children('.iowa-light-banner')
      //   .simulate('touchend');
      // assert.calledOnce(viewProps.whenBannerClicked);
    });
  });

  describe('when rendering and interacting with the site, group, and photography controls', () => {
    it('should have a child that is a div with a className of "iowa-light-controls"', () => {
      // expect(container.children('div')
      //   .at(1)
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('iowa-light-controls');
    });

    it('should have an H4 inside with the words "By collection"', () => {
      // expect(container.children('.iowa-light-controls')
      //   .children('h4')
      //   .text())
      //   .to
      //   .equal('By collection');
    });

    it('should call props.whenCollapseToGroupsClicked when clicked', () => {
      // assert.notCalled(viewProps.whenCollapseToGroupsClicked);
      // container.children('.iowa-light-controls')
      //   .simulate('click');
      // assert.calledOnce(viewProps.whenCollapseToGroupsClicked);
    });

    it('should call props.whenCollapseToGroupsClicked when it is touched (onTouchEnd)', () => {
      // assert.notCalled(viewProps.whenCollapseToGroupsClicked);
      // container.children('.iowa-light-controls')
      //   .simulate('touchend');
      // assert.calledOnce(viewProps.whenCollapseToGroupsClicked);
    });
  });

  describe('when rendering and interacting with photograph groups', () => {
    it('should have another child that is an OL with the className "photo-groups"', () => {
      // expect(container.children('ol'))
      //   .to
      //   .have
      //   .length(1);
      // expect(container.children('ol')
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('photo-groups');
    });

    it('should have an LI for each group in the OL', () => {
      // expect(container.children('ol')
      //   .children())
      //   .to
      //   .have
      //   .length(viewProps.groups.length);
      // expect(container.children('ol')
      //   .children('li'))
      //   .to
      //   .have
      //   .length(viewProps.groups.length);
    });

    it('should have one OL with the className "group-collections" and it should be inside the group LI that will '
      + 'contain each collection', () => {
      // expect(container.children('ol')
      //   .children('li')
      //   .children('ol'))
      //   .to
      //   .have
      //   .length(viewProps.groups.length);
      // expect(container.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .at(0)
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('group-collections');
    });

    it('should have an LI inside the collection OL for each collection', () => {
      const expectedLiCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

      // expect(container.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li'))
      //   .to
      //   .have
      //   .length(expectedLiCount);
    });

    it('should have an OL with a className "collection-items", a data-item-count attribute with item count value, '
      + 'and it should be inside the collection OL LIs that will contain each item', () => {
      const expectedOlCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

      // const actualOrderedListOfItems = element.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li')
      //   .children('ol');
      // expect(actualOrderedListOfItems)
      //   .to
      //   .have
      //   .length(expectedOlCount);
      // expect(actualOrderedListOfItems.at(0)
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('collection-items');
      // expect(actualOrderedListOfItems.at(0)
      //   .props())
      //   .to
      //   .have
      //   .property('data-item-count')
      //   .that
      //   .equals(listOfGroups[0].collections[0].items.length);
    });

    it('should have an LI inside the OL inside the collection OL LIs for each item', () => {
      // const expectedLiCount = viewProps.groups.reduce(
      //   (pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0),
      //   0,
      // );

      // expect(container.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li'))
      //   .to
      //   .have
      //   .length(expectedLiCount);
    });

    it('should have an H4 with className "collection-name-and-time" and text that matches collection name followed '
      + 'by a date-like string', () => {
      // const colNameDate = element.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li')
      //   .children('div')
      //   .children('h4');

      // expect(colNameDate.at(0)
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('collection-name-and-time');

      // expect(colNameDate.children()
      //   .at(0)
      //   .text()
      //   .trim())
      //   .to
      //   .match(/[a-z0-9\s]+: [a-z]+ [0-9]+, [0-9]+/gi);
    });

    it('should have one TransitionableThumb for each item in each collection in each group', () => {
      const expectedThumbCount = viewProps.groups.reduce(
        (pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0),
        0,
      );

      // expect(container.children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li')
      //   .children('ol')
      //   .children('li')
      //   .children(TransitionableThumb))
      //   .to
      //   .have
      //   .length(expectedThumbCount);
    });

    it('should pass each item as props to each TransitionableThumb', () => {
      // container
      //   .children('ol')
      //   .children('li')
      //   .forEach((g, gi) => {
      //     const group = listOfGroups[gi];
      //     g.children('ol')
      //       .children('li')
      //       .forEach((c, ci) => {
      //         const collection = group.collections[ci];
      //         c.children('ol')
      //           .children('li')
      //           .forEach((i, ii) => {
      //             const item = collection.items[ii];
      //             const expectedLookupId = `${_toBase64(item.name)}`
      //               + `|${_toBase64(`${collection.time}`)}`
      //               + `|${_toBase64(collection.collection)}`
      //               + `|${_toBase64(group.group)}`;
      //             const expectedProps = Object.assign({}, item, {
      //               lookupId: expectedLookupId,
      //             });
      //             const thumb = i.children(TransitionableThumb);
      //             const thumbProps = Object.assign({}, thumb.props());

      //             delete thumbProps.image;
      //             delete thumbProps.backgroundUrl;
      //             delete expectedProps.image;
      //             delete expectedProps.backgroundUrl;

      //             expect(thumbProps, `Group ${gi} collection ${ci} item ${ii}`)
      //               .to
      //               .eql(expectedProps);
      //           });
      //       });
      //   });
    });

    it('should update item.image and item.backgroundUrl if the cache location is specified', () => {
    //   container
    //     .children('ol')
    //     .children('li')
    //     .forEach((g, gi) => {
    //       const group = listOfGroups[gi];
    //       g.children('ol')
    //         .children('li')
    //         .forEach((c, ci) => {
    //           const collection = group.collections[ci];
    //           c.children('ol')
    //             .children('li')
    //             .forEach((i, ii) => {
    //               const item = collection.items[ii];
    //               const thumb = i.children(TransitionableThumb);
    //               const image_url = item.image;
    //               const background_url = item.backgroundUrl;
    //               const expected_image_url = urlJoin(CACHE_URL, image_url.replace('./', ''));
    //               const expected_backround_url = urlJoin(CACHE_URL, background_url.replace('./', ''));

    //               expect(thumb.props().image, `Group ${gi} collection ${ci} item ${ii}.image`)
    //                 .to
    //                 .eql(expected_image_url);
    //               expect(thumb.props().backgroundUrl, `Group ${gi} collection ${ci} item ${ii}.backgroundUrl`)
    //                 .to
    //                 .eql(expected_backround_url);
    //             });
    //         });
    //     });
    });
  });

  describe('when rendering only collection names from groups', () => {
    let collectionNames;
    let collectionCount;

    beforeEach(() => {
    //   collectionNames = viewProps.groups.reduce((prevGroup, group) => {
    //     const names = group.collections.map(collection => collection.collection);
    //     return prevGroup.concat(names);
    //   }, []);
    //   collectionCount = collectionNames.length;

    //   viewProps.limitRenderTo = 'collectionNames';
    //   doRender(viewProps);
    });

    it('should render OL with a className of "collection-names-only" when limited to collection names', () => {
      // expect(container.children('ol'))
      //   .to
      //   .have
      //   .length(1);
      // expect(container.children('ol')
      //   .props())
      //   .to
      //   .have
      //   .property('className')
      //   .that
      //   .equals('collection-names-only');
    });

    it('should have an LI for each collection among all groups', () => {
      // expect(container.children('ol')
      //   .children('li'))
      //   .to
      //   .have
      //   .length(collectionCount);
    });

    it('should place each collection\'s name in an H3 inside the LIs', () => {
      // const actualCollectionNames = container.children('ol')
      //   .children('li')
      //   .children('h3')
      //   .map(element => element.text());

      // expect(actualCollectionNames)
      //   .to
      //   .have
      //   .members(collectionNames);
    });

    it('should register a click handler on each H3 that fires the props.whenCollectionNameClicked handler with the '
      + 'collection name', () => {
      // assert.notCalled(viewProps.whenCollectionNameClicked);

      // container.children('ol')
      //   .children('li')
      //   .children('h3')
      //   .forEach((h3) => {
      //     h3.simulate('click');
      //     assert.calledOnce(viewProps.whenCollectionNameClicked);
      //     assert.calledWithExactly(viewProps.whenCollectionNameClicked, h3.text());

      //     viewProps.whenCollectionNameClicked.reset();
      //   });
    });

    it('should register a touch (onTouchEnd) handler on each H3 that fires the props.whenCollectionNameClicked '
      + 'handler with the collection name', () => {
      // assert.notCalled(viewProps.whenCollectionNameClicked);

      // container.children('ol')
      //   .children('li')
      //   .children('h3')
      //   .forEach((h3) => {
      //     h3.simulate('touchend');
      //     assert.calledOnce(viewProps.whenCollectionNameClicked);
      //     assert.calledWithExactly(viewProps.whenCollectionNameClicked, h3.text());

      //     viewProps.whenCollectionNameClicked.reset();
      //   });
    });
  });
});
