import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import ThumbCollectionHeader from '../src/ThumbCollectionHeader';

describe('ThumbCollectionHeader tests', () => {
  let container,
    component,
    node,
    chance,

    viewProps;

  function doRender(props) {
    let element = <ThumbCollectionHeader {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      heading: chance.string()
    };

    doRender(viewProps);
  });

  it('should be a H3 with a data-component attribute value of "thumb-collection-header"', () => {
    expect(node.tagName).to.equal('H3');
    expect(node.getAttribute('data-component')).to.equal('thumb-collection-header');
  });

  it('should render prop.heading in the H3', () => {
    expect(node.textContent).to.equal(viewProps.heading);
  });
});
