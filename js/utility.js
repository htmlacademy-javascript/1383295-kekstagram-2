const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

// Рандомайзер
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};
const isEscapeKey = (evt) => evt.key === 'ESCAPE';

export {COMMENTS_MIN, COMMENTS_MAX, randomIntFromInterval, toggleClass, isEscapeKey};
