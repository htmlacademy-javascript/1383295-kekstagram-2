import { toggleClass, isEscapeKey, } from './utility.js';

const COMMENTS_LIMIT = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const userComment = commentsList.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();
let commentsCount = COMMENTS_LIMIT;
let currentComments = [];

const createBigPhoto = (photo) => {
  const {url, likes, description} = photo;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  commentsCount = COMMENTS_LIMIT;
  toggleModal();
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
}

const renderComment = (comment) => {
  const newComment = userComment.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderComments = () => {
  commentsList.innerHTML = '';
  commentCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  commentCount.innerHTML = `${commentsCount} из <span class="social__comment-total-count">${currentComments.length}</span> комментариев`;

  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  if (currentComments.length <= COMMENTS_LIMIT || commentsCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }

  commentsList.appendChild(commentFragment);
};
const onCommentsLoaderButtonClick = () => {
  commentsCount += COMMENTS_LIMIT;
  renderComments();
};

const getRenderBigPictire = (photo) => {
  currentComments = photo.comments.slice();
  createBigPhoto(photo);
  renderComments();
  toggleModal();
  document.addEventListener('keydown', onBigPictureEscKeyDown);
};

loadButton.addEventListener('click', onCommentsLoaderButtonClick);
closeButton.addEventListener('click', onCloseBigPictureClick);

export {getRenderBigPictire};
