const titles = [`The Dance of life`, `Sagebrush Trail`, `The Man with the Golden Arm`];

const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomNumer = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrElement = (arr) => {
  const randomIndex = getRandomNumer(0, arr.length);
  return arr[randomIndex];
};

const generateDescriptoin = (texts) => {
  const textsCount = getRandomNumer(1, 6);
  const descriptionStartIndex = getRandomNumer(1, texts.length - textsCount);
  const descriptionEndIndex = descriptionStartIndex + textsCount;
  return texts.slice(descriptionStartIndex, descriptionEndIndex).map((it) => {
    return it;
  }).join(` `);
};

const generateFilmCardData = () => {
  const title = getRandomArrElement(titles);

  return {
    title,
    poster: getRandomArrElement(posters),
    description: generateDescriptoin(descriptions),
    commentsCount: getRandomNumer(1, 5),
    isWatchList: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    raiting: (Math.floor(Math.random() * 100)) / 10,
  };
};

const generateFilmCardsArr = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateFilmCardData);
};

export {generateFilmCardData, generateFilmCardsArr};


