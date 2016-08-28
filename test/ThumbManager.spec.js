import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import Chance from 'chance';

import ThumbManager from '../src/components/ThumbManager';
import ThumbCollection from '../src/components/ThumbCollection';
import Photo from '../src/components/Photo';

describe('ThumbManager Tests', () => {
  let element,
    viewProps,
    chance,

    selectedCollection,
    possibleImage;

  function render(props) {
    element = shallow(<ThumbManager {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    possibleImage = chance.url({extensions: ['jpg', 'png']});
    selectedCollection = {
      collection: chance.word(),
      items: [
        {
          name: chance.word(),
          image: possibleImage,
          backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
          backgroundPosition: {
            x: chance.integer({min: 1, max: 5}),
            y: chance.integer({min: 1, max: 5})
          }
        }
      ]
    };

    viewProps = {
      application: {
        selectedCollection: selectedCollection,
        image: false
      }
    };

    render(viewProps);
  });

  it('should be a DIV', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a css class of "thumb-manager"', () => {
    expect(element.props()).to.have.property('className', 'thumb-manager');
  });

  it('should not render any children if props.application.selectedCollection is falsy', () => {
    viewProps.application.selectedCollection = false;
    render(viewProps);

    expect(element.children()).to.have.length(0);
  });

  it('if props.application.image is falsy, it should render a thumb collection but not render a photo', () => {
    expect(element.children(ThumbCollection)).to.have.length(1);
    expect(element.children(Photo)).to.have.length(0);
  });

  it('if props.application.image is set to an object, it should render a photo but not a thumb collection', () => {
    viewProps.application.image = possibleImage;
    render(viewProps);

    expect(element.children(ThumbCollection)).to.have.length(0);
    expect(element.children(Photo)).to.have.length(1);
  });

  it('should pass props.application to the photo component', () => {
    viewProps.application.image = possibleImage;
    render(viewProps);

    expect(element.children(Photo).at(0).props()).to.eql({application: viewProps.application})
  });
  
  it('should pass props.application to the thumb collection component', () => {
    expect(element.children(ThumbCollection).at(0).props()).to.eql({application: viewProps.application});
  });
});
