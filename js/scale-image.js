const previewContainer = document.querySelector('.img-upload__preview-container');
const imgPreview = previewContainer.querySelector('img');
const scaleControl = previewContainer.querySelector('.scale__control--value');
const SCALE_STEP = 0.25;
let scale = 1;

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    imgPreview.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    imgPreview.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

export {onSmallerClick, onBiggerClick};
