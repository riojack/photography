import { fail } from 'assert';
import { expect } from 'chai';
import { assert, createSandbox, stub } from 'sinon';
import Chance from 'chance';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PromiseMaker from '../src/promise-maker';
import GroupInCollectionStrategy from '../src/view-strategies/collection-in-group';
import ByCollectionStrategy from '../src/view-strategies/by-collection';
import App from '../src/App';
import nounsAndVerbs from '../src/nouns-and-verbs';

describe('Nouns and verbs (data and behavior) tests', () => {
  let chance;
  let externals;
  let item;
  let secondItem;
  let fakeNode;
  let fakeRoot;
  let fakePromise;
  let secondFakePromise;
  let fakeElement;
  let fakeGroups;
  let fakeNextFive;
  let fakeByCollectionStratOne;
  let fakeByCollectionStratTwo;
  let fakeCollectionInGroupStrat;
  let expectedCollection;
  let sandbox;

  function encodeToBase64(val) {
    return (Buffer.from(val, 'utf8')).toString('base64');
  }

  function makePhoto(opts) {
    const safeOpts = opts || {};
    const photoName = safeOpts.photoName || chance.word({ length: 32 });
    const collectionTime = safeOpts.collectionTime || (chance.timestamp() * 1000);
    const collectionName = safeOpts.collectionName || chance.word({ length: 32 });
    const groupName = safeOpts.groupName || chance.word({ length: 32 });

    const photoNameEnc = encodeToBase64(photoName);
    const collTimeEnc = encodeToBase64(`${collectionTime}`);
    const collNameEnc = encodeToBase64(collectionName);
    const groupNameEnc = encodeToBase64(groupName);

    return {
      lookupId: `${photoNameEnc}|${collTimeEnc}|${collNameEnc}|${groupNameEnc}`,
      height: chance.integer(),
      width: chance.integer(),
      tags: [],
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
    const props = getLastCreateElementProps();

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

    // Create a real DOM element for React 18's createRoot
    fakeNode = global.document.createElement('div');
    fakeNode.scrollTop = -1;

    fakePromise = {
      then: stub(),
    };
    secondFakePromise = {
      then: stub(),
    };

    fakeElement = {
      someElement: `it-can-be-whatever-${chance.word()}`,
    };

    const collectionTime = chance.timestamp();
    item = Object.assign({
      image: 'blah 001',
      name: 'picture 001',
    }, makePhoto({
      photoName: 'picture 001',
      groupName: 'something-1',
      collectionName: 'collection 1',
      collectionTime,
    }));

    secondItem = Object.assign({
      image: 'blah 002',
      name: 'picture 002',
    }, makePhoto({
      photoName: 'picture 002',
      groupName: 'something-1',
      collectionName: 'collection 1',
      collectionTime,
    }));

    fakeGroups = [
      {
        group: 'something-1',
        collections: [{
          collection: 'collection 1',
          time: collectionTime,
          items: [item, secondItem, makePhoto()],
        }],
      },
      {
        group: 'something-2',
        collections: [{
          collection: 'collection 2',
          items: [makePhoto(), makePhoto(), makePhoto()],
        }],
      },
      {
        group: 'something-3',
        collections: [{
          collection: 'collection 3',
          items: [makePhoto(), makePhoto(), makePhoto()],
        }],
      },
    ];

    fakeNextFive = [
      {
        group: 'something-1',
        collections: [{
          collection: 'collection 1',
          items: [{}, {}, {}],
        }],
      },
      {
        group: 'something-2',
        collections: [{
          collection: 'collection 2',
          items: [{}, {}, {}],
        }],
      },
      {
        group: 'something-3',
        collections: [{
          collection: 'collection 3',
          items: [{}, {}, {}],
        }],
      },
      {
        group: 'something-4',
        collections: [{
          collection: 'collection 4',
          items: [{}, {}, {}],
        }],
      },
      {
        group: 'something-5',
        collections: [{
          collection: 'collection 5',
          items: [{}, {}, {}],
        }],
      },
    ];

    fakeByCollectionStratOne = {
      something: `blah-${chance.word()}`,
      next: stub()
        .returns(fakeNextFive),
      reset: stub(),
    };

    fakeByCollectionStratTwo = {
      something: `another-blah-${chance.word()}`,
      next: stub()
        .returns([]),
      reset: stub(),
    };

    fakeCollectionInGroupStrat = {
      something: `collection-in-group-${chance.word()}`,
      next: stub()
        .returns([fakeGroups[0]]),
    };

    expectedCollection = chance.pickone(chance.pickone(fakeGroups).collections);

    sandbox.stub(React);

    externals = {
      setTimeout: stub(),
      window: {
        open: stub(),
      },
      document: {
        getElementById: stub(),
      },
      data: fakeGroups,
    };

    fakeRoot = {
      render: stub(),
    };

    sandbox.stub(PromiseMaker, 'buildPromise');
    PromiseMaker.buildPromise.onCall(0)
      .returns(fakePromise);
    PromiseMaker.buildPromise.onCall(1)
      .returns(secondFakePromise);
    externals.document.getElementById.withArgs('photography-app-container')
      .returns(fakeNode);
    React.createElement.returns(fakeElement);

    sandbox.stub(ReactDOM, 'createRoot').returns(fakeRoot);
    sandbox.stub(ByCollectionStrategy, 'create');
    sandbox.stub(GroupInCollectionStrategy, 'create')
      .returns(fakeCollectionInGroupStrat);

    ByCollectionStrategy.create.onCall(0)
      .returns(fakeByCollectionStratOne);
    ByCollectionStrategy.create.onCall(1)
      .returns(fakeByCollectionStratTwo);

    nounsAndVerbs.withExternals(externals);
  });

  afterEach('tear down', () => {
    sandbox.restore();
    nounsAndVerbs.unregisterExternals();
    nounsAndVerbs.resetMergers();
  });

  describe('initial world values', () => {
    it('should have a property called "transformer" that is set to the value of false', () => {
      expect(nounsAndVerbs.peerAtWorld())
        .to
        .have
        .property('transformer')
        .that
        .equals(false);
    });

    it('should have a property called "sorter" that is set to the value of false', () => {
      expect(nounsAndVerbs.peerAtWorld())
        .to
        .have
        .property('sorter')
        .that
        .equals(false);
    });

    it('should have a property called "limitRenderTo" that is the boolean value false', () => {
      expect(nounsAndVerbs.peerAtWorld())
        .to
        .have
        .property('limitRenderTo')
        .that
        .equals(false);
    });

    it('should have a property called "skipLoadingNextGroup" that is the boolean value false', () => {
      expect(nounsAndVerbs.peerAtWorld())
        .to
        .have
        .property('skipLoadingNextGroup')
        .that
        .equals(false);
    });
  });

  describe('when rendering the application', () => {
    it('should return a promise', () => {
      const promise = nounsAndVerbs.doRender();

      expect(promise)
        .to
        .equal(fakePromise);
    });

    it('should give the promise a function', () => {
      nounsAndVerbs.doRender();

      expect(PromiseMaker.buildPromise.lastCall.args[0])
        .to
        .be
        .a('function');
    });

    it('should default to ByCollectionStrategy in the world state when the promise executes the function', () => {
      givenASingleRendering();

      assert.calledOnce(ByCollectionStrategy.create);
      assert.calledWithExactly(ByCollectionStrategy.create, externals.data);

      expect(nounsAndVerbs.peerAtWorld())
        .to
        .have
        .property('sorter')
        .that
        .equals(fakeByCollectionStratOne);
    });

    it('should not recreate a ByCollectionStrategy after first call, when the promise executes the function', () => {
      nounsAndVerbs.doRender();
      nounsAndVerbs.doRender();
      nounsAndVerbs.doRender();
      PromiseMaker.buildPromise.getCall(0).args[0](stub());
      PromiseMaker.buildPromise.getCall(1).args[0](stub());
      PromiseMaker.buildPromise.getCall(2).args[0](stub());

      assert.calledOnce(ByCollectionStrategy.create);
    });

    it('should create an App element with groups from the next(5) of the sorter plus a whenBannerClicked function, '
      + 'when the promise executes the function', () => {
      givenASingleRendering();

      const expectedGroups = nounsAndVerbs.peerAtWorld()
        .sorter
        .next(5);

      assert.calledOnce(React.createElement);
      assert.calledWith(React.createElement, App);

      expect(React.createElement.lastCall.args[1])
        .to
        .have
        .property('groups')
        .that
        .eqls(expectedGroups);

      expect(React.createElement.lastCall.args[1])
        .to
        .have
        .property('whenBannerClicked')
        .that
        .is
        .a('function');
    });

    it('should also pass a whenCollapseToGroupsClicked function to the App element', () => {
      givenASingleRendering();

      expect(React.createElement.lastCall.args[1])
        .to
        .have
        .property('whenCollapseToGroupsClicked')
        .that
        .is
        .a('function');
    });

    it('should also pass a whenCollectionNameClicked function to the App element', () => {
      givenASingleRendering();

      expect(React.createElement.lastCall.args[1])
        .to
        .have
        .property('whenCollectionNameClicked')
        .that
        .is
        .a('function');
    });

    it('should inject into each item in each collection in each group an "onClick" handler, when the promise executes '
      + 'the function', () => {
      givenASingleRendering();

      React.createElement.lastCall.args[1].groups.forEach((g) => {
        g.collections.forEach((c) => {
          c.items.forEach((collectionItem) => {
            expect(collectionItem)
              .to
              .have
              .property('onClick')
              .that
              .is
              .a('function');
          });
        });
      });
    });

    it('should render the App element into the photography-app-container element and pass it the resolve argument, '
      + 'when the promise executes the function', () => {
      const resolver = stub();

      nounsAndVerbs.doRender();
      PromiseMaker.buildPromise.lastCall.args[0](resolver);

      assert.calledOnce(ReactDOM.createRoot);
      assert.calledWith(ReactDOM.createRoot, fakeNode);
      assert.calledOnce(fakeRoot.render);
      assert.calledWith(fakeRoot.render, fakeElement);
      assert.calledOnce(resolver);
    });
  });

  describe('when a thumbnail is clicked', () => {
    it('should swap the hero thumb with the clicked thumb by setting the "changing_image" tag, rendering, and then '
      + 'un-setting the tags', () => {
      nounsAndVerbs.whenThumbClicked.call({}, secondItem);

      assert.notCalled(externals.window.open);

      expect(item.tags)
        .to
        .include('changing_image');
      expect(secondItem.tags)
        .to
        .include('changing_image');

      PromiseMaker.buildPromise.lastCall.args[0](stub());
      fakePromise.then.lastCall.args[0]();
      PromiseMaker.buildPromise.lastCall.args[0](stub());

      assert.calledOnce(externals.setTimeout);

      externals.setTimeout.lastCall.args[0]();
      secondFakePromise.then.lastCall.args[0]();

      expect(item.tags)
        .to
        .not
        .include('changing_image');
      expect(secondItem.tags)
        .to
        .not
        .include('changing_image');

      expect(fakeGroups[0].collections[0].items[0])
        .to
        .equal(secondItem);
      expect(fakeGroups[0].collections[0].items[1])
        .to
        .equal(item);
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

      expect(fakeNode.scrollTop)
        .to
        .equal(0);
    });

    it('should clear out the current sorter to allow a new one to be built', () => {
      givenASingleRendering();

      expect(nounsAndVerbs.peerAtWorld().sorter)
        .to
        .not
        .equal(false);
      givenBannerClicked();
      expect(nounsAndVerbs.peerAtWorld().sorter)
        .to
        .equal(false);
    });

    it('should clear the limitRenderTo flag (set it to false)', () => {
      nounsAndVerbs.prime({ limitRenderTo: chance.word() });

      givenASingleRendering();

      givenBannerClicked();
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo)
        .to
        .equal(false);
    });

    it('should re-render the whole application', () => {
      givenASingleRendering();
      givenBannerClicked();
      givenASingleRendering();

      assert.calledTwice(React.createElement);
      assert.calledTwice(fakeRoot.render);
    });
  });

  describe('when collapse to collections is clicked', () => {
    it('should update the world state\'s limitRenderTo property to a value of "collectionNames"', () => {
      givenASingleRendering();

      expect(nounsAndVerbs.peerAtWorld().limitRenderTo)
        .to
        .equal(false);
      nounsAndVerbs.whenCollapseToGroupsClicked();
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo)
        .to
        .equal('collectionNames');
    });

    it('should create a new ByCollectionStrategy and tell it to load everything', () => {
      const countOfItems = fakeGroups.reduce(
        (count, g) => count + g.collections.reduce((itemCount, collection) => itemCount + collection.items.length, 0),
        0,
      );

      givenASingleRendering();

      nounsAndVerbs.whenCollapseToGroupsClicked();

      assert.calledWithExactly(ByCollectionStrategy.create, externals.data);
      assert.calledWithExactly(fakeByCollectionStratTwo.next, countOfItems);

      expect(nounsAndVerbs.peerAtWorld().sorter)
        .to
        .equal(fakeByCollectionStratTwo);
    });

    it('should re-render the whole world with the updated rendering restriction', () => {
      givenASingleRendering();

      nounsAndVerbs.whenCollapseToGroupsClicked();

      React.createElement.reset();
      fakeRoot.render.resetHistory();
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      expect(React.createElement.lastCall.args[1])
        .to
        .have
        .property('limitRenderTo')
        .that
        .equals('collectionNames');
      assert.calledOnce(fakeRoot.render);
    });
  });

  describe('when a collection name is clicked', () => {
    it('should create a CollectionInGroup and store that as the world state\'s sorter', () => {
      assert.notCalled(GroupInCollectionStrategy.create);

      nounsAndVerbs.whenCollectionNameClicked();

      assert.calledOnce(GroupInCollectionStrategy.create);
      expect(nounsAndVerbs.peerAtWorld().sorter)
        .to
        .equal(fakeCollectionInGroupStrat);
    });

    it('should pass the external data (groups) and the collection name to the CollectionInGroup strategy', () => {
      nounsAndVerbs.whenCollectionNameClicked(expectedCollection.collection);

      assert.calledWithExactly(GroupInCollectionStrategy.create, externals.data, expectedCollection.collection);
    });

    it('should clear the rendering restriction', () => {
      givenASingleRendering();
      givenCollapsedToGroups();

      expect(nounsAndVerbs.peerAtWorld().limitRenderTo)
        .to
        .equal('collectionNames');
      nounsAndVerbs.whenCollectionNameClicked(expectedCollection.collection);
      expect(nounsAndVerbs.peerAtWorld().limitRenderTo)
        .to
        .equal(false);
    });

    it('should re-render the whole world', () => {
      givenASingleRendering();
      givenCollapsedToGroups();

      React.createElement.reset();
      fakeRoot.render.resetHistory();
      PromiseMaker.buildPromise.reset();

      nounsAndVerbs.whenCollectionNameClicked();
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      assert.calledOnce(fakeRoot.render);
    });
  });

  describe('onContainerScroll', () => {
    const viewportHeight = 10;
    const positionYRelativeToTop = 900;
    const viewportScrollMaximum = 1000;

    it('should trigger a re-render if the scroll reaches 90% of the scroll bar', () => {
      const fakeContainerElement = {
        clientHeight: viewportHeight,
        scrollTop: positionYRelativeToTop,
        scrollHeight: viewportScrollMaximum,
      };

      nounsAndVerbs.onContainerScroll.call(fakeContainerElement);
      whenRenderPromiseIsResolved();

      assert.calledOnce(React.createElement);
      assert.calledOnce(fakeRoot.render);
    });

    it('should not trigger a re-render if the scroll stays below 90%', () => {
      const fakeContainerElement = {
        clientHeight: viewportHeight,
        scrollTop: positionYRelativeToTop - 400,
        scrollHeight: viewportScrollMaximum,
      };
      nounsAndVerbs.onContainerScroll.call(fakeContainerElement);

      assert.notCalled(PromiseMaker.buildPromise);
    });
  });
});
