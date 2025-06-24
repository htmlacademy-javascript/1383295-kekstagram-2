const RANDOM_PHOTOS_NUMERO = 10;
import {renderPhotos} from './render.js';
import {setUserFormSubmit, showImgFiters, setPopularPhotos, setDefaultPhotos, setRandomPhotos} from './load-image.js';
import {getData} from './api.js';
import {showAlert, } from './utility.js';


getData()
  .then((photos) => {
    renderPhotos(photos);

    setDefaultPhotos(() => renderPhotos(photos));

    const popular = photos.slice().sort((min, max) => max.likes - min.likes);
    setPopularPhotos(() => renderPhotos(popular));

    const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).splice(0, RANDOM_PHOTOS_NUMERO);
    setRandomPhotos(() => renderPhotos(randomPhotos));
  })
  .then(showImgFiters())
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();

