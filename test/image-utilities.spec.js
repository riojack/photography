import { expect } from 'chai';

import {
  isTallImage, nextScale, nextScaleOfImage, previousScale, scale,
} from '../src/image-utilities';

describe('Image Utilities tests', () => {
  describe('isTallImage utility', () => {
    it('should return true if image.height is greater than image.width', () => {
      expect(isTallImage({
        height: 2,
        width: 1,
      }))
        .to
        .equal(true);
    });

    it('should return false if image.height is equal to image.width', () => {
      expect(isTallImage({
        height: 2,
        width: 2,
      }))
        .to
        .equal(false);
    });

    it('should return false if image.height is less than image.width', () => {
      expect(isTallImage({
        height: 1,
        width: 2,
      }))
        .to
        .equal(false);
    });
  });

  describe('nextScale utility', () => {
    it('should give MID_SCALE as the scaling value following LARGE_SCALE', () => {
      expect(nextScale(scale.LARGE_SCALE))
        .to
        .equal(scale.MID_SCALE);
    });

    it('should give SMALL_SCALE as the scaling value following MID_SCALE', () => {
      expect(nextScale(scale.MID_SCALE))
        .to
        .equal(scale.SMALL_SCALE);
    });

    it('should give LARGE_SCALE as the scaling value following SMALL_SCALE', () => {
      expect(nextScale(scale.SMALL_SCALE))
        .to
        .equal(scale.LARGE_SCALE);
    });
  });

  describe('nextScaleOfImage utility', () => {
    let image;

    beforeEach(() => {
      image = {
        height: 100,
        width: 100,
      };
    });

    it('should scale image to MID_SCALE when scaling from LARGE_SCALE', () => {
      const imageScaled = nextScaleOfImage(scale.LARGE_SCALE, image);
      expect(imageScaled)
        .to
        .eql({
          height: image.height * scale.MID_SCALE,
          width: image.width * scale.MID_SCALE,
        });

      expect(imageScaled, 'Separate references')
        .to
        .not
        .equal(image);
    });

    it('should scale image to SMALL_SCALE when scaling from MID_SCALE', () => {
      const imageScaled = nextScaleOfImage(scale.MID_SCALE, image);
      expect(imageScaled)
        .to
        .eql({
          height: image.height * scale.SMALL_SCALE,
          width: image.width * scale.SMALL_SCALE,
        });

      expect(imageScaled, 'Separate references')
        .to
        .not
        .equal(image);
    });

    it('should scale image to LARGE_SCALE when scaling from SMALL_SCALE', () => {
      const imageScaled = nextScaleOfImage(scale.SMALL_SCALE, image);
      expect(imageScaled)
        .to
        .eql({
          height: image.height * scale.LARGE_SCALE,
          width: image.width * scale.LARGE_SCALE,
        });

      expect(imageScaled, 'Separate references')
        .to
        .not
        .equal(image);
    });
  });

  describe('previousScale utility', () => {
    it('should give MID_SCALE as the scaling value following SMALL_SCALE', () => {
      expect(previousScale(scale.SMALL_SCALE))
        .to
        .equal(scale.MID_SCALE);
    });

    it('should give SMALL_SCALE as the scaling value following LARGE_SCALE', () => {
      expect(previousScale(scale.LARGE_SCALE))
        .to
        .equal(scale.SMALL_SCALE);
    });

    it('should give LARGE_SCALE as the scaling value prior to MID_SCALE', () => {
      expect(previousScale(scale.MID_SCALE))
        .to
        .equal(scale.LARGE_SCALE);
    });
  });
});
