const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const COMMENTS_LIMIT = 5;
const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_NUMERO = 10;

// Рандомайзер
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

// Событие keydown Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Фабрика html-элементов
const makeElement = function (tagname, className, text) {
  const element = document.createElement(tagname);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Пояснитель числительных
const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

// Выдаватель ошибок
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'green';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Устранение дребезга
function debounce (callback, timeoutDelay = 1000) {
  let timeoutId;
  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {COMMENTS_MIN, COMMENTS_MAX, RERENDER_DELAY, RANDOM_PHOTOS_NUMERO, COMMENTS_LIMIT, randomIntFromInterval, toggleClass, isEscapeKey, makeElement, numDecline, showAlert, debounce};
