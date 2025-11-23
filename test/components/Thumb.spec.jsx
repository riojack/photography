import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import Chance from 'chance';
import { stub, assert } from 'sinon';
import Thumb from '../../src/components/Thumb';

describe('Thumb Tests', () => {
  let viewProps;
  let chance;

  beforeEach('set up', () => {
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
  });

  it('should render as a DIV with a css class of "photo-thumb"', () => {
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');
    expect(element).to.exist;
    expect(element.tagName).to.equal('DIV');
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');
    expect(element.style.backgroundImage).to.include(viewProps.backgroundUrl);
  });

  it('should set a data-tags attribute with the value of "thumbnail"', () => {
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');
    expect(element.getAttribute('data-tags')).to.contain('thumbnail');
  });

  it('should set a data-lookup-id attribute with the value of props.lookupId', () => {
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');
    expect(element.getAttribute('data-lookup-id')).to.equal(viewProps.lookupId);
  });

  it('should append any tags in the props.tags array to the data-tags attribute', () => {
    viewProps.tags = [chance.word(), chance.word(), chance.word()];
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');

    viewProps.tags.forEach((tag) => {
      expect(element.getAttribute('data-tags')).to.contain(tag);
    });
  });

  it('should call props.onThumbClick and give it the thumbnail object when the thumbnail is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Thumb {...viewProps} />);
    const element = container.querySelector('.photo-thumb');
    
    assert.notCalled(viewProps.onClick);
    await user.click(element);
    assert.calledOnce(viewProps.onClick);
    const expectedProps = Object.assign({}, Thumb.defaultProps, viewProps);
    expect(viewProps.onClick.firstCall.args[0]).to.deep.equal(expectedProps);
  });
});
