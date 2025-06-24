import {renderPhotos} from './render.js';
import {setUserFormSubmit, showImgFiters, setRangePhotos} from './load-image.js';
import {getData} from './api.js';
import {showAlert} from './utility.js';

// const income = [
//   {
//     id: 0,
//     likes: 25
//   },
//   {
//     id: 1,
//     likes: 17
//   },
//   {
//     id: 2,
//     likes: 32
//   }
// ];
// console.log(income);


getData()
  .then((photos) => {
    console.log(photos);
    renderPhotos(photos);

    const popular = photos.sort((min, max) => max.likes - min.likes);
    setRangePhotos(() => renderPhotos(popular));
  })
  .then(showImgFiters())
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();

