import '../vendor/pristine/pristine.min.js';
import { modalMenu } from './modal.js';
import { error, isHashtagsValid } from './check-hashtag-validity.js';
import { errorMessage, isDescriptionValid } from './check-description-validity.js';

const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const formSubmit = document.querySelector('.img-upload__submit');

modalMenu();

const loadImage = () => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  pristine.addValidator(hashtagsElement, isHashtagsValid, error, 2, false);
  pristine.addValidator(descriptionElement, isDescriptionValid, errorMessage, 2, false);

  formSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      hashtagsElement.value = hashtagsElement.value.trim().replaceAll(/\s+/g, ' ');
      formElement.submit();
    }
  });
};

export {loadImage};
