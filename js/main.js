import {getRenderPhotos} from './render.js';
import {setUserFormSubmit, setFilters} from './load-image.js';
import {getData} from './api.js';
import {showAlert, debounce, RERENDER_DELAY} from './utility.js';
import './avatar.js';

getData()
  .then((photos) => {
    getRenderPhotos(photos);
    setFilters(photos, debounce(getRenderPhotos), RERENDER_DELAY);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();

