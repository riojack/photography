import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import {isTallImage} from '../src/image-utilities';

describe('Image Utilities tests', () => {
  let chance;

  beforeEach('set up', () => {
    chance = new Chance();
  });

  describe('isTallImage utility', () => {
    it('should return true if image.height is greater than image.width', () => {
      expect(isTallImage({height: 2, width: 1})).to.equal(true);
    });

    it('should return false if image.height is equal to image.width', () => {
      expect(isTallImage({height: 2, width: 2})).to.equal(false);
    });

    it('should return false if image.height is less than image.width', () => {
      expect(isTallImage({height: 1, width: 2})).to.equal(false);
    });
  });
});
