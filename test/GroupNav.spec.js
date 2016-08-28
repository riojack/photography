import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import GroupNav from '../src/components/GroupNav';
import ListFold from '../src/components/ListFold';

describe('GroupNav Tests', () => {
  let viewProps,
    element,

    unorderedList = 0,
    nav,

    chance;

  function render(props) {
    element = shallow(<GroupNav {...props} />);

    nav = element.children('nav');
    unorderedList = nav.children('ul');
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        onGroupClick: stub()
      },
      groups: [
        {
          group: chance.word(),
          collections: [chance.word()]
        },
        {
          group: chance.word(),
          collections: [chance.word()]
        },
        {
          group: chance.word(),
          collections: [chance.word()]
        }
      ]
    };

    render(viewProps);
  });

  it('should be a DIV html element', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a css class of "group-navigator"', () => {
    expect(element.props()).to.have.property('className', 'group-navigator');
  });

  it('should have a NAV html element inside it', () => {
    expect(element.children().at(0).type()).to.equal('nav');
  });

  it('the NAV element should have a UL as its only child', () => {
    expect(nav.children()).to.have.length(1);
    expect(unorderedList.type()).to.equal('ul');
  });

  it('should have LIs for each group in props.groups', () => {
    expect(unorderedList.children('li')).to.have.length(viewProps.groups.length);
  });

  describe('List inside LIs', () => {
    let firstColumn,
      secondColumn;

    beforeEach('set up', () => {
      let columns = unorderedList.children('li').at(0).children('ul').at(0).children('li');
      firstColumn = columns.at(0);
      secondColumn = columns.at(1);
    });

    it('should, in the first column, have a H2 inside each LI that contains the group\'s name wrapped in an A (anchor)', () => {
      expect(firstColumn.children('h2').at(0).children('a').at(0).children().node).to.equal(viewProps.groups[0].group);
    });

    it('should, in the first column, call props.application.onGroupClicked when the anchors are clicked', () => {
      assert.notCalled(viewProps.application.onGroupClick);

      firstColumn.children('h2').children('a').simulate('click');

      assert.calledOnce(viewProps.application.onGroupClick);
      assert.calledWith(viewProps.application.onGroupClick, viewProps.groups[0]);

      viewProps.application.onGroupClick.reset();
    });

    it('should, in the second column, have a ListFold', () => {
      expect(secondColumn.children(ListFold)).to.have.length(1);
    });

    it('should, in the second column, give the ListFold component the group\'s list of collections', () => {
      expect(secondColumn.children(ListFold).at(0).props())
        .to.have.property('list')
        .that.eqls(viewProps.groups[0].collections);
    });

    it('should, in the second column, give the ListFold component an object with a "time" field of 0 for "initial"', () => {
      expect(secondColumn.children(ListFold).at(0).props())
        .to.have.property('initial')
        .that.eqls({time: 0});
    });

    it('should, in the second column, give the ListFold component a "select" function that returns the "added" property of an object with an "added" field on it prefixed with the words "Last updated: "', () => {
      let someObject = {added: chance.word()};
      expect(secondColumn.children(ListFold).at(0).props())
        .to.have.property('select')
        .that.is.a('function');

      let selectFunc = secondColumn.children(ListFold).at(0).props().select;

      expect(selectFunc(someObject)).to.equal(`Last updated: ${someObject.added}`);
    });

    it('should, in the second column, give the ListFold component a "fold" function that returns the most recent collection', () => {
      let bigAdded = 14,
        collections = [
        {time: bigAdded - 2},
        {time: bigAdded},
        {time: bigAdded - 4}
      ];

      expect(secondColumn.children(ListFold).at(0).props())
        .to.have.property('fold')
        .that.is.a('function');

      let foldFunc = secondColumn.children(ListFold).at(0).props().fold;

      expect(collections.reduce(foldFunc, {time: 0})).to.eql({time: bigAdded});
    });
  });
});
