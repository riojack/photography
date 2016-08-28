import ThumbCollection from "../src/components/ThumbCollection";
import Thumb from "../src/components/Thumb";
import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Chance from "chance";

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
        selectedCollection: {
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
        }
      }
    };

    render(viewProps);
  });

  it('should render as a DIV with a css class of "photo-thumb-collection"', () => {
    expect(element.type()).to.equal('div');
    expect(element.prop('className')).to.equal('photo-thumb-collection');
  });

  it('should render each props.collection item as a Thumb', () => {
    expect(element.children(Thumb)).to.have.length(viewProps.application.selectedCollection.items.length);
  });

  it('should pass each props.applications.selectedCollection.items as props to the rendered Thumb', () => {
    element.children(Thumb).forEach((t, i) => {
      let item = viewProps.application.selectedCollection.items[i],
        expectedProps = Object.assign({}, item, {application: viewProps.application});

      expect(t.props()).to.eql(Object.assign({}, Thumb.defaultProps, expectedProps));
    });
  });
});
