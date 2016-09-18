import Collection from '../../src/components/Collection';
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

describe('Collection Tests', () => {
  let element,
    viewProps,
    chance;

  function doRender(props) {
    element = shallow(<Collection {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      collection: chance.word()
    };

    doRender(viewProps);
  });
  
  it('should be a div', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a className of "photo-collection"', () => {
    expect(element.props()).to.have.property('className')
      .that.equals('photo-collection');
  });

  it('should have an H3 inside that contains props.collection text value', function () {
    expect(element.children('h3').at(0).text())
      .to.equal(viewProps.collection);
  });

});
