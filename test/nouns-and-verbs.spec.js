import { expect } from 'chai';
import nounsAndVerbs from '../src/nouns-and-verbs';

describe('Nouns and verbs (data and behavior) tests', () => {
  let container;

  beforeEach('set up', () => {
    // Create a real DOM container
    container = global.document.createElement('div');
    container.id = 'photography-app-container';
    global.document.body.appendChild(container);

    // Simple test data
    const testData = [
      {
        group: 'Test Group 1',
        collections: [
          {
            collection: 'Collection A',
            time: Date.now(),
            items: [
              {
                name: 'photo1',
                image: './test1.jpg',
                backgroundUrl: './test1-bg.jpg',
                height: 100,
                width: 100,
              },
              {
                name: 'photo2',
                image: './test2.jpg',
                backgroundUrl: './test2-bg.jpg',
                height: 100,
                width: 100,
              },
            ],
          },
        ],
      },
    ];

    // Set up externals with real or minimal dependencies
    nounsAndVerbs.withExternals({
      setTimeout: global.setTimeout,
      window: {
        open: () => {},
      },
      document: global.document,
      data: testData,
    });
  });

  afterEach('tear down', () => {
    nounsAndVerbs.unregisterExternals();
    nounsAndVerbs.resetMergers();
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('initial world values', () => {
    it('should have initial state with transformer set to false', () => {
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.transformer).to.equal(false);
    });

    it('should have initial state with sorter set to false', () => {
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.sorter).to.equal(false);
    });

    it('should have initial state with limitRenderTo set to false', () => {
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.limitRenderTo).to.equal(false);
    });

    it('should have initial state with skipLoadingNextGroup set to false', () => {
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.skipLoadingNextGroup).to.equal(false);
    });
  });

  describe('when rendering the application', () => {
    it('should return a promise', () => {
      const result = nounsAndVerbs.doRender();
      expect(result).to.be.an.instanceof(Promise);
    });

    it('should create a sorter when doRender is called', () => {
      nounsAndVerbs.doRender();
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.sorter).to.not.equal(false);
    });
  });

  describe('when the Iowa Light banner is clicked', () => {
    it('should reset scroll position and clear limitRenderTo', () => {
      nounsAndVerbs.doRender();
      container.scrollTop = 100;
      
      const worldBefore = nounsAndVerbs.peerAtWorld();
      worldBefore.limitRenderTo = 'something';
      
      nounsAndVerbs.whenBannerClicked();
      
      expect(container.scrollTop).to.equal(0);
      const worldAfter = nounsAndVerbs.peerAtWorld();
      expect(worldAfter.limitRenderTo).to.equal(false);
    });
  });

  describe('when collapse to collections is clicked', () => {
    it('should update world state to show collection names only', () => {
      nounsAndVerbs.doRender();
      
      nounsAndVerbs.whenCollapseToGroupsClicked('test');
      
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.limitRenderTo).to.equal('collectionNames');
    });
  });

  describe('when a collection name is clicked', () => {
    it('should clear limitRenderTo to show full collection', () => {
      nounsAndVerbs.doRender();
      
      nounsAndVerbs.whenCollectionNameClicked('Collection A');
      
      const world = nounsAndVerbs.peerAtWorld();
      expect(world.limitRenderTo).to.equal(false);
    });
  });

  describe('onContainerScroll', () => {
    it('should handle scroll events without error', () => {
      nounsAndVerbs.doRender();
      
      // Create a mock scroll event with low scroll position
      const scrollEvent = {
        target: {
          scrollTop: 50,
          scrollHeight: 1000,
          clientHeight: 100,
        },
      };
      
      // Just verify it doesn't throw
      expect(() => nounsAndVerbs.onContainerScroll(scrollEvent)).to.not.throw();
    });
  });
});
