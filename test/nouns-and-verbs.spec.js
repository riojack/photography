import {fail} from "assert";
import {expect} from "chai";
import {assert, createSandbox, stub} from "sinon";
import Chance from "chance";
import React from "react";
import ReactDOM from "react-dom";
import PromiseMaker from "../src/promise-maker";
import PhotoScaling from "../src/transformers/photo-scaling";
import NewestPhotosStrategy from "../src/view-strategies/newest-photos";
import GroupInCollectionStrategy from "../src/view-strategies/collection-in-group";
import App from "../src/App";

let nounsAndVerbs;

describe('Nouns and verbs (data and behavior) tests', () => {
  let chance,
    externals,

    item,
    secondItem,
    fakeNode,
    fakePromise,
    secondFakePromise,
    fakeElement,
    fakeGroups,
    fakeNextFive,
    fakeNewestPhotosStratOne,
    fakeNewestPhotosStratTwo,
    fakeCollectionInGroupStrat,
    fakePhotoScalingTransformer,
    expectedCollection,

    sandbox;

  function _toBase64(val) {
    return (new Buffer(val, 'utf8')).toString('base64');
  }

  function makePhoto(opts) {
    const safeOpts = opts || {},
      photoName = safeOpts.photoName || chance.word({length: 32}),
      collectionTime = safeOpts.collectionTime || (chance.timestamp() * 1000),
      collectionName = safeOpts.collectionName || chance.word({length: 32}),
      groupName = safeOpts.groupName || chance.word({length: 32});

    return {
      lookupId: _toBase64(photoName) + '|' + _toBase64(`${collectionTime}`) + '|' + _toBase64(collectionName) + '|' + _toBase64(groupName),
      height: chance.integer(),
      width: chance.integer(),
      tags: []
    };
  }

  function whenRenderPromiseIsResolved() {
    if (PromiseMaker.buildPromise.callCount === 0) {
      fail('Rendering was not called.');
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

    externals.document.getElementById.resetHistory();

    props.whenBannerClicked();
  }

  function givenCollapsedToGroups() {
    nounsAndVerbs.whenCollapseToGroupsClicked(externals.data[0].collections[0].collection);
    whenRenderPromiseIsResolved();
  }

  beforeEach('set up', () => {
    sandbox = createSandbox();
    chance = new Chance();

    fakeNode = {scrollTop: -1};

    fakePromise = {
      then: stub()
    };
    secondFakePromise = {
      then: stub()
    };

    fakeElement = {
      someElement: `it-can-be-whatever-${chance.word()}`
    };

    const collectionTime = chance.timestamp();
    item = Object.assign({image: 'blah 001', name: 'picture 001'}, makePhoto({
      photoName: 'picture 001',
      groupName: 'something-1',
      collectionName: 'collection 1',
      collectionTime: collectionTime
    }));
    secondItem = Object.assign({image: 'blah 002', name: 'picture 002'}, makePhoto({
      photoName: 'picture 002',
      groupName: 'something-1',
      collectionName: 'collection 1',
      collectionTime: collectionTime
    }));

    fakeGroups = [
      {
        group: 'something-1',
        collections: [{collection: 'collection 1', time: collectionTime, items: [item, secondItem, makePhoto()]}]
      },
      {
        group: 'something-2',
        collections: [{collection: 'collection 2', items: [makePhoto(), makePhoto(), makePhoto()]}]
      },
      {
        group: 'something-3',
        collections: [{collection: 'collection 3', items: [makePhoto(), makePhoto(), makePhoto()]}]
      }
    ];

    fakeNextFive = [
      {group: 'something-1', collections: [{collection: 'collection 1', items: [{}, {}, {}]}]},
      {group: 'something-2', collections: [{collection: 'collection 2', items: [{}, {}, {}]}]},
      {group: 'something-3', collections: [{collection: 'collection 3', items: [{}, {}, {}]}]},
      {group: 'something-4', collections: [{collection: 'collection 4', items: [{}, {}, {}]}]},
      {group: 'something-5', collections: [{collection: 'collection 5', items: [{}, {}, {}]}]}
    ];

    fakeNewestPhotosStratOne = {
      something: `newest-photo-strat-${chance.word()}`,
      next: stub().returns(fakeNextFive),
      reset: stub()
    };

    fakeNewestPhotosStratTwo = {
      something: `another-newest-photo-strat-${chance.word()}`,
      next: stub().returns([]),
      reset: stub()
    };

    fakeCollectionInGroupStrat = {
      something: `collection-in-group-${chance.word()}`,
      next: stub().returns([fakeGroups[0]])
    };

    fakePhotoScalingTransformer = {
      transform: stub().returns({})
    };

    expectedCollection = chance.pickone(chance.pickone(fakeGroups).collections);

    sandbox.stub(React);
    sandbox.stub(ReactDOM);

    externals = {
      setTimeout: stub(),
      window: {
        open: stub()
      },
      document: {
        getElementById: stub()
      },
      data: fakeGroups
    };

    sandbox.stub(PromiseMaker, 'buildPromise');
    PromiseMaker.buildPromise.onCall(0).returns(fakePromise);
    PromiseMaker.buildPromise.onCall(1).returns(secondFakePromise);
    externals.document.getElementById.withArgs('photography-app-container').returns(fakeNode);
    React.createElement.returns(fakeElement);

    sandbox.stub(PhotoScaling, 'create').returns(fakePhotoScalingTransformer);
    sandbox.stub(NewestPhotosStrategy, 'create');
    sandbox.stub(GroupInCollectionStrategy, 'create').returns(fakeCollectionInGroupStrat);

    NewestPhotosStrategy.create.onCall(0).returns(fakeNewestPhotosStratOne);
    NewestPhotosStrategy.create.onCall(1).returns(fakeNewestPhotosStratTwo);

    nounsAndVerbs = require('../src/nouns-and-verbs').default;
    nounsAndVerbs.withExternals(externals);
  });

  afterEach('tear down', () => {
    sandbox.restore();
    nounsAndVerbs.unregisterExternals();
    nounsAndVerbs.resetMergers();
  });

  describe('initial world values', () => {
    it('should have a property called "transformer" that is set to the value of false', () => {
      expect(nounsAndVerbs.peerAtWorld()).to.have.property('transformer')
        .that.equals(false);
    });

    it('should have a property called "sorter" that is set to the value of false', () => {
      expect(nounsAndVerbs.peerAtWorld()).to.have.property('sorter')
        .that.equals(false);
    });

    it('should have a property called "limitRenderTo" that is the boolean value false', () => {
      expect(nounsAndVerbs.peerAtWorld()).to.have.property('limitRenderTo')
        .that.equals(false);
    });
  });

  describe('when running the pre-start actions', () => {
    it('should create an instance of the Photo Scaling transformer with h-v scaling of 55%', () => {
      nounsAndVerbs.doPreStartActions();

      assert.calledOnce(PhotoScaling.create);
      assert.calledWithExactly(PhotoScaling.create, 0.55, 0.55);
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
        .that.equals(fakeNewestPhotosStratOne);
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

    it('should also pass a whenCollapseToGroupsClicked function to the App element', () => {
      givenASingleRendering();

      expect(React.createElement.lastCall.args[1]).to.have.property('whenCollapseToGroupsClicked')
        .that.is.a('function');
    });

    it('should also pass a whenCollectionNameClicked function to the App element', () => {
      givenASingleRendering();

      expect(React.createElement.lastCall.args[1]).to.have.property('whenCollectionNameClicked')
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
      let resolver = stub();
      nounsAndVerbs.doRender();
      PromiseMaker.buildPromise.lastCall.args[0](resolver);

      assert.calledOnce(ReactDOM.render);
      assert.calledWith(ReactDOM.render, fakeElement, fakeNode, resolver);
    });
  });

  describe('when a thumbnail is clicked', () => {
    it('should swap the hero thumb with the clicked thumb by setting the "changing_image" tag, rendering, and then un-setting the tags', () => {
      nounsAndVerbs.whenThumbClicked.call({}, secondItem);

      assert.notCalled(externals.window.open);

      expect(item.tags).to.include('changing_image');
      expect(secondItem.tags).to.include('changing_image');

      PromiseMaker.buildPromise.lastCall.args[0](stub());
      fakePromise.then.lastCall.args[0]();
      PromiseMaker.buildPromise.lastCall.args[0](stub());

      assert.calledOnce(externals.setTimeout);

      externals.setTimeout.lastCall.args[0]();
      secondFakePromise.then.lastCall.args[0]();

      expect(item.tags).to.not.include('changing_image');
      expect(secondItem.tags).to.not.include('changing_image');

      expect(fakeGroups[0].collections[0].items[0]).to.equal(secondItem);
      expect(fakeGroups[0].collections[0].items[1]).to.equal(item);
    });

    it('should call window.open() with the expected parameters when the hero thumb (first thumb) is clicked', () => {
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

    it('should clear out the current sorter to allow a new one to be built', () => {
      givenASingleRendering();

      expect(nounsAndVerbs.peerAtWorld().sorter).to.not.equal(false);
      givenBannerClicked();
      expect(nounsAndVerbs.peerAtWorld().sorter).to.equal(false);
    });

    it('should clear the limitRenderTo flag (set it to false)', () => {
      nounsAndVerbs.prime({limitRenderTo: chance.word()});

      givenASingleRendering();

      givenBannerClicked();
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal(false);
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
      givenASingleRendering();

      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal(false);
      nounsAndVerbs.whenCollapseToGroupsClicked();
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal('collectionNames');
    });

    it('should create a new Newest Photos strat sorter and tell it to load everything', () => {
      let countOfItems = fakeGroups.reduce((count, g) => count + g.collections.reduce((itemCount, collection) => itemCount + collection.items.length, 0), 0);

      givenASingleRendering();

      nounsAndVerbs.whenCollapseToGroupsClicked();

      assert.calledWithExactly(NewestPhotosStrategy.create, externals.data);
      assert.calledWithExactly(fakeNewestPhotosStratTwo.next, countOfItems);

      expect(nounsAndVerbs.peerAtWorld().sorter).to.equal(fakeNewestPhotosStratTwo);
    });

    it('should re-render the whole world with the updated rendering restriction', () => {
      givenASingleRendering();

      nounsAndVerbs.whenCollapseToGroupsClicked();

      React.createElement.reset();
      ReactDOM.render.reset();
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      expect(React.createElement.lastCall.args[1]).to.have.property('limitRenderTo')
        .that.equals('collectionNames');
      assert.calledOnce(ReactDOM.render);
    });
  });

  describe('when a collection name is clicked', () => {
    it('should create a CollectionInGroup and store that as the world state\'s sorter', () => {
      assert.notCalled(GroupInCollectionStrategy.create);

      nounsAndVerbs.whenCollectionNameClicked();

      assert.calledOnce(GroupInCollectionStrategy.create);
      expect(nounsAndVerbs.peerAtWorld().sorter).to.equal(fakeCollectionInGroupStrat);
    });

    it('should pass the external data (groups) and the collection name to the CollectionInGroup strategy', () => {
      nounsAndVerbs.whenCollectionNameClicked(expectedCollection.collection);

      assert.calledWithExactly(GroupInCollectionStrategy.create, externals.data, expectedCollection.collection);
    });

    it('should clear the rendering restriction', () => {
      givenASingleRendering();
      givenCollapsedToGroups();

      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal('collectionNames');
      nounsAndVerbs.whenCollectionNameClicked(expectedCollection.collection);
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo).to.equal(false);
    });

    it('should re-render the whole world', () => {
      givenASingleRendering();
      givenCollapsedToGroups();

      React.createElement.reset();
      ReactDOM.render.reset();
      PromiseMaker.buildPromise.reset();

      nounsAndVerbs.whenCollectionNameClicked();
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      assert.calledOnce(ReactDOM.render);
    });
  });
});
