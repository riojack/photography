import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Breadcrumbs from '../../src/components/Breadcrumbs';

describe('Breadcrumbs Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<Breadcrumbs {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      onCrumbClick: stub(),
      crumbs: chance.unique(chance.word, chance.integer({min: 1, max: 10}))
    };

    render(viewProps);
  });

  it('should be a UL', () => {
    expect(element.type()).to.equal('ul');
  });
  
  it('should have a css class of "breadcrumbs"', () => {
    expect(element.props()).to.have.property('className', 'breadcrumbs');
  });

  it('should render an LI for each props.crumbs', () => {
    expect(element.children('li')).to.have.length(viewProps.crumbs.length);
  });

  it('should render the items in anchors in LIs in the order as they appear in props.crumbs', () => {
    element.children('li').forEach((li,i) => {
      expect(li.children('a').at(0).children().node, `LI ${i}'s text`)
        .to.equal(viewProps.crumbs[i]);
    });
  });

  it('should call props.onCrumbClick when the anchor is clicked', () => {
    element.children('li').forEach(li => {
      assert.notCalled(viewProps.onCrumbClick);
      li.children('a').at(0).simulate('click');
      assert.calledOnce(viewProps.onCrumbClick);
      assert.calledWith(viewProps.onCrumbClick, li.children('a').at(0).children().node);

      viewProps.onCrumbClick.reset();
    });
  });
});
