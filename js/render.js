import { getRenderBigPictire } from './big-photo.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const showImgFiters = () => {
  const imgFiters = document.querySelector('.img-filters');
  imgFiters.classList.remove('img-filters--inactive');
};

const getRenderPhoto = (photo) => {
  const { url, description, likes, comments } = photo;
  const element = template.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  const onPhotoElementClick = (evt) => {
    evt.preventDefault();

    getRenderBigPictire(photo);
  };

  element.addEventListener('click', onPhotoElementClick);

  return element;
};

const getRenderPhotos = (photos) => {
  photos?.forEach((photo) => {
    fragment.appendChild(getRenderPhoto(photo));
  });

  container.appendChild(fragment);
  showImgFiters();
};

export { getRenderPhotos };
