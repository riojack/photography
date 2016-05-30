import ThumbCollection from '../src/ThumbCollection';
import Thumb from '../src/Thumb';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';

describe('ThumbCollection Tests', () => {
  let container,
    component,
    node,
    viewProps,
    chance,

    heading,
    thumbs;

  function doRender(props) {
    let element = <ThumbCollection {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);

    [heading] = node.childNodes;
    thumbs = ReactTestUtils.scryRenderedComponentsWithType(component, Thumb);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      name: chance.sentence(),
      collection: [
        {
          name: chance.word(),
          backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
          backgroundPosition: {
            x: chance.integer({min: 1, max: 5}),
            y: chance.integer({min: 1, max: 5})
          },
          height: chance.integer({min: 25, max: 50})
        }
      ]
    };

    doRender(viewProps);
  });

  it('should render as a section with a css class of "photo-thumb-collection"', () => {
    expect(node.tagName).to.equal('SECTION');
    expect(node.getAttribute('class')).to.equal('photo-thumb-collection');
  });

  it('should render an H3 as its first child with the props.name as its textContent', () => {
    expect(heading.tagName).to.equal('H3');
    expect(heading.textContent).to.equal(viewProps.name);
  });

  it('should render each props.collection item as a Thumb', () => {
    expect(thumbs).to.have.length(viewProps.collection.length);
  });

  it('should pass each props.collection item as props to the rendered Thumb', () => {
    thumbs.forEach((t, i) => expect(t.props).to.eql(viewProps.collection[i]));
  });

  it('should set the data-name attribute to props.name', () => {
    expect(node.getAttribute('data-name')).to.equal(viewProps.name);
  });

  it('should set the defaultProps as expected', () => {
    expect(ThumbCollection.defaultProps).to.eql({
      name: 'This collection has no name',
      collection: []
    });
  });
});
