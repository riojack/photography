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
    element = shallow(<TransitionableThumb {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      onClick: stub(),
      lookupId: chance.string(),
      backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
      backgroundPosition: {
        x: chance.integer({min: 1, max: 5}),
        y: chance.integer({min: 1, max: 5})
      },
      height: chance.integer({min: 25, max: 50})
    };

    doRender(viewProps);
  });

  describe('characterization', () => {
    it('should have two DIVs', () => {
      expect(element.children('div')).to.have.length(2);
      expect(element.children('div').at(0).props()).to.include({className: 'left-shark'});
      expect(element.children('div').at(1).props()).to.include({className: 'right-shark'});
    });
  });
});
