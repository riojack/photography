import {expect} from 'chai';
import {stub, assert} from 'sinon';
import Chance from 'chance';

import nounsAndVerbs from '../src/nouns-and-verbs';

describe('Data and behavior tests', () => {
  let chance,
    externals,

    item;
  
  beforeEach('set up', () => {
    chance = new Chance();

    externals = {
      window: {
        open: stub()
      }
    };

    nounsAndVerbs.registerExternals(externals);

    item = {
      image: 'blah'
    }
  });

  afterEach('tear down', () => {
    nounsAndVerbs.unregisterExternals();
  });

  it('should call window.open() with the expected parameters when thumb is clicked', () => {
    assert.notCalled(externals.window.open);

    nounsAndVerbs.whenThumbClicked.call({}, item);

    assert.calledOnce(externals.window.open);
    assert.calledWith(externals.window.open, item.image, 'iowa-light-view-photo');
  });

});
