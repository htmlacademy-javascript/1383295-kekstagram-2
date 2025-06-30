const SCALE_MAX = 1;
const SCALE_MIN = 0.25;
const SCALE_STEP = 0.25;

import '../vendor/pristine/pristine.min.js';
import { sendData } from './api.js';
import { getErrorText, isHashtagsValid, isDescriptionValid, getErrorMessageDescription } from './validation&slider/validation.js';

import { isEscapeKey, toggleClass, } from './utility.js';
import { onEffectRadioBtnClick, resetFilter } from './validation&slider/slider.js';
import { appendNotification } from './notification.js';

//Шаблоны попапов
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const formElement = document.querySelector('.img-upload__form');
const imgPreview = formElement.querySelector('img');
const imgUploadCancel = formElement.querySelector('.img-upload__cancel');
const imgUploadInput = formElement.querySelector('.img-upload__input');
const imgOverlay = formElement.querySelector('.img-upload__overlay');

//Масштабирование и эффекты
const scaleControl = formElement.querySelector('.scale__control--value');
const biggerClick = formElement.querySelector('.scale__control--bigger');
const smallerClick = formElement.querySelector('.scale__control--smaller');
const effectsList = formElement.querySelector('.effects__list');

//Валидация
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');

//Pristine
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

let scale = 1;

//Уменьшает масштаб изображения
const onSmallerClick = () => {
  if (scale > SCALE_MIN) {
    imgPreview.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

//Увеличивает масштаб изображения
const onBiggerClick = () => {
  if (scale < SCALE_MAX) {
    imgPreview.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

//Сброс масштаба изображения
const resetScale = () => {
  imgPreview.style.transform = `scale(${100}%)`;
  scale = 1;
  scaleControl.value = `${100}%`;
};

const toggleModal = () => {
  toggleClass(imgOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');
};

//Предупреждает закрытие модального окна при наборе хештегов и комментария
const oneEscKeyDown = (evt) => {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeModalForm();
  }
};

//Открывает модальное окно
const openModalForm = () => {
  if (imgOverlay.classList.contains('hidden')) {
    toggleModal();
    document.addEventListener('keydown', oneEscKeyDown);
  }
};

//Закрывает модальное окно
function closeModalForm() {
  if (!imgOverlay.classList.contains('hidden')) {
    toggleModal();
    formElement.reset();
    pristine.reset();
    resetFilter();
    resetScale();
    imgPreview.src = 'img/upload-default-image.jpg';
    imgPreview.style.transform = `scale(${100}%)`;
    document.removeEventListener('keydown', oneEscKeyDown);
  }
}

//Закрывает модальное при нажатии на крестик
const onCloseClick = () => {
  closeModalForm();
};

//Работа с основной формой
const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {

    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      sendData(new FormData(formElement))
        .then(() => {
          appendNotification(templateSuccess);
          closeModalForm();
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
  openModalForm();
  if (document.body.classList.contains('modal-open')) {
    document.addEventListener('keydown', oneEscKeyDown);
  }
});

imgUploadCancel.addEventListener('click', onCloseClick);
smallerClick.addEventListener('click', onSmallerClick);
biggerClick.addEventListener('click', onBiggerClick);
effectsList.addEventListener('change', onEffectRadioBtnClick);

pristine.addValidator(hashtagsElement, isHashtagsValid, getErrorText, 2, false);
pristine.addValidator(descriptionElement, isDescriptionValid, getErrorMessageDescription, 2, false);

export { setUserFormSubmit };

