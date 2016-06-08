import ThumbManager from '../src/ThumbManager';
import ThumbCollectionHeader from '../src/ThumbCollectionHeader';
import ThumbCollection from '../src/ThumbCollection';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Chance from 'chance';

describe('ThumbManager Tests', () => {
  let container,
    component,
    node,
    viewProps,
    chance,
    heading,
    collection,

    selectedCollection,
    expectedPropsToCollection;

  function doRender(props) {
    let element = <ThumbManager {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);
    heading = ReactTestUtils.findRenderedComponentWithType(component, ThumbCollectionHeader);
    collection = ReactTestUtils.findRenderedComponentWithType(component, ThumbCollection);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    selectedCollection = chance.sentence();
    viewProps = {
      selectedCollection: selectedCollection,
      focusing: chance.bool(),
      pinned: chance.bool(),
      onNavigateToCollection: function foo() {
      },
      onPinnedSwitch: function bar() {
      },
      thumbCollections: [
        {
          name: selectedCollection,
          collection: [
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

    expectedPropsToCollection = viewProps.thumbCollections.find(c => selectedCollection === c.name);

    doRender(viewProps);
  });
  
  it('should have data-component attribute with a value of "thumb-manager"', () => {
    expect(node.getAttribute('data-component')).to.equal('thumb-manager');
  });
  
  it('should render a sing ThumbCollectionHeader and has it the selected collection\'s name as "heading"', () => {
    expect(heading.props).to.eql({heading: expectedPropsToCollection.name});
  });

  it('should render a single ThumbCollection object that has been given the props of the thumb collection with the same name as props.selectedCollection', () => {
    expectedPropsToCollection = Object.assign({}, expectedPropsToCollection, {
      focusing: viewProps.focusing,
      pinned: viewProps.pinned,
      onNavigateToCollection: viewProps.onNavigateToCollection,
      onPinnedSwitch: viewProps.onPinnedSwitch
    });

    expect(collection.props).to.eql(expectedPropsToCollection);
  });
});
