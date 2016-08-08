import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Chance from 'chance';
import {stub, assert} from 'sinon';

import Photography from '../src/Photography';
import NavManager from '../src/NavManager';
import ThumbManager from '../src/ThumbManager';
import Breadcrumb from '../src/Breadcrumbs';

describe('Photography Tests', () => {
  let viewProps,
    element,

    chance;

  function render(props) {
    element = shallow(<Photography {...props} />);
  }

  beforeEach('set up', () => {
    chance = new Chance();
    viewProps = {
      navState: {something: chance.string()},
      thumbState: {anything: chance.string()},
      application: {
        crumbs: chance.unique(chance.word, chance.integer({min: 1, max: 10})),
        onCrumbClick: stub(),
        selectedCollection: false,
        image: false
      }
    };

    render(viewProps);
  });

  it('should be a DIV with a class of "photography-application', () => {
    expect(element.type()).to.equal('div');
    expect(element.props()).to.have.property('className', 'photography-application');
  });

  it('should always render a Breadcrumb component', () => {
    expect(element.children(Breadcrumb)).to.have.length(1);
  });

  it('should give expected props to the Breadcrumbs component', () => {
    expect(element.children(Breadcrumb).at(0).props()).to.eql({
      crumbs: viewProps.application.crumbs,
      onCrumbClick: viewProps.application.onCrumbClick
    });
  });

  describe('when there is no selected collection', () => {
    let navManager;

    beforeEach('set up', () => {
      navManager = element.children('.navigation-presentation').at(0).children().at(0);
    });

    it('should have a child that is a div with a css class of "navigation-presentation"', () => {
      expect(element.children('.navigation-presentation')).to.have.length(1);
      expect(element.children('.navigation-presentation').at(0).type()).to.equal('div');
    });

    it('should have one child', () => {
      expect(element.children('.navigation-presentation').at(0).children()).to.have.length(1);
    });

    it('should have one child that is a NavManager component', () => {
      expect(navManager.type()).to.equal(NavManager);
    });

    it('should directly pass props.navState and props.application to the NavManager component', () => {
      let expectedNavProps = Object.assign({
        application: viewProps.application
      }, viewProps.navState);

      expect(navManager.props()).to.eql(expectedNavProps);
    });

    it('should not render a navigation-presentation div with a NavManager if props.application.image is truthy', () => {
      viewProps.application.image = true;
      render(viewProps);

      expect(element.find('.navigation-presentation')).to.have.length(0);
      expect(element.find(NavManager)).to.have.length(0)
    });
  });

  describe('when there is a selected collection', () => {
    let thumbManager;

    beforeEach('set up', () => {
      viewProps.application.selectedCollection = 'something';
      render(viewProps);

      thumbManager = element.children('.collection-presentation').at(0).children().at(0);
    });

    it('should have one child that is a div with a css class of "collection-presentation"', () => {
      expect(element.children('.collection-presentation')).to.have.length(1);
      expect(element.children('.collection-presentation').at(0).type()).to.equal('div');
    });

    it('should have one child that is a ThumbManager component', () => {
      expect(thumbManager.type()).to.equal(ThumbManager);
    });

    it('should pass props.application to the ThumbManager component', () => {
      expect(thumbManager.props()).to.eql({application: viewProps.application});
    });
  });
});
