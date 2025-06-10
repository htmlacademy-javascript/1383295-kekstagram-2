import {isEscapeKey} from './utility.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const modalMenu = ()=> {
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

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
};

export {modalMenu};
