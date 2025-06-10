import { toggleClass, makeElement, isEscapeKey} from './utility.js';

const COMMENTS_LIMIT = 5;
const bigPicture = document.querySelector('.big-picture');
const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

const renderedComments = commentsList.children;
let numShownComments = COMMENTS_LIMIT;

const closeBigPicture = () => {
  // document.removeEventListener('keydown', onBigPictureEscKeyDown);
  toggleClass(bigPicture, 'hidden');
  numShownComments = COMMENTS_LIMIT;
};

const hideComments = function () {
  for (let i = numShownComments; i < renderedComments.length; i++) {
    renderedComments[i].style.display = 'none';
  }
  numShownComments += COMMENTS_LIMIT;
};

const showComments = function () {
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

const renderComment = (photo) => {
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

  const array = Array.from(renderedComments);
  const array1 = array.filter((element) => {
    if (window.getComputedStyle(element).display === 'flex') {
      return true;
    } else {
      return false;
    }
  });
  shownCommentCount.textContent = array1.length;
};


const show = (photo) => {
  const {url, likes, description, comments} = photo;

  const image = bigPicture.querySelector('.big-picture__img img'),
    caption = bigPicture.querySelector('.social__caption'),
    likesCount = bigPicture.querySelector('.likes-count');

  image.src = url;
  caption.textContent = description;
  likesCount.textContent = likes;
  shownCommentCount.textContent = numShownComments;
  if (comments.length < numShownComments) {
    shownCommentCount.textContent = comments.length;
  }
  totalCommentCount.textContent = comments.length;
};


const showBigPicture = (photo) => {

  show(photo);

  renderComment(photo);

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  toggleClass(bigPicture, 'hidden');

};

const onCloseBigPictureClick = () =>{
  closeBigPicture();
};

loadButton.addEventListener('click', getMoreComments);
closeButton.addEventListener('click', onCloseBigPictureClick);
export {showBigPicture};
