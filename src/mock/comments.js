import {getRandomArrElement} from "../utils.js";

const authorNames = [`Tim Macoveev`, `John Doe`];
const emotions = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
const comments = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];

const generateComment = () => {
  return {
    authorName: getRandomArrElement(authorNames),
    emotion: getRandomArrElement(emotions),
    commentText: getRandomArrElement(comments),
  };
};

const generateCommentsArr = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateCommentsArr};
