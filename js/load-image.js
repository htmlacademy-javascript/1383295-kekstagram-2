import '../vendor/pristine/pristine.min.js';
import { modalMenu } from './modal.js';
import {errorText, isHashtagsValid, isDescriptionValid, errorMessageDescription} from './validation.js';

import { sendData } from './api.js';
import { showAlert } from './utility.js';
import { appendNotification, closeNotification } from './notification-module.js';

const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

modalMenu();

const loadImage = () => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  pristine.addValidator(hashtagsElement, isHashtagsValid, errorText, 2, false);
  pristine.addValidator(descriptionElement, isDescriptionValid, errorMessageDescription, 2, false);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    console.log(pristine);

    if (pristine.validate()) {
      console.log('все ок');
    } else {
      console.log('есть вопросики');
    }
  });


};

export {loadImage};

