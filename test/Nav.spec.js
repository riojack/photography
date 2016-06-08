import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Nav from '../src/Nav';

describe('NavManager Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<Nav {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      group: chance.word(),
      collections: [
        {name: chance.word()},
        {name: chance.word()},
        {name: chance.word()}
      ]
    };

    render(viewProps);
  });

  it('should be a nav HTML type', () => {
    expect(element.type()).to.equal('nav');
  });

  it('should have a css class of "navigation-set"', () => {
    expect(element.props()).to.have.property('className', 'navigation-set');
  })

  it('should have an h4 child with the group name in it', () => {
    let groupNameEl = element.children().at(0);

    expect(groupNameEl.type()).to.equal('h4');
    expect(groupNameEl.children().node).to.equal(viewProps.group);
  });

  it('should render a UL with LIs for each item in the collection', () => {
    let collectionsList = element.children().at(1),
      listItems = collectionsList.children('li');

    expect(collectionsList.type()).to.equal('ul');
    expect(listItems).to.have.length(viewProps.collections.length);
  });

  it('should render the collection name for each LI', () => {
    let collectionsList = element.children().at(1),
      listItems = collectionsList.children('li');

    viewProps.collections.forEach((c, i) => {
      expect(listItems.at(i).children().node, `At index ${i}`).to.equal(c.name);
    });
  });
});
