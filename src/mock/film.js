import {getRandomNumer} from "../utils.js";
import {getRandomArrElement} from "../utils.js";
import {generateCommentsArr} from "./comments";

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
  const commentsCount = getRandomNumer(1, 5);
  const comments = generateCommentsArr(commentsCount);
  const poster = getRandomArrElement(posters);
  const description = generateDescriptoin(descriptions);
  const isWatchList = Math.random() > 0.5;
  const isWatched = Math.random() > 0.5;
  const isFavorite = Math.random() > 0.5;
  const raiting = (Math.floor(Math.random() * 100)) / 10;

  return {
    title,
    poster,
    description,
    commentsCount,
    isWatchList,
    isWatched,
    isFavorite,
    raiting,
    comments,
  };
};

const generateFilmCardsArr = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateFilmCardData);
};

export {generateFilmCardData, generateFilmCardsArr};


