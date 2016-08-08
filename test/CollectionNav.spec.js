import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import CollectionNav from '../src/CollectionNav';

describe('Collection Nav Tests', () => {
  let viewProps,
    element,

    nav,
    unorderedList,

    chance;

  function render(props) {
    element = shallow(<CollectionNav {...props} />);

    nav = element.children().at(0);

    unorderedList = nav.children().at(0);
  }

  beforeEach('set up', () => {
    chance = new Chance();

    viewProps = {
      application: {
        onCollectionClick: stub(),
        onViewGroupsClick: stub()
      },
      group: chance.sentence(),
      collections: [
        {collection: chance.word()},
        {collection: chance.word()},
        {collection: chance.word()}
      ]
    };

    render(viewProps);
  });

  it('should be a DIV element', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a css class of "collection-navigator"', () => {
    expect(element.props()).to.have.property('className', 'collection-navigator');
  });

  it('should have one child', () => {
    expect(element.children()).to.have.length(1);
  });

  it('should have a NAV as its only child', () => {
    expect(nav.type()).to.equal('nav');
  });

  it('should have a UL in the NAV', () => {
    expect(nav.children()).to.have.length(1);
    expect(nav.children().at(0).type()).to.equal('ul');
  });

  it('should have LIs in the UL for each collection', () => {
    expect(unorderedList.children('li')).to.have.length(viewProps.collections.length);
  });

  it('should have an H3 inside each LI that contains the collection\'s name wrapped in an A (anchor)', () => {
    unorderedList.children('li').forEach((li, i) => {
      expect(li.children('h3').at(0).children('a').at(0).children().node, `LI ${i}`).to.equal(viewProps.collections[i].collection);
    });
  });

  it('should call props.application.onCollectionClick when anchors are clicked', () => {
    unorderedList.children('li').forEach((li, i) => {
      assert.notCalled(viewProps.application.onCollectionClick);

      li.children('h3').children('a').simulate('click');

      assert.calledOnce(viewProps.application.onCollectionClick);
      assert.calledWith(viewProps.application.onCollectionClick, viewProps.collections[i]);

      viewProps.application.onCollectionClick.reset();
    });
  });
});
