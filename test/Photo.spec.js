import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Photo from '../src/Photo';
import PhotoControls from '../src/PhotoControls';

describe('Photo Tests', () => {
  let viewProps,
    element,

    ctrls,
    img,
    chance;

  function render(props) {
    element = shallow(<Photo {...props} />);

    ctrls = element.children().at(0);
    img = element.children().at(1);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        onImageClick: stub(),
        onViewPhoto: stub(),
        image: chance.url({extensions: ['jpg', 'png']}),
        imageAttributes: {
          isLoading: false,
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

  it('should have 2 children', () => {
    expect(element.children()).to.have.length(2);
  });

  describe('when rendering the photo controls', () => {
    it('should have a first child that is a PhotoControls component', () => {
      expect(ctrls.type()).to.equal(PhotoControls);
    });

    it('should pass props.application.onViewPhoto to the PhotoControls component', () => {
      expect(ctrls.props()).to.have.property('onViewPhoto')
        .that.equals(viewProps.application.onViewPhoto);
    });

    it('should not render PhotoControls if props.application.imageAttributes.isLoading is true', () => {
      viewProps.application.imageAttributes.isLoading = true;
      render(viewProps);

      expect(element.children(PhotoControls)).to.have.length(0);
    });
  });

  describe('when rendering image', () =>{
    it('should have a second child that is an IMG element', () => {
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
});
