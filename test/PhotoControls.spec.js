import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import PhotoControls from '../src/PhotoControls';

describe('PhotoControls Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<PhotoControls {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      onViewPhoto: stub()
    };

    render(viewProps);
  });
  
  it('should be a UL with a className "photo-controls"', () => {
    expect(element.type()).to.equal('ul');
    expect(element.props()).to.have.property('className')
      .that.equals('photo-controls');
  });

  it('should have a single child that is an LI', () => {
    expect(element.children()).to.have.length(1);
    expect(element.children('li')).to.have.length(1);
  });
  
  it('should have an anchor inside the LI', () => {
    expect(element.children('li').at(0).children('a')).to.have.length(1);
  });
  
  it('should have text content of the string "View full"', () => {
    expect(element.children('li').at(0).children('a').at(0).children().node)
      .to.equal('View full');
  });

  it('should call props.onViewPhoto when the link is clicked', () => {
    assert.notCalled(viewProps.onViewPhoto);
    element.children('li').at(0).children('a').simulate('click');
    assert.calledOnce(viewProps.onViewPhoto);
  });
});
