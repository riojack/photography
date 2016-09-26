import {expect} from 'chai';
import {stub, assert, sandbox} from 'sinon';
import Chance from 'chance';

import React from 'react';
import ReactDOM from 'react-dom';

import PromiseMaker from '../src/promise-maker';
import NewestPhotosStrategy from '../src/view-strategies/newest-photos';
import App from '../src/App';

var nounsAndVerbs;

describe('Nouns and verbs (data and behavior) tests', () => {
  let chance,
    externals,

    item,
    fakeNode,
    fakePromise,
    fakeElement,
    fakeGroups,
    fakeNextFive,
    fakeNewestPhotosStrat,

    sbox;

  function whenRenderPromiseIsResolved() {
    if (PromiseMaker.buildPromise.callCount === 0) {
      throw 'No render promise available.  Cannot simulate render.';
    }

    PromiseMaker.buildPromise.lastCall.args[0](stub());
  }

  function givenASingleRendering() {
    nounsAndVerbs.doRender();
    whenRenderPromiseIsResolved();
  }

  function getLastCreateElementProps() {
    return React.createElement.lastCall.args[1];
  }

  function givenBannerClicked() {
    let props = getLastCreateElementProps();

    externals.document.getElementById.reset();

    props.whenBannerClicked();
  }

  beforeEach('set up', () => {
    sbox = sandbox.create();
    chance = new Chance();

    item = {
      image: 'blah'
    };

    fakeNode = {scrollTop: -1};

    fakePromise = {
      something: `i-dont-care-${chance.word()}`
    };

    fakeElement = {
      someElement: `it-can-be-whatever-${chance.word()}`
    };

    fakeGroups = [
      {group: 'something-1', collections: [{collection: 'collection 1', items: [{}, {}, {}]}]},
      {group: 'something-2', collections: [{collection: 'collection 2', items: [{}, {}, {}]}]},
      {group: 'something-3', collections: [{collection: 'collection 3', items: [{}, {}, {}]}]}
    ];

    fakeNextFive = [
      {group: 'something-1', collections: [{collection: 'collection 1', items: [{}, {}, {}]}]},
      {group: 'something-2', collections: [{collection: 'collection 2', items: [{}, {}, {}]}]},
      {group: 'something-3', collections: [{collection: 'collection 3', items: [{}, {}, {}]}]},
      {group: 'something-4', collections: [{collection: 'collection 4', items: [{}, {}, {}]}]},
      {group: 'something-5', collections: [{collection: 'collection 5', items: [{}, {}, {}]}]}
    ];

    fakeNewestPhotosStrat = {
      something: `newest-photo-strat-${chance.word()}`,
      next: stub().withArgs(5).returns(fakeNextFive),
      reset: stub()
    };

    sandbox.stub(React);
    sandbox.stub(ReactDOM);

    externals = {
      window: {
        open: stub()
      },
      document: {
        getElementById: stub()
      },
      data: fakeGroups
    };

    sandbox.stub(PromiseMaker, 'buildPromise').returns(fakePromise);
    externals.document.getElementById.withArgs('photography-app-container').returns(fakeNode);
    React.createElement.returns(fakeElement);
    sandbox.stub(NewestPhotosStrategy, 'create').returns(fakeNewestPhotosStrat);

    nounsAndVerbs = require('../src/nouns-and-verbs').default;
    nounsAndVerbs.withExternals(externals);
  });

  afterEach('tear down', () => {
    sbox.restore();
    nounsAndVerbs.unregisterExternals();
    nounsAndVerbs.resetMergers();
  });

  describe('initial world values', () => {
    it('should have a property called "sorter" that is set to the value of false', () => {
      expect(nounsAndVerbs.peerAtWorld()).to.have.property('sorter')
        .that.equals(false);
    });

    it('should have a property called "limitRenderTo" that is the boolean value false', () => {
      expect(nounsAndVerbs.peerAtWorld()).to.have.property('limitRenderTo')
        .that.equals(false);
    });
  });

  describe('when rendering the application', () => {
    it('should return a promise', () => {
      let promise = nounsAndVerbs.doRender();

      expect(promise).to.equal(fakePromise);
    });

    it('should give the promise a function', () => {
      nounsAndVerbs.doRender();

      expect(PromiseMaker.buildPromise.lastCall.args[0])
        .to.be.a('function');
    });

    it('should default to Newest Photos sorting strategy in the world state when the promise executes the function', () => {
      givenASingleRendering();

      assert.calledOnce(NewestPhotosStrategy.create);
      assert.calledWithExactly(NewestPhotosStrategy.create, externals.data);

      expect(nounsAndVerbs.peerAtWorld())
        .to.have.property('sorter')
        .that.equals(fakeNewestPhotosStrat);
    });

    it('should not recreate the Newest Photos sorting strategy after the first time, when the promise executes the function', () => {
      nounsAndVerbs.doRender();
      nounsAndVerbs.doRender();
      nounsAndVerbs.doRender();
      PromiseMaker.buildPromise.getCall(0).args[0](stub());
      PromiseMaker.buildPromise.getCall(1).args[0](stub());
      PromiseMaker.buildPromise.getCall(2).args[0](stub());

      assert.calledOnce(NewestPhotosStrategy.create);
    });

    it('should create an App element with groups from the next(5) of the sorter plus a whenBannerClicked function, when the promise executes the function', () => {
      givenASingleRendering();

      let expectedGroups = nounsAndVerbs.peerAtWorld().sorter.next(5);

      assert.calledOnce(React.createElement);
      assert.calledWith(React.createElement, App);

      expect(React.createElement.lastCall.args[1]).to.have.property('groups')
        .that.eqls(expectedGroups);

      expect(React.createElement.lastCall.args[1]).to.have.property('whenBannerClicked')
        .that.is.a('function');
    });

    it('should inject into each item in each collection in each group an "onClick" handler, when the promise executes the function', () => {
      givenASingleRendering();

      React.createElement.lastCall.args[1].groups.forEach(g => {
        g.collections.forEach(c => {
          c.items.forEach(item => {
            expect(item).to.have.property('onClick')
              .that.is.a('function');
          });
        });
      })
    });

    it('should render the App element into the photography-app-container element and pass it the resolve argument, when the promise executes the function', () => {
      var resolver = stub();
      nounsAndVerbs.doRender();
      PromiseMaker.buildPromise.lastCall.args[0](resolver);

      assert.calledOnce(ReactDOM.render);
      assert.calledWith(ReactDOM.render, fakeElement, fakeNode, resolver);
    });
  });

  describe('when a thumbnail is clicked', () => {
    it('should call window.open() with the expected parameters when thumb is clicked', () => {
      assert.notCalled(externals.window.open);

      nounsAndVerbs.whenThumbClicked.call({}, item);

      assert.calledOnce(externals.window.open);
      assert.calledWith(externals.window.open, item.image, 'iowa-light-view-photo');
    });
  });

  describe('when the Iowa Light banner is clicked', () => {
    it('should fetch "photography-app-container" by ID and set scrollTop to 0', () => {
      assert.notCalled(externals.document.getElementById);

      givenASingleRendering();
      givenBannerClicked();

      assert.calledOnce(externals.document.getElementById);
      assert.calledWith(externals.document.getElementById, 'photography-app-container');

      expect(fakeNode.scrollTop).to.equal(0);
    });

    it('should reset the current sorter', () => {
      assert.notCalled(fakeNewestPhotosStrat.reset);

      givenASingleRendering();

      assert.notCalled(fakeNewestPhotosStrat.reset);

      givenBannerClicked();

      assert.calledOnce(fakeNewestPhotosStrat.reset);
    });

    it('should re-render the whole application', () => {
      givenASingleRendering();
      givenBannerClicked();
      givenASingleRendering();

      assert.calledTwice(React.createElement);
      assert.calledTwice(ReactDOM.render);
    });
  });

  describe('when collapse to collections is clicked', () => {
    it('should update the world state\'s limitRenderTo property to a value of "collectionNames"', () => {
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal(false);
      nounsAndVerbs.whenCollapseToGroupsClicked();
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal('collectionNames');
    });

    it('should re-render the whole world with the updated rendering restriction', () => {
      nounsAndVerbs.whenCollapseToGroupsClicked();
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      expect(React.createElement.lastCall.args[1]).to.have.property('limitRenderTo')
        .that.equals('collectionNames');
      assert.calledOnce(ReactDOM.render);
    });
  });
});
