const PHOTO_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const descriptions = ['Мой обычный день', 'Как всегда на своем посту', 'Получаю от жизни удовольствие', 'Cool!', 'Фото дня'];
const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['Иван', 'Анастасия', 'Тимур', 'Степан', 'Бронислав', 'Аскольд', 'Потап', 'Серго', 'Туяна', 'Кристина', 'Остап', 'Маргарита', 'Диляра'];
const photos = [];
const comments = [];
let message = '';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const messageOneMaybeTwo = randomIntFromInterval(1, 2);

if (messageOneMaybeTwo === 1) {
  message = messages[randomIntFromInterval(0, messages.length - 1)];
} else {
  message = messages[randomIntFromInterval(0, messages.length - 1)] + messages[randomIntFromInterval(0, messages.length - 1)];
}

const makeComment = (index) => ({
  id: index,
  avatar: `img/avatar-${randomIntFromInterval(1, 6).svg}`,
  message: message,
  name: names[randomIntFromInterval(0, names.length - 1)]
});

const RandomNumberComments = randomIntFromInterval(COMMENTS_MIN, COMMENTS_MAX);

const makeComments = () => {
  for (let j = 0; j < RandomNumberComments; j++) {
    comments.push(makeComment(j));
  }
};

makeComments();

const addPhoto = (index) => ({
  id: index,
  url: `photos/{{${index + 1}}}.jpg`,
  description: descriptions[randomIntFromInterval(0, descriptions.length - 1)],
  likes: randomIntFromInterval(LIKES_MIN, LIKES_MAX),
  comments: randomIntFromInterval(COMMENTS_MIN, COMMENTS_MAX)
});

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();

