import { getRenderPhotos } from './render.js';
import { debounce, } from './utility.js';

const RANDOM_PHOTOS_NUMERO = 10;
const RERENDER_DELAY = 500;

const FilterName = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed'
};

const filterFunctions = {
  setDefault: (photos) => photos.slice(),
  setRandom: (photos) => photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_NUMERO),
  setPopular: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const deletePictures = () => {
  const pictures = document.getElementsByClassName('picture');
  [...pictures].forEach((element) => element.remove());
};

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
let currentButton = filterForm.querySelector('.img-filters__button--active');

let posts = [];

const renderWithDelay = debounce(getRenderPhotos, RERENDER_DELAY);

const setFilter = (filter) => {
  let filterFunction = filterFunctions.setDefault;

  switch (filter) {
    case FilterName.RANDOM:
      filterFunction = filterFunctions.setRandom;
      break;
    case FilterName.POPULAR:
      filterFunction = filterFunctions.setPopular;
      break;
  }

  renderWithDelay(filterFunction(posts));
};

const onPhotosFilterFormClick = (evt) => {
  const targetButton = evt.target.closest('.img-filters__button');

  if (targetButton && targetButton !== currentButton) {
    currentButton.classList.toggle('img-filters__button--active');
    targetButton.classList.toggle('img-filters__button--active');
    currentButton = targetButton;

    setFilter(targetButton.id);
    deletePictures();
  }
};

const initFilters = (data) => {
  posts = data;
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onPhotosFilterFormClick);
};

export { initFilters };
