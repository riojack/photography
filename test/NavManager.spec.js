import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import Chance from "chance";
import {stub, assert} from "sinon";
import NavManager from "../src/components/NavManager";
import CollectionNav from "../src/components/CollectionNav";
import GroupNav from "../src/components/GroupNav";

describe('NavManager Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<NavManager {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      application: {
        selectedGroup: null
      },
      groups: [
        {
          group: chance.word(),
          collections: [{a: 'a'}]
        },
        {
          group: chance.word(),
          collections: [{b: 'b'}]
        },
        {
          group: chance.word(),
          collections: [{c: 'c'}]
        }
      ]
    };

    viewProps.application.selectedGroup = chance.pick(viewProps.groups);

    render(viewProps);
  });

  it('should be a DIV html type', () => {
    expect(element.type()).to.equal('div');
  });

  it('should have a css class of "navigation-manager', () => {
    expect(element.props()).to.have.property('className', 'navigation-manager');
  });

  it('should not render any child components if props.groups in null', () => {
    viewProps.groups = null;
    render(viewProps);

    expect(element.children()).to.have.length(0);
  });

  describe('when props.application.selectedGroup is set to a selected group', () => {
    it('should NOT have GroupNav components', () => {
      expect(element.children(GroupNav)).to.have.length(0);
    });

    it('should have a CollectionNav component', () => {
      expect(element.children(CollectionNav)).to.have.length(1);
    });

    it('should pass the expected props to CollectionNav', () => {
      let props = element.children(CollectionNav).at(0).props(),
        expectedProps = Object.assign({application: viewProps.application}, viewProps.application.selectedGroup);

      expect(props).to.eql(expectedProps);
    });
  });

  describe('when props.collection.selectedGroup is not set', () => {
    beforeEach('set up', () => {
      viewProps.application.selectedGroup = null;
      render(viewProps);
    });

    it('should NOT have CollectionNav components', () => {
      expect(element.children(CollectionNav)).to.have.length(0);
    });

    it('should have a GroupNav component', () => {
      expect(element.children(GroupNav)).to.have.length(1);
    });

    it('should pass props.groups to GroupNav', () => {
      expect(element.children(GroupNav).props()).to.have.property('groups', viewProps.groups);
    });

    it('should pass props.application to GroupNav', () => {
      expect(element.children(GroupNav).props()).to.have.property('application', viewProps.application);
    });
  });
});
