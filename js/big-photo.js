import { toggleClass,} from './utility.js';

const bigPicture = document.querySelector('.big-picture');
// const loadButton = bigPicture.querySelector('.comments-loader');
// const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');


const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

// const onLoadButtonButtonClick = () => {
// };

// const closeBigPicture = () => {
//   document.removeEventListener('keydown', onBigPictureEscKeyDown);
//   toggleModal();
// };

// const onBigPictureEscKeyDown = () => {
//   if (isEscapeKey(evt)) {
//     closeBigPicture();
//   }
// };

const show = (photo) => {
  const {url, likes, description} = photo;

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
};

const showBigPicture = (photo) => {

  // currentComments = photo.comments.slice();

  show(photo);

  // renderComments();

  // document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();
};

showBigPicture();

// const onCloseBigPictureClick = () =>{
//   closeBigPicture();
// };

// loadButton.addEventListener('click', onLoadButtonButtonClick);
// closeButton.addEventListener('click', onCloseBigPictureClick);
