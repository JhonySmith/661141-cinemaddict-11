import {getRandomArrElement, getRandomCommentDate} from "../utils.js";

const authorNames = [`Tim Macoveev`, `John Doe`];
const emotions = [`angry`, `puke`, `sleeping`, `smile`];
const comments = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];

const generateComment = () => {
  return {
    id: String(Math.random()),
    authorName: getRandomArrElement(authorNames),
    emotion: getRandomArrElement(emotions),
    commentText: getRandomArrElement(comments),
    date: getRandomCommentDate(),
  };
};

const generateCommentsArr = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateCommentsArr};
