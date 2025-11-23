import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import TransitionableThumb from '../../src/components/TransitionableThumb';

describe('TransitionableThumb Tests', () => {
  let viewProps;
  let clickHandler;

  function buildNewComponentProps(id = 1) {
    return {
      onClick: (props) => { clickHandler = props; },
      lookupId: `lookup-${id}`,
      tags: ['tag1', 'tag2', 'tag3'],
      image: `https://example.com/image${id}.jpg`,
      name: `image-${id}`,
      backgroundUrl: `https://example.com/bg${id}.jpg`,
      backgroundPosition: { x: 2, y: 3 },
      height: 30,
    };
  }

  beforeEach('set up', () => {
    clickHandler = null;
    viewProps = buildNewComponentProps();
  });

  describe('characterization', () => {
    it('should have a className of "transitionable-photo-thumb"', () => {
      const { container } = render(<TransitionableThumb {...viewProps} />);
      const element = container.querySelector('.transitionable-photo-thumb');
      expect(element).to.exist;
    });

    it('should have left-shark followed by right-shark', () => {
      const { container } = render(<TransitionableThumb {...viewProps} />);
      const leftShark = container.querySelector('.left-shark');
      const rightShark = container.querySelector('.right-shark');
      expect(leftShark).to.exist;
      expect(rightShark).to.exist;
    });
  });

  describe('rendering behavior', () => {
    it('should render the image in the left-shark div first', () => {
      const { container } = render(<TransitionableThumb {...viewProps} />);
      const leftShark = container.querySelector('.left-shark');
      expect(leftShark.style.backgroundImage).to.equal(`url("${viewProps.backgroundUrl}")`);
    });

    it('should clear left-shark div\'s image on a second render and render the image on the right-shark div', () => {
      const newProps = buildNewComponentProps(2);
      const { container, rerender } = render(<TransitionableThumb {...viewProps} />);
      
      rerender(<TransitionableThumb {...newProps} />);

      const leftShark = container.querySelector('.left-shark');
      const rightShark = container.querySelector('.right-shark');

      expect(leftShark.style.backgroundImage).to.equal('');
      expect(rightShark.style.backgroundImage).to.equal(`url("${newProps.backgroundUrl}")`);
    });

    it('should clear right-shark div\'s image on a third render and render the image on the left-shark div', () => {
      const secondProps = buildNewComponentProps(2);
      const thirdProps = buildNewComponentProps(3);
      const { container, rerender } = render(<TransitionableThumb {...viewProps} />);
      
      rerender(<TransitionableThumb {...secondProps} />);
      rerender(<TransitionableThumb {...thirdProps} />);

      const leftShark = container.querySelector('.left-shark');
      const rightShark = container.querySelector('.right-shark');

      expect(leftShark.style.backgroundImage).to.equal(`url("${thirdProps.backgroundUrl}")`);
      expect(rightShark.style.backgroundImage).to.equal('');
    });

    it('should not switch sharks if the image does not change', () => {
      const { container, rerender } = render(<TransitionableThumb {...viewProps} />);
      
      rerender(<TransitionableThumb {...viewProps} />);

      const leftShark = container.querySelector('.left-shark');
      const rightShark = container.querySelector('.right-shark');

      expect(leftShark.style.backgroundImage).to.equal(`url("${viewProps.backgroundUrl}")`);
      expect(rightShark.style.backgroundImage).to.equal('');
    });

    it('should set "thumbnail" and any other tags in a data-tags attribute', () => {
      const { container } = render(<TransitionableThumb {...viewProps} />);
      const element = container.querySelector('.transitionable-photo-thumb');
      const expectedTags = ['thumbnail'].concat(viewProps.tags).join(' ');
      expect(element.getAttribute('data-tags')).to.equal(expectedTags);
    });
  });

  describe('click behavior', () => {
    it('should fire props.onClick and pass its props as parameters', async () => {
      const user = userEvent.setup();
      const { container } = render(<TransitionableThumb {...viewProps} />);
      const element = container.querySelector('.transitionable-photo-thumb');
      
      expect(clickHandler).to.be.null;
      await user.click(element);
      expect(clickHandler).to.not.be.null;
      // Check that all provided props match
      Object.keys(viewProps).forEach(key => {
        expect(clickHandler[key]).to.deep.equal(viewProps[key]);
      });
    });
  });
});
