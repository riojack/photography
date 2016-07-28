const LARGE_SCALE = 0.9;
const MID_SCALE = 0.7;
const SMALL_SCALE = 0.4;

let scale = {
  LARGE_SCALE, MID_SCALE, SMALL_SCALE
};

function isTallImage(image) {
  return image.height > image.width;
}

function nextScale(scale) {
  let proceedingScale = MID_SCALE;

  if (scale === MID_SCALE) {
    proceedingScale = SMALL_SCALE;
  }
  else if (scale === SMALL_SCALE) {
    proceedingScale = LARGE_SCALE;
  }

  return proceedingScale;
}

function nextScaleOfImage(scale, image) {
  let targetScale = nextScale(scale);

  return {
    height: image.height * targetScale,
    width: image.width * targetScale
  };
}

function previousScale(scale) {
  return nextScale(nextScale(scale));
}

export default {
  isTallImage,
  nextScale,
  nextScaleOfImage,
  previousScale,
  scale
}

export {
  isTallImage,
  nextScale,
  nextScaleOfImage,
  previousScale,
  scale
};
