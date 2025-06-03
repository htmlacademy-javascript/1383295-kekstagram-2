import {randomIntFromInterval} from './utility.js';
import {makeComment} from './make-comment.js';

const PHOTO_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

const descriptions = ['Мой обычный день', 'Как всегда на своем посту', 'Получаю от жизни удовольствие', 'Cool!', 'Фото дня'];

const photos = [];

const addPhoto = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: descriptions[randomIntFromInterval(0, descriptions.length - 1)],
  likes: randomIntFromInterval(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: randomIntFromInterval(COMMENTS_MIN, COMMENTS_MAX)}, makeComment)
});

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(addPhoto(i));
  }
};

export {photos, addPhotos};
