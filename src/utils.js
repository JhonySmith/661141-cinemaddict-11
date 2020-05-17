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
