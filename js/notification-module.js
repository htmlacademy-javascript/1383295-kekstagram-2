import { isEscapeKey } from './utility.js';

const body = document.body;

const onCloseNotification = (evt) => {
  evt.stopPropagation();
  const target = evt.target;
  const popup = document.querySelector('.popup');

  if(target.classList.contains('popup') || isEscapeKey(evt) || target.classList.contains('success__button') || target.classList.contains('error__button')) {
    popup.remove();
    body.removeEventListener('click', onCloseNotification);
    body.removeEventListener('keydown', onCloseNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onCloseNotification);
  body.addEventListener('keydown', onCloseNotification);
};


export {appendNotification};
