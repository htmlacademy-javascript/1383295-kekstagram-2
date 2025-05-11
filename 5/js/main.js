import {randomIntFromInterval} from './utility.js';
import {comments} from './comments.js';

const PHOTO_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;

const descriptions = ['Мой обычный день', 'Как всегда на своем посту', 'Получаю от жизни удовольствие', 'Cool!', 'Фото дня'];

const photos = [];

const addPhoto = (index) => ({
  id: index,
  url: `photos/{{${index + 1}}}.jpg`,
  description: descriptions[randomIntFromInterval(0, descriptions.length - 1)],
  likes: randomIntFromInterval(LIKES_MIN, LIKES_MAX),
  comments: comments
});

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();

