import Thumb from '../src/Thumb';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

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
      onView: stub(),
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
    expect(Thumb.defaultProps.onView).to.be.a('function');
    expect(Thumb.defaultProps.name).to.equal('No name for photo');
    expect(Thumb.defaultProps.backgroundUrl).to.equal('');
    expect(Thumb.defaultProps.backgroundPosition).to.eql({x: 0, y: 0});
    expect(Thumb.defaultProps.height).to.equal(65);
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

  it('should call props.onView and give it the thumbnail name as an object when the thumbnail is clicked', () => {
    assert.notCalled(viewProps.onView);
    ReactTestUtils.Simulate.click(node);
    assert.calledWithExactly(viewProps.onView, {
      name: viewProps.name
    });
  });
});
