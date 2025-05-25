import { toggleClass} from './utility.js';

const bigPicture = document.querySelector('.big-picture');
const loadButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');


const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const makeElement = function (tagname, className, text) {
  const element = document.createElement(tagname);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const onLoadButtonButtonClick = () => {
  // renderComments();

};

const closeBigPicture = () => {
  // document.removeEventListener('keydown', onBigPictureEscKeyDown);
  toggleModal();
};

const onBigPictureEscKeyDown = () => {
  closeBigPicture();
};

const renderComment = (photo) => {
  const comments = photo.comments;

  const commentsList = bigPicture.querySelector('.social__comments');
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  for (let i = 0; i < comments.length; i++) {
    const comment = makeElement('li', 'social__comment');

    const image = makeElement('img', 'social__picture');
    image.width = '35';
    image.height = '35';
    image.src = comments[i].avatar;
    image.alt = comments[i].name;
    comment.appendChild(image);

    const subTitle = makeElement('p', 'social__text');
    subTitle.textContent = comments[i].message;
    comment.appendChild(subTitle);

    commentsList.appendChild(comment);
  }

  return commentsList;
};

const show = (photo) => {
  const {url, likes, description, comments} = photo;
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const pictureCaption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
  const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
  shownCommentCount.textContent = comments.length;
  totalCommentCount.textContent = comments.length;
};

const showBigPicture = (photo) => {

  show(photo);

  renderComment(photo);

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleModal();
};


const onCloseBigPictureClick = () =>{
  closeBigPicture();
};

loadButton.addEventListener('click', onLoadButtonButtonClick);
closeButton.addEventListener('click', onCloseBigPictureClick);
export {showBigPicture};
