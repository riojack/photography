import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import transforms from '../src/transform-utilities';

describe('Transformer tests', () => {
  let chance,
    listOfThings;

  function makeThing() {
    return {
      blah: chance.string()
    };
  }

  beforeEach('set up', () => {
    chance = new Chance();

    listOfThings = chance.n(makeThing, chance.integer({min: 15, max: 30}));
  });

  describe('when adding item click handlers', () => {
    it('should have a function called injectOnClick', () => {
      expect(transforms).to.have.property('injectOnClick')
        .that.is.a('function');
    });

    it('should add the provided function to each item in the provide last as the "onClick" property', () => {
      let onClick = stub();

      listOfThings.forEach(thing => expect(thing).to.not.have.property('onClick'));

      transforms.injectOnClick(listOfThings, onClick);

      listOfThings.forEach(thing => expect(thing).to.have.property('onClick').that.equals(onClick));
    });
  });
});
