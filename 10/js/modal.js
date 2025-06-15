import {isEscapeKey} from './utility.js';
import { onSmallerClick, onBiggerClick } from './scale-image.js';
import {onEffectRadioBtnClick} from './edite-image.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const previewContainer = document.querySelector('.img-upload__preview-container');
const biggerClick = previewContainer.querySelector('.scale__control--bigger');
const smallerClick = previewContainer.querySelector('.scale__control--smaller');

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');

const modalMenu = ()=> {
  const onBigPictureEscKeyDown = (evt) => {
    if (isEscapeKey(evt)
      && !evt.target.classList.contains('text__hashtags')
      && !evt.target.classList.contains('text__description')
    ) {
      evt.preventDefault();
      closeModal();
    }
  };

  function closeModal() {
    imgOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUploadInput.value = '';
  }

  imgUploadInput.addEventListener('change', () => {
    imgOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  imgUploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onBigPictureEscKeyDown);
  smallerClick.addEventListener('click', onSmallerClick);
  biggerClick.addEventListener('click', onBiggerClick);
  effectsList.addEventListener('change', onEffectRadioBtnClick);
};

export {modalMenu};
