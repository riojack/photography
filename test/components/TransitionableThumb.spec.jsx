import Chance from 'chance';
import { stub, assert } from 'sinon';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import TransitionableThumb from '../../src/components/TransitionableThumb';

describe.skip('TransitionableThumb Tests', () => {
  let container;
  let viewProps;
  let chance;

  function doRender(props) {
    const rendered = render(<TransitionableThumb {...props} />);
    container = rendered.container;
  }

  function buildNewComponentProps() {
    return {
      onClick: stub(),
      lookupId: chance.string(),
      tags: [chance.word(), chance.word(), chance.word()],
      backgroundUrl: chance.url({ extensions: ['jpg', 'png'] }),
      backgroundPosition: {
        x: chance.integer({ min: 1, max: 5 }),
        y: chance.integer({ min: 1, max: 5 }),
      },
      height: chance.integer({ min: 25, max: 50 }),
    };
  }

  beforeEach(() => {
    chance = new Chance();
    viewProps = buildNewComponentProps();

    doRender(viewProps);
  });

  afterEach(() => {
    container = null;
    cleanup();
  });

  describe('rendering behavior', () => {
    it('should render the image in the left-shark div first', () => {
      const leftShark = container.querySelector('.left-shark');

      // expect(leftShark.props()).to.have.property('style')
      //   .that.deep.equals({ backgroundImage: `url("${viewProps.backgroundUrl}")` });
    });

    it('should clear left-shark div\'s image on a second render and render the image on the right-shark div', () => {
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = container.find('.left-shark');
      const rightShark = container.find('.right-shark');

      // expect(leftShark.props()).to.not.have.property('style');

      // expect(rightShark.props()).to.have.property('style')
      //   .that.deep.equals({ backgroundImage: `url("${newProps.backgroundUrl}")` });
    });

    it('should clear right-shark div\'s image on a third render and render the image on the left-shark div', () => {
      doRender(buildNewComponentProps());
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = container.find('.left-shark');
      const rightShark = container.find('.right-shark');

      // expect(leftShark.props()).to.have.property('style')
      //   .that.deep.equals({ backgroundImage: `url("${newProps.backgroundUrl}")` });

      // expect(rightShark.props()).to.not.have.property('style');
    });

    it('should not switch sharks if the image does not change', () => {
      doRender(viewProps);

      const leftShark = container.find('.left-shark');
      const rightShark = container.find('.right-shark');

      // expect(leftShark.props()).to.have.property('style')
      //   .that.deep.equals({ backgroundImage: `url("${viewProps.backgroundUrl}")` });

      // expect(rightShark.props()).to.not.have.property('style');
    });

    it('should set "thumbnail" and any other tags in a data-tags attribute', () => {
      const expectedTags = ['thumbnail'].concat(viewProps.tags).join(' ');
      // expect(container.props()).to.have.property('data-tags')
      //   .that.equals(expectedTags);
    });
  });

  describe('click behavior', () => {
    it('should fire props.onClick and pass its props as parameters', () => {
      // assert.notCalled(viewProps.onClick);
      // container.simulate('click');
      // assert.calledWithExactly(viewProps.onClick, viewProps);
    });
  });
});
