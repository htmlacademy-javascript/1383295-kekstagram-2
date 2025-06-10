const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

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

export {COMMENTS_MIN, COMMENTS_MAX, randomIntFromInterval, toggleClass, isEscapeKey, makeElement, numDecline};
