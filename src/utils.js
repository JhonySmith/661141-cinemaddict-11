export const getRandomNumer = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrElement = (arr) => {
  const randomIndex = getRandomNumer(0, arr.length);
  return arr[randomIndex];
};

export const getRandomDate = () => {
  const date = new Date();

  date.setDate(getRandomNumer(0, 31));
  date.setFullYear(getRandomNumer(1950, 2019));

  return date;
};

export const getRandomCommentDate = () => {
  const targetDate = new Date();
  const dateMem = new Date();

  targetDate.setDate(targetDate.getDate() - getRandomNumer(0, 5));
  const options = {weekday: `long`, year: `numeric`, month: `long`, day: `numeric`, hour: `numeric`, minute: `numeric`, hour12: false};
  const diffTime = targetDate.getDate() - dateMem.getDate();

  if (diffTime > 2) {
    return targetDate.toLocaleString(`en-US`, options);
  } else if (diffTime === 0) {
    return `today`;
  } else {
    return diffTime + ` days ago`;
  }
};
