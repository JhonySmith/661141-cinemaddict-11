import {FilterType} from "../const.js";

export const getFilmsInWatchList = (films) => {
  return films.filter((film) => film.inWatchList);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.viewed);
};

export const getFavouriteFilms = (films) => {
  return films.filter((film) => film.inFavoriteList);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getFilmsInWatchList(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavouriteFilms(films);
    default:
      return films;
  }
};


