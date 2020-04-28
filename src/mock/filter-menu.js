const FILTER_TITLES = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateFilters = (films) => {
  const filterCaptions = [
    ``,
    (films.filter((object) => object.inWatchList)).length,
    (films.filter((object) => object.viewed)).length,
    (films.filter((object) => object.inFavoriteList)).length
  ];

  return FILTER_TITLES.map((it, i) => {
    return {
      name: it,
      count: filterCaptions[i]
    };
  });
};

export {generateFilters};
