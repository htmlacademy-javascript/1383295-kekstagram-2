const SCALE_MAX = 1;
const SCALE_MIN = 0.25;
const SCALE_STEP = 0.25;

const previewContainer = document.querySelector('.img-upload__preview-container');
const imgPreview = previewContainer.querySelector('img');
const scaleControl = previewContainer.querySelector('.scale__control--value');

let scale = 1;

const onSmallerClick = () => {
  if (scale > SCALE_MIN) {
    imgPreview.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < SCALE_MAX) {
    imgPreview.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

export {onSmallerClick, onBiggerClick};
