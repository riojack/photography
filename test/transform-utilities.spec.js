import { expect } from 'chai';

import TransformUtilities from '../src/transform-utilities';

describe('Transformer tests', () => {
  let listOfThings;

  beforeEach('set up', () => {
    listOfThings = [
      { blah: 'thing1' },
      { blah: 'thing2' },
      { blah: 'thing3' },
    ];
  });

  describe('when adding item click handlers', () => {
    it('should have a function called injectOnClick', () => {
      expect(TransformUtilities.injectOnClick)
        .to
        .be
        .a('function');
    });

    it('should add the provided function to each item in the provide last as the "onClick" property', () => {
      const onClick = () => {};

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
