import { isEscapeKey } from './utility.js';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');
  const closeButton = document.querySelector('button');
  const successBtn = document.querySelector('.success__button');
  if (evt.target === successBtn || evt.target === closeButton || isEscapeKey(evt) || evt.target === existElement) {
    existElement.remove();

    // errorElement.remove();
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
