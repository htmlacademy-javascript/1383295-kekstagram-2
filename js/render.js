// import {showBigPicture} from './big-photo.js';
// import { comments} from './comments';

const userPhotosContainer = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotosFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const photoElement = userPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  // photoElement.querySelector('.picture__comments').textContent = comments;

  const onPhotoElementClick = (evt) => {
    evt.preventDefault();

    // showBigPicture(photo);
  };

  photoElement.addEventListener('click', onPhotoElementClick);

  return photoElement;
};

const renderPhotos = (photos) => {
  photos?.forEach((photo) => {
    userPhotosFragment.appendChild(renderPhoto(photo));
  });

  userPhotosContainer.appendChild(userPhotosFragment);
};

export {renderPhotos};
