export const filterList = (films) => {
  const watchList = films.filter((object) => object.isWatchList);
  const watched = films.filter((object) => object.isWatched);
  const favorite = films.filter((object) => object.isFavorite);

  return {
    watchList,
    watched,
    favorite,
  };
};
