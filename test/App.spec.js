import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Thumb from '../src/components/Thumb';

import App from '../src/app';

describe('App Tests', () => {
  let viewProps,
    element,

    chance,
    listOfGroups;

  function makeItem() {
    return {
      something: 'i-dont-care-' + chance.word()
    };
  }

  function makeCollectionWithItems() {
    return {
      collection: chance.sentence({words: 5}),
      time: chance.timestamp(),
      items: chance.n(makeItem, chance.integer({min: 5, max: 10}))
    };
  }

  function makeGroupWithCollections() {
    return {
      group: chance.sentence({words: 3}),
      collections: chance.n(makeCollectionWithItems, chance.integer({min: 3, max: 8}))
    }
  }

  function render(props) {
    element = shallow(<App {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();

    listOfGroups = chance.n(makeGroupWithCollections, chance.integer({min: 3, max: 8}));

    viewProps = {
      groups: listOfGroups,
      whenBannerClicked: stub()
    };

    render(viewProps);
  });

  it('should be a div', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a className of "iowa-light-application"', () => {
    expect(element.props()).to.have.property('className')
      .that.equals('iowa-light-application');
  });

  it('should have one child that is a div with a className of "iowa-light-banner"', () => {
    expect(element.children('div')).to.have.length(1);
    expect(element.children('div').props()).to.have.property('className')
      .that.equals('iowa-light-banner');
  });

  it('should call props.whenBannerClicked when the banner is clicked', () => {
    assert.notCalled(viewProps.whenBannerClicked);
    element.children('.iowa-light-banner').simulate('click');
    assert.calledOnce(viewProps.whenBannerClicked);
  });

  it('should call props.whenBannerClicked when the banner is touched (onTouchEnd)', () => {
    assert.notCalled(viewProps.whenBannerClicked);
    element.children('.iowa-light-banner').simulate('touchend');
    assert.calledOnce(viewProps.whenBannerClicked);
  });

  it('should have another child that is an OL with the className "photo-groups"', () => {
    expect(element.children('ol')).to.have.length(1);
    expect(element.children('ol').props()).to.have.property('className')
      .that.equals('photo-groups');
  });

  it('should have an LI for each group in the OL', () => {
    expect(element.children('ol').children()).to.have.length(viewProps.groups.length);
    expect(element.children('ol').children('li')).to.have.length(viewProps.groups.length);
  });

  it('should have one OL with the className "group-collections" and it should be inside the group LI that will contain each collection', () => {
    expect(element.children('ol').children('li').children('ol')).to.have.length(viewProps.groups.length);
    expect(element.children('ol').children('li').children('ol').at(0).props()).to.have.property('className')
      .that.equals('group-collections');
  });

  it('should have an LI inside the collection OL for each collection', () => {
    let expectedLiCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

    expect(element.children('ol').children('li').children('ol').children('li')).to.have.length(expectedLiCount);
  });

  it('should have an OL with a className "collection-items" and it should be inside the collection OL LIs that will contain each item', () => {
    let expectedOlCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.length, 0);

    expect(element.children('ol').children('li').children('ol').children('li').children('ol')).to.have.length(expectedOlCount);
    expect(element.children('ol').children('li').children('ol').children('li').children('ol').at(0).props()).to.have.property('className')
      .that.equals('collection-items');
  });

  it('should have an LI inside the OL inside the collection OL LIs for each item', () => {
    let expectedLiCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0), 0);

    expect(element.children('ol').children('li').children('ol').children('li').children('ol').children('li')).to.have.length(expectedLiCount);
  });

  it('should have one Thumb for each item in each collection in each group', function () {
    let expectedThumbCount = viewProps.groups.reduce((pv, cv) => pv + cv.collections.reduce((pvc, cvc) => pvc + cvc.items.length, 0), 0);

    expect(element.children('ol').children('li').children('ol').children('li').children('ol').children('li').children(Thumb))
      .to.have.length(expectedThumbCount);
  });

  it('should pass each item as props to each Thumb', () => {
    element
      .children('ol')
      .children('li')
      .forEach((g, gi) => {
        var group = listOfGroups[gi];
        g.children('ol')
          .children('li')
          .forEach((c, ci) => {
            var collection = group.collections[ci];
            c.children('ol')
              .children('li')
              .forEach((i, ii) => {
                let item = collection.items[ii],
                  thumb = i.children(Thumb);

                expect(thumb.props(), `Group ${gi} collection ${ci} item ${ii}`).to.eql(item);
              });
          });
      });
  });
});