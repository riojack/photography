import Chance from 'chance';
import { stub, assert } from 'sinon';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import TransitionableThumb from '../../src/components/TransitionableThumb';

describe('TransitionableThumb Tests', () => {
  let viewProps;
  let chance;

  function buildNewComponentProps() {
    return {
      onClick: stub(),
      lookupId: chance.string(),
      tags: [chance.word(), chance.word(), chance.word()],
      image: chance.url({ extensions: ['jpg', 'png'] }),
      name: chance.word(),
      backgroundUrl: chance.url({ extensions: ['jpg', 'png'] }),
      backgroundPosition: {
        x: chance.integer({ min: 1, max: 5 }),
        y: chance.integer({ min: 1, max: 5 }),
      },
      height: chance.integer({ min: 25, max: 50 }),
    };
  }

  beforeEach('set up', () => {
    chance = new Chance();
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
      const newProps = buildNewComponentProps();
      const { container, rerender } = render(<TransitionableThumb {...viewProps} />);
      
      rerender(<TransitionableThumb {...newProps} />);

      const leftShark = container.querySelector('.left-shark');
      const rightShark = container.querySelector('.right-shark');

      expect(leftShark.style.backgroundImage).to.equal('');
      expect(rightShark.style.backgroundImage).to.equal(`url("${newProps.backgroundUrl}")`);
    });

    it('should clear right-shark div\'s image on a third render and render the image on the left-shark div', () => {
      const secondProps = buildNewComponentProps();
      const thirdProps = buildNewComponentProps();
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
      
      assert.notCalled(viewProps.onClick);
      await user.click(element);
      assert.calledOnce(viewProps.onClick);
      const firstArg = viewProps.onClick.firstCall.args[0];
      // Check that all provided props match
      Object.keys(viewProps).forEach(key => {
        expect(firstArg[key]).to.deep.equal(viewProps[key]);
      });
    });
  });
});
