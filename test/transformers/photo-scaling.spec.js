import {expect} from "chai";
import {stub} from "sinon";
import Chance from "chance";
import PhotoScaling from "../../src/transformers/photo-scaling";

describe('Photo Scaling transformer tests', () => {
  let chance,
    given_height,
    given_width,
    h_scale,
    v_scale,
    photo,
    transformer;

  beforeEach('set up', () => {
    chance = new Chance();
    h_scale = chance.floating({min: 0, max: 1});
    v_scale = chance.floating({min: 0, max: 1});
    given_height = chance.integer({min: 0, max: 1000});
    given_width = chance.integer({min: 0, max: 1000});
    photo = {
      height: given_height,
      width: given_width
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

  it('should return a new photo object and also not modify the original photo', () => {
    let actual_photo = transformer.transform(photo);

    expect(actual_photo).to.not.equal(photo);

    expect(photo.height, 'height').to.equal(given_height);
    expect(photo.width, 'width').to.equal(given_width);
  });
});
