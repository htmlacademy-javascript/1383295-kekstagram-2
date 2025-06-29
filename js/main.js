import { getRenderPhotos } from './render.js';
import { setUserFormSubmit, } from './load-image.js';
import { getData } from './api.js';
import { showAlert } from './utility.js';
import { initFilters } from './filtration.js';
import './avatar.js';


const displayPhotos = (data) => {
  getRenderPhotos(data);
  initFilters(data);
};

getData()
  .then((photos) => {
    displayPhotos(photos.slice());
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();

