import TransitionableThumb from '../../src/components/TransitionableThumb';
import Chance from 'chance';
import {stub, assert} from 'sinon';
import {shallow} from 'enzyme/build';
import React from 'react';
import {expect} from 'chai';

describe('TransitionableThumb Tests', () => {
  let element,
    viewProps,
    chance;

  function doRender(props) {
    if (!element) {
      element = shallow(<TransitionableThumb {...props} />);
    }
    else {
      element.setProps(props);
    }
  }

  function buildNewComponentProps() {
    return {
      onClick: stub(),
      lookupId: chance.string(),
      tags: [chance.word(), chance.word(), chance.word()],
      backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
      backgroundPosition: {
        x: chance.integer({min: 1, max: 5}),
        y: chance.integer({min: 1, max: 5})
      },
      height: chance.integer({min: 25, max: 50})
    };
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = buildNewComponentProps();

    doRender(viewProps);
  });

  afterEach('tear down', () => {
    element = null;
  });

  describe('characterization', () => {
    it('should have a className of "transitionable-photo-thumb"', () => {
      expect(element.props()).to.have.property('className')
        .that.equals('transitionable-photo-thumb');
    });

    it('should have two DIVs', () => {
      expect(element.children('div')).to.have.length(2);
      expect(element.children('div').at(0).props()).to.include({className: 'left-shark'});
      expect(element.children('div').at(1).props()).to.include({className: 'right-shark'});
    });
  });

  describe('rendering behavior', () => {
    it('should render the image in the left-shark div first', () => {
      const leftShark = element.find('.left-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({backgroundImage: `url("${viewProps.backgroundUrl}")`});
    });

    it('should clear left-shark div\'s image on a second render and render the image on the right-shark div', () => {
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = element.find('.left-shark'),
        rightShark = element.find('.right-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({});

      expect(rightShark.props()).to.have.property('style')
        .that.deep.equals({backgroundImage: `url("${newProps.backgroundUrl}")`});
    });

    it('should clear right-shark div\'s image on a third render and render the image on the left-shark div', () => {
      doRender(buildNewComponentProps());
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = element.find('.left-shark'),
        rightShark = element.find('.right-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({backgroundImage: `url("${newProps.backgroundUrl}")`});

      expect(rightShark.props()).to.have.property('style')
        .that.deep.equals({});
    });

    it('should not switch sharks if the image does not change', () => {
      doRender(viewProps);

      const leftShark = element.find('.left-shark'),
        rightShark = element.find('.right-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({backgroundImage: `url("${viewProps.backgroundUrl}")`});

      expect(rightShark.props()).to.have.property('style')
        .that.deep.equals({});
    });

    it('should set "thumbnail" and any other tags in a data-tags attribute', () => {
      const expectedTags = ['thumbnail'].concat(viewProps.tags).join(' ');
      expect(element.props()).to.have.property('data-tags')
        .that.equals(expectedTags);
    });
  });

  describe('click behavior', () => {
    it('should fire props.onClick and pass its props as parameters', () => {
      assert.notCalled(viewProps.onClick);
      element.simulate('click');
      assert.calledWithExactly(viewProps.onClick, viewProps);
    });
  });
});
