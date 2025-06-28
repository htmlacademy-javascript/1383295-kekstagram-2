const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1
};

const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1
};

const sliderOptionsObjectPhobos = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1
};

const sliderOptionsObjectsHeat = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1
};

const Effects = {
  none: sliderOptionsObjectMarvinDefault,
  chrome: sliderOptionsObjectChromeSepia,
  sepia: sliderOptionsObjectChromeSepia,
  marvin: sliderOptionsObjectMarvinDefault,
  phobos: sliderOptionsObjectPhobos,
  heat: sliderOptionsObjectsHeat,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const StyleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter
};

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  return selectors[currentInputId];
};

export {Effects, StyleFilterByEffects, getEffectSelector};
