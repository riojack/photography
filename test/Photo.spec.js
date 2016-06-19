import Photo from '../src/Photo';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';

describe('Photo Tests', () => {
  let container,
    component,
    node,
    viewProps,
    chance,
    img;

  function doRender(props) {
    let element = <Photo {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);
    [img] = node.childNodes;
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      image: {
        src: chance.url({extensions: ['jpg', 'png']})
      },
      focusing: chance.bool()
    };

    doRender(viewProps);
  });

  it('should render as a SECTION with the CSS class "image-viewer"', () => {
    expect(node.tagName).to.equal('SECTION');
    expect(node.getAttribute('class')).to.equal('image-viewer');
  });

  it('should have an IMG element inside with a src attribute of props.image.src', () => {
    expect(img.getAttribute('src')).to.equal(viewProps.image.src);
  });

  it('should set "data-focusing" attribute on the image', () => {
    expect(img.getAttribute('data-focusing')).to.equal(viewProps.focusing.toString());
  });

  it('should not set the "src" attribute if props.image.src is falsy', () => {
    viewProps.image.src = '';
    doRender(viewProps);

    expect(img.getAttribute('src')).to.equal(null);
  });

  it('should set "data-scale-mode" to "small" when first rendering', () => {
    expect(img.getAttribute('data-scale-mode')).to.equal('small');
  });

  it('should set "data-scale-mode" to "mid" when the img is clicked', () => {
    ReactTestUtils.Simulate.click(img);
    [img] = node.childNodes;

    expect(img.getAttribute('data-scale-mode')).to.equal('mid');
  });

  it('should set "data-scale-mode" to "full" when the img is clicked twice', () => {
    ReactTestUtils.Simulate.click(img);
    ReactTestUtils.Simulate.click(img);
    [img] = node.childNodes;

    expect(img.getAttribute('data-scale-mode')).to.equal('full');
  });

  it('should set "data-scale-mode" to "small" when the img is clicked three times', () => {
    ReactTestUtils.Simulate.click(img);
    ReactTestUtils.Simulate.click(img);
    ReactTestUtils.Simulate.click(img);
    [img] = node.childNodes;

    expect(img.getAttribute('data-scale-mode')).to.equal('small');
  });
});
