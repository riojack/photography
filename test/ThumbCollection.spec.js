import ThumbCollection from '../src/ThumbCollection';
import Thumb from '../src/Thumb';
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {stub, assert} from 'sinon';

describe('ThumbCollection Tests', () => {
  let element,
    viewProps,
    chance;

  function render(props) {
    element = shallow(<ThumbCollection {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        focusingOnThumbs: true,
        onView: stub()
      },
      collection: chance.sentence(),
      items: [
        {
          name: chance.word(),
          backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
          backgroundPosition: {
            x: chance.integer({min: 1, max: 5}),
            y: chance.integer({min: 1, max: 5})
          },
          height: chance.integer({min: 25, max: 50})
        }
      ]
    };

    render(viewProps);
  });

  it('should render as a section with a css class of "photo-thumb-collection"', () => {
    expect(element.type()).to.equal('section');
    expect(element.prop('className')).to.equal('photo-thumb-collection');
  });

  it('should render each props.collection item as a Thumb', () => {
    expect(element.children(Thumb)).to.have.length(viewProps.items.length);
  });

  it('should pass each props.collection item as props to the rendered Thumb', () => {
    element.children(Thumb).forEach((t, i) => {
      let item = viewProps.items[i];
      expect(t.prop('name')).to.equal(item.name);
      expect(t.prop('backgroundUrl')).to.equal(item.backgroundUrl);
      expect(t.prop('backgroundPosition')).to.eql(item.backgroundPosition);
      expect(t.prop('height')).to.eql(item.height);
    });
  });

  it('should also pass props.application to each rendered Thumb', () => {
    element.children(Thumb).forEach(t => {
      expect(t.prop('application')).to.eql(viewProps.application);
    });
  });

  it('should set the data-name attribute to props.name', () => {
    expect(element.prop('data-name')).to.equal(viewProps.collection);
  });

  it('should set the data-focusing attribute to props.focusing', () => {
    expect(element.prop('data-focusing')).to.equal(viewProps.application.focusingOnThumbs);
  });

  it('should not render any thumbs if props.focusing is falsy', () => {
    viewProps.application.focusingOnThumbs = false;

    render(viewProps);

    expect(element.children(Thumb)).to.have.length(0);
  });

  it('should set the defaultProps as expected', () => {
    expect(ThumbCollection.defaultProps).to.eql({
      application: {},
      collection: 'This collection has no name',
      items: []
    });
  });
});
