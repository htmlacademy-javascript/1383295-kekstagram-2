const RANDOM_PHOTOS_NUMERO = 10;
const RERENDER_DELAY = 500;

import {renderPhotos} from './render.js';
import {setUserFormSubmit, showImgFiters, setPopularPhotos, setDefaultPhotos, setRandomPhotos} from './load-image.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utility.js';
import './avatar.js';


getData()
  .then((photos) => {
    renderPhotos(photos);

    setDefaultPhotos(debounce(() => renderPhotos(photos)), RERENDER_DELAY);

    const popular = photos.slice().sort((min, max) => max.likes - min.likes);
    setPopularPhotos(debounce(() => renderPhotos(popular)), RERENDER_DELAY);

    const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).splice(0, RANDOM_PHOTOS_NUMERO);
    setRandomPhotos(debounce(() => renderPhotos(randomPhotos)), RERENDER_DELAY);
  })
  .then(showImgFiters())
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();

