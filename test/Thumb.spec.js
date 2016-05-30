import Thumb from '../src/Thumb';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';

describe('Thumb Tests', () => {
  let container,
    component,
    node,
    viewProps,
    chance;

  function doRender(props) {
    let element = <Thumb {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      name: chance.sentence(),
      backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
      backgroundPosition: {
        x: chance.integer({min: 1, max: 5}),
        y: chance.integer({min: 1, max: 5})
      },
      height: chance.integer({min: 25, max: 50})
    };

    doRender(viewProps);
  });

  it('should render as a div with a css class of "photo-thumb"', () => {
    expect(node.tagName).to.equal('DIV');
    expect(node.getAttribute('class')).to.equal('photo-thumb');
  });

  it('should provide default prop values as expected', () => {
    expect(Thumb.defaultProps).to.eql({
      name: 'No name for photo',
      backgroundUrl: '',
      backgroundPosition: {x: 0, y: 0},
      height: 65
    });
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    expect(node.style.backgroundImage).to.equal(`url(${viewProps.backgroundUrl})`);
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    expect(node.style.backgroundPosition).to.equal(`${viewProps.backgroundPosition.x}px ${viewProps.backgroundPosition.y}px`);
  });

  it('should set style.height to the value of props.height', () => {
    expect(node.style.height).to.equal(`${viewProps.height}px`);
  });

  it('should set the data-name attribute to the value of props.name', () => {
    expect(node.getAttribute('data-name')).to.equal(viewProps.name);
  });
});
