class PhotoScaling {
  static create(h_scale, v_scale) {
    return new PhotoScaling(h_scale, v_scale);
  }

  constructor(h_scale, v_scale) {
    this.h_scale = h_scale;
    this.v_scale = v_scale;
  }

  transform(photo) {
    let scaled_height = photo.height * this.v_scale,
      scaled_width = photo.width * this.h_scale;

    return Object.assign({}, photo, {height: scaled_height, width: scaled_width});
  }
}

export default PhotoScaling;
