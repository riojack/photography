const LARGE_SCALE = 0.9;
const MID_SCALE = 0.7;
const SMALL_SCALE = 0.4;

const scale = {
  LARGE_SCALE, MID_SCALE, SMALL_SCALE,
};

function isTallImage(image) {
  return image.height > image.width;
}

function nextScale(scaleNext) {
  let proceedingScale = MID_SCALE;

  if (scaleNext === MID_SCALE) {
    proceedingScale = SMALL_SCALE;
  } else if (scaleNext === SMALL_SCALE) {
    proceedingScale = LARGE_SCALE;
  }

  return proceedingScale;
}

function nextScaleOfImage(scaleNext, image) {
  const targetScale = nextScale(scaleNext);

  return {
    height: image.height * targetScale,
    width: image.width * targetScale,
  };
}

function previousScale(currentScale) {
  return nextScale(nextScale(currentScale));
}

export default {
  isTallImage,
  nextScale,
  nextScaleOfImage,
  previousScale,
  scale,
};

export {
  isTallImage,
  nextScale,
  nextScaleOfImage,
  previousScale,
  scale,
};
