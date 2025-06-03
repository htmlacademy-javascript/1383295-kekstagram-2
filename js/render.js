import {showBigPicture} from './big-photo.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const { url, description, likes } = photo;
  const element = template.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;

  const onPhotoElementClick = (evt) => {
    evt.preventDefault();

    showBigPicture(photo);
  };

  element.addEventListener('click', onPhotoElementClick);

  return element;
};

const renderPhotos = (photos) => {
  photos?.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  container.appendChild(fragment);
};

export {renderPhotos};
