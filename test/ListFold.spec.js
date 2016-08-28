import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {spy, assert} from 'sinon';

import ListFold from '../src/components/ListFold';

describe('ListFold Tests', () => {
  let viewProps,
    element,

    foldReturnValue,
    selectReturnValue,

    chance;

  function render(props) {
    element = shallow(<ListFold {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();

    foldReturnValue = chance.word();
    selectReturnValue = chance.word();

    viewProps = {
      list: [1, 2, 3],
      fold: spy((pv, cv) => foldReturnValue),
      select: spy((rv) => selectReturnValue),
      initial: chance.word()
    };

    render(viewProps);
  });
  
  it('should be a span', () => {
    expect(element.type()).to.equal('span');
  });

  it('should have a className of "list-fold"', () => {
    expect(element.props()).to.have.property('className')
      .that.equals('list-fold');
  });
  
  it('should call the "fold" function for every item in the "list" property, performing a fold/reduce on the list', () => {
    assert.callCount(viewProps.fold, viewProps.list.length);
  });

  it('should, on each call to "fold", pass the standard javascript fold/reduce parameters', () => {
    assert.calledWith(viewProps.fold.getCall(0), viewProps.initial, viewProps.list[0]);
    assert.calledWith(viewProps.fold.getCall(1), foldReturnValue, viewProps.list[1]);
    assert.calledWith(viewProps.fold.getCall(2), foldReturnValue, viewProps.list[2]);
  });

  it('should set the text content of the span to the return value of the "select" parameter after it has been invoked with the return value of the fold/reduce operation', () => {
    assert.calledOnce(viewProps.select);
    assert.calledWith(viewProps.select, foldReturnValue);

    expect(element.children().at(0).node)
      .to.equal(selectReturnValue);
  });

  it('should return an empty span if the "list" argument is not an array', () => {
    viewProps.list = {};
    render(viewProps);

    expect(element.children().at(0).node)
      .to.equal(' ');
  });
});
