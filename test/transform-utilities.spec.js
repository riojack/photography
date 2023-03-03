import { expect } from 'chai';
import { stub } from 'sinon';
import Chance from 'chance';

import TransformUtilities from '../src/transform-utilities';

describe('Transformer tests', () => {
  let chance;
  let listOfThings;

  function makeThing() {
    return {
      blah: chance.string(),
    };
  }

  beforeEach(() => {
    chance = new Chance();

    listOfThings = chance.n(makeThing, chance.integer({
      min: 15,
      max: 30,
    }));
  });

  describe('when adding item click handlers', () => {
    it('should have a function called injectOnClick', () => {
      expect(TransformUtilities.injectOnClick)
        .to
        .be
        .a('function');
    });

    it('should add the provided function to each item in the provide last as the "onClick" property', () => {
      const onClick = stub();

      listOfThings.forEach(thing => expect(thing)
        .to
        .not
        .have
        .property('onClick'));

      TransformUtilities.injectOnClick(listOfThings, onClick);

      listOfThings.forEach(thing => expect(thing)
        .to
        .have
        .property('onClick')
        .that
        .equals(onClick));
    });
  });
});
