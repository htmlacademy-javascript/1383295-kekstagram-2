import { isEscapeKey } from './utility.js';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success');
  const successBtn = document.querySelector('.success__button');
  const errorElement = document.querySelector('.error');
  const errorbtn = document.querySelector('.error__button');

  if (evt.target === successBtn || isEscapeKey(evt) || evt.target === existElement) {
    if (existElement) {
      existElement.remove();
    } else {
      errorElement.remove();
    }
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
  if (evt.target === errorbtn || isEscapeKey(evt) || evt.target === errorElement) {
    if (existElement) {
      existElement.remove();
    } else {
      errorElement.remove();
    }
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


export {appendNotification};
