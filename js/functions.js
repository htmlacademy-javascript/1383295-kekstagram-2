
function isCorrect(str, num) {
  return str.split().length <= num;
}

isCorrect('проверяемая строка', 20);

function isPollidrom(str) {
  const antiStr = str.split('').reverse().join('');
  return antiStr.toUpperCase().replaceAll(' ', '') === str.toUpperCase().replaceAll(' ', '');
}

isPollidrom(' топоТ');

function parseStr(str) {
  let income = str;

  if (typeof str === 'number') {
    income = str.toString();
  }

  const array = [];
  income.replaceAll(' ', '').split('').map((item)=>{
    if (!isNaN(item)) {
      array.push(item);
    }
  });

  const result = +array.join('');
  return result;
}

parseStr('56767');

