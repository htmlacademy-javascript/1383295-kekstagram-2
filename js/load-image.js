import '../vendor/pristine/pristine.min.js';
import { modalMenu } from './modal.js';
import { errorText, isHashtagsValid } from './validation/check-hashtag-validity.js';
import { errorMessage, isDescriptionValid } from './validation/check-description-validity.js';
import { sendData } from './api.js';
import { showAlert } from './utility.js';
import { appendNotification, closeNotification } from './notification-module.js';

const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const formSubmit = document.querySelector('.img-upload__submit');

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
  pristine.addValidator(descriptionElement, isDescriptionValid, errorMessage, 2, false);

  const sendFormData = async (x) => {
    const isValid = pristine.validate();

    if (isValid) {
      try {
        await sendData(new FormData(formElement));
        appendNotification(templateSuccess, () => console.log('closeEditingForm'));
      } catch (error) {
        appendNotification(templateError);
      } finally {
        console.log('enableButton');
      }
    }
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    sendFormData(evt.target);
  };

  formSubmit.addEventListener('submit', formSubmitHandler);
};

export {loadImage};
