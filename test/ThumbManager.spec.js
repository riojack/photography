import ThumbManager from '../src/ThumbManager';
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

    selectedCollection;

  function doRender(props) {
    let element = <ThumbManager {...props} />;

    container = document.createElement('div');

    component = ReactDOM.render(element, container);
    node = ReactDOM.findDOMNode(component);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    selectedCollection = chance.sentence();
    viewProps = {
      selectedCollection: selectedCollection,
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

    doRender(viewProps);
  });

  it('should render a single ThumbCollection object that has been given the props of the thumb collection with the same name as props.selectedCollection', () => {
    let collection = ReactTestUtils.findRenderedComponentWithType(component, ThumbCollection);

    expect(collection.props).to.eql(viewProps.thumbCollections.find(c => selectedCollection === c.name));
  });
});
