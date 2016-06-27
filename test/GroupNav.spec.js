import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import GroupNav from '../src/GroupNav';

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
        {group: chance.word()}, {group: chance.word()}, {group: chance.word()}
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

  it('should have a H2 inside each LI that contains the group\'s name wrapped in an A (anchor)', () => {
    unorderedList.children('li').forEach((li, i) => {
      expect(li.children('h2').at(0).children('a').at(0).children().node, `LI ${i}`).to.equal(viewProps.groups[i].group);
    });
  });

  it('should call props.application.onGroupClicked when the anchors are clicked', () => {
    unorderedList.children('li').forEach((li, i) => {
      assert.notCalled(viewProps.application.onGroupClick);

      li.children('h2').children('a').simulate('click');

      assert.calledOnce(viewProps.application.onGroupClick);
      assert.calledWith(viewProps.application.onGroupClick, viewProps.groups[i]);

      viewProps.application.onGroupClick.reset();
    });
  });
});
