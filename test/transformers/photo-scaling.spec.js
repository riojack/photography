import {expect} from 'chai';
import {stub} from 'sinon';
import Chance from 'chance';

import PhotoScaling from '../../src/transformers/photo-scaling';

describe('Photo Scaling transformer tests', () => {
  let chance,
    h_scale,
    v_scale,
    photo,
    transformer;

  beforeEach('set up', () => {
    chance = new Chance();
    h_scale = chance.floating({min: 0, max: 1});
    v_scale = chance.floating({min: 0, max: 1});
    photo = {
      height: chance.integer({min: 0, max: 1000}),
      width: chance.integer({min: 0, max: 1000})
    };

    transformer = new PhotoScaling(h_scale, v_scale);
  });

  it('should scale the photo\'s height and width by h-scale and v-scale respectively', () => {
    let expected_height = photo.height * v_scale,
      expected_width = photo.width * h_scale,

      actual_photo = transformer.transform(photo);

    expect(actual_photo).to.have.property('height')
      .that.equals(expected_height);

    expect(actual_photo).to.have.property('width')
      .that.equals(expected_width);
  });
});
