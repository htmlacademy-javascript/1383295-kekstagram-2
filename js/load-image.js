import '../vendor/pristine/pristine.min.js';
import {errorText, isHashtagsValid, isDescriptionValid, errorMessageDescription} from './validation.js';

import {isEscapeKey, toggleClass} from './utility.js';
import {onSmallerClick, onBiggerClick} from './slider&scale/scale-image.js';
import {onEffectRadioBtnClick, resetFilter} from './slider&scale/slider.js';

import { sendData } from './api.js';
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

const imgFiters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFilterButtons = imgFiltersForm.children;
const pictures = document.getElementsByClassName('picture');
// const popularFilterButton = document.querySelector('#filter-discussed');

const selectFilterButton = (evt) => {
  let target = evt.target;
  //Выбырает фильтр
  for (let i = 0; i < imgFilterButtons.length; i++) {
    imgFilterButtons[i].classList.remove('img-filters__button--active');
  }
  target.classList.add('img-filters__button--active');
  if (target.getAttribute('id') === 'filter-default') {

  }

  console.log(evt.target);
  console.log('selectFilterButton');
};

const deletePictures = () => {
  //Удаляет фотки
  for (let i = pictures.length - 1; i >= 0; i--) {
    pictures[i].parentNode.removeChild(pictures[i]);
  }
  console.log('deletePictures');
};

const setRangePhotos = (cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    deletePictures();

    selectFilterButton(evt);
    cb();
  });
};

const showImgFiters = () => {
  imgFiters.classList.remove('img-filters--inactive');
};

//Закрывает и Открывает модальное окно, сброс настроек
const closeOpenModal = () => {
  toggleClass(imgOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');

  imgPreview.style.transform = `scale(${100}%)`;
  resetFilter();
};

//Предупреждает закрытие модального окна при наборе хештегов и комментария
const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeOpenModal();
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
        .then(appendNotification(templateSuccess))
        .then(formElement.reset())
        .then(closeOpenModal())
        .catch (
          () => {
            appendNotification(templateError);
          }
        );
    }
  });
};


imgUploadInput.addEventListener('change', closeOpenModal);
imgUploadCancel.addEventListener('click', closeOpenModal);
document.addEventListener('keydown', onBigPictureEscKeyDown);
smallerClick.addEventListener('click', onSmallerClick);
biggerClick.addEventListener('click', onBiggerClick);
effectsList.addEventListener('change', onEffectRadioBtnClick);
pristine.addValidator(hashtagsElement, isHashtagsValid, errorText, 2, false);
pristine.addValidator(descriptionElement, isDescriptionValid, errorMessageDescription, 2, false);

export {setUserFormSubmit, showImgFiters, setRangePhotos};

