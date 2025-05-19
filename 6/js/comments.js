import {COMMENTS_MIN, COMMENTS_MAX, randomIntFromInterval} from './utility.js';

const names = ['Иван', 'Анастасия', 'Тимур', 'Степан', 'Бронислав', 'Аскольд', 'Потап', 'Серго', 'Туяна', 'Кристина', 'Остап', 'Маргарита', 'Диляра'];
const words = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Wlength = words.length - 1;
const comments = [];
let message = '';

// Определение числа текстовок(words) в сообщении(message): либо 1, либо 2;
const messageOneMaybeTwo = randomIntFromInterval(1, 2);
// Определение числа комметариев к объекту с фото: от 0 до 30;
const RandomNumberComments = randomIntFromInterval(COMMENTS_MIN, COMMENTS_MAX);

if (messageOneMaybeTwo === 1) {
  message = words[randomIntFromInterval(0, Wlength)];
} else {
  message = words[randomIntFromInterval(0, Wlength)] + words[randomIntFromInterval(0, Wlength)];
}

const makeComment = (index) => ({
  id: index,
  avatar: `img/avatar-${randomIntFromInterval(1, 6).svg}`,
  message: message,
  name: names[randomIntFromInterval(0, names.length - 1)]
});


const makeComments = () => {
  for (let i = 0; i < RandomNumberComments; i++) {
    comments.push(makeComment(i));
  }
};

makeComments();

export {comments};
