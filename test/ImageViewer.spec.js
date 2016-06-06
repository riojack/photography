import ImageViewer from '../src/ImageViewer';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';

describe('ThumbManager Tests', () => {
  let container,
    component,
    node,
    viewProps,
    chance,
    img;

  function doRender(props) {
    let element = <ImageViewer {...props} />;

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
});
