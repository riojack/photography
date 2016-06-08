import Thumb from '../src/Thumb';
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

describe('Thumb Tests', () => {
  let element,
    viewProps,
    chance;

  function doRender(props) {
    element = shallow(<Thumb {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {onView: stub()},
      name: chance.sentence(),
      backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
      backgroundPosition: {
        x: chance.integer({min: 1, max: 5}),
        y: chance.integer({min: 1, max: 5})
      },
      height: chance.integer({min: 25, max: 50})
    };

    doRender(viewProps);
  });

  it('should render as a div with a css class of "photo-thumb"', () => {
    expect(element.type()).to.equal('div');
    expect(element.prop('className')).to.equal('photo-thumb');
  });

  it('should provide default prop values as expected', () => {
    expect(Thumb.defaultProps.application.onView).to.be.a('function');
    expect(Thumb.defaultProps.name).to.equal('No name for photo');
    expect(Thumb.defaultProps.backgroundUrl).to.equal('');
    expect(Thumb.defaultProps.backgroundPosition).to.eql({x: 0, y: 0});
    expect(Thumb.defaultProps.height).to.equal(65);
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    expect(element.prop('style').backgroundImage).to.equal(`url(${viewProps.backgroundUrl})`);
  });

  it('should set style.backgroundImage to the value of props.backgroundUrl', () => {
    expect(element.prop('style').backgroundPosition).to.equal(`${viewProps.backgroundPosition.x}px ${viewProps.backgroundPosition.y}px`);
  });

  it('should set style.height to the value of props.height', () => {
    expect(element.prop('style').height).to.equal(`${viewProps.height}px`);
  });

  it('should set the data-name attribute to the value of props.name', () => {
    expect(element.prop('data-name')).to.equal(viewProps.name);
  });

  it('should call props.onView and give it the thumbnail name as an object when the thumbnail is clicked', () => {
    assert.notCalled(viewProps.application.onView);
    element.simulate('click');
    assert.calledWithExactly(viewProps.application.onView, {
      name: viewProps.name
    });
  });
});
