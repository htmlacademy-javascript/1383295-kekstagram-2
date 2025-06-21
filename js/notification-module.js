import { isEscapeKey } from './utility.js';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success');
  const closeButton = document.querySelector('button');
  console.log(evt.target, existElement);
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
};

export {closeNotification, appendNotification};
