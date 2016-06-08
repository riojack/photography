import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import Chance from 'chance';

import ThumbManager from '../src/ThumbManager';
import ThumbCollectionHeader from '../src/ThumbCollectionHeader';
import ThumbCollection from '../src/ThumbCollection';

describe('ThumbManager Tests', () => {
  let element,
    viewProps,
    chance,

    expectedPropsToCollection;

  function render(props) {
    element = shallow(<ThumbManager {...props} />);
  }

  beforeEach('set up', () => {
    let selectedCollection;

    chance = new Chance();
    selectedCollection = chance.sentence();

    viewProps = {
      application: {
        selectedCollection: selectedCollection,
        focusing: chance.bool(),
        pinned: chance.bool(),
        onNavigateToCollection: stub(),
        onPinnedSwitch: stub()
      },
      collections: [
        {
          collection: selectedCollection,
          items: [
            {
              name: chance.word(),
              backgroundUrl: chance.url({extensions: ['jpg', 'png']}),
              backgroundPosition: {
                x: chance.integer({min: 1, max: 5}),
                y: chance.integer({min: 1, max: 5})
              }
            }
          ]
        }
      ]
    };

    expectedPropsToCollection = viewProps.collections.find(c => selectedCollection === c.collection);

    render(viewProps);
  });

  it('should have data-component attribute with a value of "thumb-manager"', () => {
    expect(element.props()).to.have.property('data-component', 'thumb-manager');
  });

  it('should render a sing ThumbCollectionHeader and has it the selected collection\'s name as "heading"', () => {
    expect(element.children(ThumbCollectionHeader).props()).to.eql({heading: expectedPropsToCollection.collection});
  });

  it('should render a single ThumbCollection object that has been given the props of the thumb collection with the same name as props.selectedCollection', () => {
    expect(element.children(ThumbCollection).at(0).prop('collection')).to.equal(expectedPropsToCollection.collection);
    expect(element.children(ThumbCollection).at(0).prop('items')).to.eql(expectedPropsToCollection.items);
  });

  it('should pass on the application prop to ThumbCollection', () => {
    expect(element.children(ThumbCollection).prop('application')).to.eql(viewProps.application);
  });
});
