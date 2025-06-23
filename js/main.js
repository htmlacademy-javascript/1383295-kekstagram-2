import {renderPhotos} from './render.js';
import {lol} from './load-image.js';
import {getData} from './api.js';
import {showAlert} from './utility.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

lol();

