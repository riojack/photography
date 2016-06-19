import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import NavManager from '../src/NavManager';
import Nav from '../src/Nav';

describe('NavManager Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<NavManager {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        onCollectionClicked: stub()
      },
      groups: [
        {
          group: chance.word(),
          collections: [{}, {}, {}]
        }, {
          group: chance.word(),
          collections: [{}, {}, {}]
        }, {
          group: chance.word(),
          collections: [{}, {}, {}]
        }
      ]
    };

    render(viewProps);
  });

  it('should be a section HTML type', () => {
    expect(element.type()).to.equal('section');
  });

  it('should have a css class of "navigation-manager', () => {
    expect(element.props()).to.have.property('className', 'navigation-manager');
  });

  it('should have NavManager components for each group item', () => {
    expect(element.children(Nav)).to.have.length(viewProps.groups.length);
  });

  it('should pass to each NavManager the associated group as props', () => {
    element.children().forEach((n, i) => {
      let expectedProps = Object.assign({}, viewProps.groups[i], {onCollectionClicked: viewProps.application.onCollectionClicked});
      expect(n.props()).to.eql(expectedProps);
    });
  });
});
