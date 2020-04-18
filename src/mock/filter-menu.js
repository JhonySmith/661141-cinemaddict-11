import {filterTitles} from "../const";

const generateFilters = (films) => {
  const filterCaptions = [
    ``,
    (films.filter((object) => object.isWatchList)).length,
    (films.filter((object) => object.isWatched)).length,
    (films.filter((object) => object.isFavorite)).length
  ];

  return filterTitles.map((it, i) => {
    return {
      name: it,
      count: filterCaptions[i]
    };
  });
};

export {generateFilters};
