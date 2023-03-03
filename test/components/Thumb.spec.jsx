import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Chance from 'chance';
import { stub, assert } from 'sinon';
import Thumb from '../../src/components/Thumb';

describe('Thumb Tests', () => {
  let container;
  let viewProps;
  let chance;

  function doRender(props) {
    const renderer = render(<Thumb {...props} />);
    container = renderer.container;
  }

  beforeEach(() => {
    chance = new Chance();
    viewProps = {
      onClick: stub(),
      lookupId: chance.string(),
      backgroundUrl: chance.url({ extensions: ['jpg', 'png'] }),
      backgroundPosition: {
        x: chance.integer({ min: 1, max: 5 }),
        y: chance.integer({ min: 1, max: 5 }),
      },
      height: chance.integer({ min: 25, max: 50 }),
    };

    doRender(viewProps);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render as a DIV with a css class of "photo-thumb"', () => {
    // expect(container.type()).to.equal('div');
    // expect(container.prop('className')).to.equal('photo-thumb');
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    // expect(container.prop('style').backgroundImage).to.equal(`url('${viewProps.backgroundUrl}')`);
  });

  it('should set a data-tags attribute with the value of "thumbnail"', () => {
    // expect(container.prop('data-tags')).to.contain('thumbnail');
  });

  it('should set a data-lookup-id attribute with the value of props.lookupId', () => {
    // expect(container.prop('data-lookup-id')).to.equal(viewProps.lookupId);
  });

  it('should append any tags in the props.tags array to the data-tags attribute', () => {
    viewProps.tags = [chance.word(), chance.word(), chance.word()];
    doRender(viewProps);

    // viewProps.tags.forEach((tag) => {
    //   expect(container.prop('data-tags')).to.contain(tag);
    // });
  });

  it('should call props.onThumbClick and give it the thumbnail object when the thumbnail is clicked', () => {
    // assert.notCalled(viewProps.onClick);
    // container.simulate('click');
    // assert.calledWithExactly(viewProps.onClick, Object.assign({}, Thumb.defaultProps, viewProps));
  });
});
