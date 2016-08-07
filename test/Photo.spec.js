import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Photo from '../src/Photo';

describe('Photo Tests', () => {
  let viewProps,
    element,

    img,
    chance;

  function render(props) {
    element = shallow(<Photo {...props} />);

    img = element.children().at(0);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        onImageClick: stub(),
        image: chance.url({extensions: ['jpg', 'png']}),
        imageAttributes: {
          isLoading: chance.pick([true, false]),
          height: chance.integer(),
          width: chance.integer()
        }
      }
    };

    render(viewProps);
  });

  it('should be a DIV html element', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a css class of "photo-viewer"', () => {
    expect(element.props()).to.have.property('className', 'photo-viewer');
  });

  it('should have a single child that is an IMG element', () => {
    expect(element.children()).to.have.length(1);
    expect(img.type()).to.equal('img');
  });

  it('should set the IMG element\'s title attribute to props.application.image', () => {
    expect(img.props()).to.have.property('title', viewProps.application.image);
  });

  it('should set the IMG element\'s src attribute to props.application.image', () => {
    expect(img.props()).to.have.property('src', viewProps.application.image);
  });

  it('should set the IMG\'s style to have height and width attributes of props.application.imageAttributes.height and props.application.imageAttributes.width', () => {
    expect(img.props().style).to.have.property('height', viewProps.application.imageAttributes.height);
    expect(img.props().style).to.have.property('width', viewProps.application.imageAttributes.width);
  });

  it('should set data-loading to the string value of props.application.imageAttributes.isLoading', () => {
    expect(img.props()).to.have.property('data-loading', viewProps.application.imageAttributes.isLoading);
  });

  it('should call props.application.onImageClick when the image is clicked', () => {
    assert.notCalled(viewProps.application.onImageClick);
    img.simulate('click');
    assert.calledOnce(viewProps.application.onImageClick);
  });
});
