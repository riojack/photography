class PhotoScaling {
  constructor(h_scale, v_scale) {
    this.h_scale = h_scale;
    this.v_scale = v_scale;
  }

  transform(photo) {
    photo.height = photo.height * this.v_scale;
    photo.width = photo.width * this.h_scale;

    return photo;
  }
}

export default PhotoScaling;
