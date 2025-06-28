import { toggleClass, makeElement, isEscapeKey, COMMENTS_LIMIT} from './utility.js';

const bigPicture = document.querySelector('.big-picture');
const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

const renderedComments = commentsList.children;
let numShownComments = COMMENTS_LIMIT;

const closeBigPicture = () => {
  toggleClass(bigPicture, 'hidden');
  numShownComments = COMMENTS_LIMIT;
  loadButton.classList.remove('hidden');
};

const hideComments = () => {
  for (let i = numShownComments; i < renderedComments.length; i++) {
    renderedComments[i].style.display = 'none';
  }
  numShownComments += COMMENTS_LIMIT;
};

const showComments = () => {
  if (numShownComments > renderedComments.length) {
    numShownComments = renderedComments.length;
  }
  for (let i = 0; i < numShownComments; i++) {
    renderedComments[i].style.display = 'flex';
  }
};

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const renderComments = (photo) => {
  const { comments } = photo;

  commentsList.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const comment = makeElement('li', 'social__comment');

    const picture = makeElement('img', 'social__picture');
    picture.src = comments[i].avatar;
    picture.alt = comments[i].name;
    comment.appendChild(picture);

    const text = makeElement('p', 'social__text');
    text.textContent = comments[i].message;
    comment.appendChild(text);

    commentsList.appendChild(comment);
  }
  hideComments();

  return commentsList;
};

const getMoreComments = () => {
  showComments();
  numShownComments += COMMENTS_LIMIT;

  const visibleComments = [...renderedComments].filter((element) => window.getComputedStyle(element).display === 'flex');
  shownCommentCount.textContent = visibleComments.length;

  if (visibleComments.length === renderedComments.length) {
    loadButton.classList.add('hidden');
  }
};

const createBigPhoto = (photo) => {
  const {url, likes, description, comments} = photo;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;

  shownCommentCount.textContent = numShownComments;
  if (comments.length < numShownComments) {
    shownCommentCount.textContent = comments.length;
  }
  totalCommentCount.textContent = comments.length;

  if (totalCommentCount.textContent <= COMMENTS_LIMIT) {
    loadButton.classList.add('hidden');
  }
};

const getShowBigPicture = (photo) => {
  createBigPhoto(photo);
  renderComments(photo);
  document.addEventListener('keydown', onBigPictureEscKeyDown, {once: true});
  toggleClass(bigPicture, 'hidden');
};

loadButton.addEventListener('click', getMoreComments);
closeButton.addEventListener('click', () => {
  closeBigPicture();
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
});

export {getShowBigPicture};
