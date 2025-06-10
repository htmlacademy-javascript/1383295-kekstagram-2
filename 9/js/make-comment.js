import {randomIntFromInterval} from './utility.js';

const names = ['Иван', 'Анастасия', 'Тимур', 'Степан', 'Бронислав', 'Аскольд', 'Потап', 'Серго', 'Туяна', 'Кристина', 'Остап', 'Маргарита', 'Диляра'];
const words = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const makeMessage = () => {
  let message = '';
  const messageOneMaybeTwo = randomIntFromInterval(1, 2);
  if (messageOneMaybeTwo === 2) {
    message = words[randomIntFromInterval(0, words.length - 1)] + words[randomIntFromInterval(0, words.length - 1)];
    return message;
  }
  message = words[randomIntFromInterval(0, words.length - 1)];
  return message;
};

const makeComment = () => ({
  id: Math.round(Math.random() * 10000),
  avatar: `img/avatar-${randomIntFromInterval(1, 6)}.svg`,
  message: makeMessage(),
  name: names[randomIntFromInterval(0, names.length - 1)]
});

export {makeComment};

