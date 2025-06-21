import {Effects, StyleFilterByEffects, getEffectSelector} from './slider-settings.js';
const EFFECT_LEVEL_MAX = 100;

const uploadForm = document.querySelector('.img-upload__form');
const photoPreview = uploadForm.querySelector('.img-upload__preview');
const imgPreview = photoPreview.firstElementChild;
const selectorImg = imgPreview.classList;

const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = EFFECT_LEVEL_MAX;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

const getUpdateSliderOptions = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--none');
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnValue));
    getUpdateSliderOptions(effectBtnValue, effectSlider);
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        sliderContainer.classList.remove('hidden');
        imgPreview.style.filter = StyleFilterByEffects[item.value](effectLevelInput.value);
      } else {
        resetFilter();
      }
    }
  });
});

export {onEffectRadioBtnClick};
