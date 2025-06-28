import '../vendor/pristine/pristine.min.js';
import { sendData } from './api.js';
import {onSmallerClick, onBiggerClick} from './validation&slider&scale/scale-image.js';
import {getErrorText, isHashtagsValid, isDescriptionValid, getErrorMessageDescription} from './validation&slider&scale/validation.js';

import {isEscapeKey, toggleClass, RANDOM_PHOTOS_NUMERO} from './utility.js';
import {onEffectRadioBtnClick, resetFilter} from './validation&slider&scale/slider.js';
import { appendNotification} from './notification-module.js';

const formElement = document.querySelector('.img-upload__form');
const biggerClick = formElement.querySelector('.scale__control--bigger');
const smallerClick = formElement.querySelector('.scale__control--smaller');
const imgPreview = formElement.querySelector('img');
const effectsList = formElement.querySelector('.effects__list');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');

const imgUploadInput = formElement.querySelector('.img-upload__input');
const imgOverlay = formElement.querySelector('.img-upload__overlay');
const imgUploadCancel = formElement.querySelector('.img-upload__cancel');

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const imgFiltersForm = document.querySelector('.img-filters__form');


const deletePictures = () => {
  const pictures = document.getElementsByClassName('picture');
  [...pictures].forEach((element) => element.remove());
};

const selectFilterButton = (target) => {
  const imgFilterButtons = imgFiltersForm.children;
  [...imgFilterButtons].forEach((element) => element.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

const setFilters = (photos, cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;
    selectFilterButton(target);
    let result = photos;

    if (target.matches('#filter-discussed')) {
      result = photos.slice().sort((min, max) => max.likes - min.likes);
    }
    if (target.matches('#filter-default')) {
      result = photos.slice();
    }
    if (target.matches('#filter-random')) {
      result = photos.slice().sort(() => Math.random() - 0.5).splice(0, RANDOM_PHOTOS_NUMERO);
    }
    deletePictures();
    cb(result);
  });
};

//Закрывает и Открывает модальное окно, сброс настроек
const closeOpenModal = () => {
  toggleClass(imgOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');

  imgPreview.style.transform = `scale(${100}%)`;
  document.removeEventListener('keydown', closeOpenModal);
  resetFilter();
};

//Предупреждает закрытие модального окна при наборе хештегов и комментария
const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
  }
};

//Pristine
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});


const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {

    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      sendData(new FormData(formElement))
        .then(() => {
          appendNotification(templateSuccess);
          closeOpenModal();
          formElement.reset();
        })
        .catch (
          () => {
            appendNotification(templateError);
          }
        );
    }
  });
};


imgUploadInput.addEventListener('change', () => {
  closeOpenModal();
  document.addEventListener('keydown', onBigPictureEscKeyDown);
});
imgUploadCancel.addEventListener('click', closeOpenModal);
smallerClick.addEventListener('click', onSmallerClick);
biggerClick.addEventListener('click', onBiggerClick);
effectsList.addEventListener('change', onEffectRadioBtnClick);

pristine.addValidator(hashtagsElement, isHashtagsValid, getErrorText, 2, false);
pristine.addValidator(descriptionElement, isDescriptionValid, getErrorMessageDescription, 2, false);

export {setUserFormSubmit, closeOpenModal, setFilters};

