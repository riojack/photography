import TransitionableThumb from '../../src/components/TransitionableThumb';
import Chance from 'chance';
import {stub} from 'sinon';
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
    it('should have two DIVs', () => {
      expect(element.children('div')).to.have.length(2);
      expect(element.children('div').at(0).props()).to.include({className: 'left-shark'});
      expect(element.children('div').at(1).props()).to.include({className: 'right-shark'});
    });
  });

  describe('behavior', () => {
    it('should render the image in the left-shark div first', () => {
      const leftShark = element.find('.left-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({backgroundUrl: viewProps.backgroundUrl});
    });

    it('should clear left-shark div\'s image on a second render and render the image on the right-shark div', () => {
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = element.find('.left-shark'),
        rightShark = element.find('.right-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({});

      expect(rightShark.props()).to.have.property('style')
        .that.deep.equals({backgroundUrl: newProps.backgroundUrl});
    });

    it('should clear right-shark div\'s image on a third render and render the image on the left-shark div', () => {
      doRender(buildNewComponentProps());
      const newProps = buildNewComponentProps();
      doRender(newProps);

      const leftShark = element.find('.left-shark'),
        rightShark = element.find('.right-shark');

      expect(leftShark.props()).to.have.property('style')
        .that.deep.equals({backgroundUrl: newProps.backgroundUrl});

      expect(rightShark.props()).to.have.property('style')
        .that.deep.equals({});
    });
  });
});
