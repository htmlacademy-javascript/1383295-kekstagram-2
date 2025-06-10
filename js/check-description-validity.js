const MAX_DESCRIPTION = 140;

const errorMessage = 'длина комментария не может составлять больше 140 символов';

const isDescriptionValid = (value) => {
  const inputText = value;

  if (inputText.length === 0) {
    return true;
  }
  if (inputText.length <= MAX_DESCRIPTION) {
    return true;
  }
  return false;
};

export {isDescriptionValid, errorMessage};
