import {numDecline} from '../utility.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION = 140;

let errorHashtags = '';
const getErrorMessageDescription = () => `Длина комментария не может составлять больше ${MAX_DESCRIPTION} символов'`;
const isDescriptionValid = (description) => description.length < MAX_DESCRIPTION;

const getErrorText = () => errorHashtags;

const isHashtagsValid = (value) => {
  errorHashtags = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять из одной решетки'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги не разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа \'#\''
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решетку`
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хэштега', 'хэштегов', 'хэштегов')}`
    },
    {
      check: inputArray.some((item) => /^#[a-zа-яё0-9]{1, 19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorHashtags = rule.error;
    }
    return !isInvalid;
  });
};

export {getErrorText, isHashtagsValid, isDescriptionValid, getErrorMessageDescription};
