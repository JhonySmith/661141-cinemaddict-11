import AbstractClass from "./abstract-component.js";

const createFilmCardTemlate = (film) => {

  const title = film.title;
  const poster = film.poster;
  const description = film.description;
  const commentsCount = film.comments.length;
  const inWatchList = film.inWatchList;
  const viewed = film.viewed;
  const inFavoriteList = film.inFavoriteList;
  const rating = film.rating;
  const releaseDate = film.releaseDate.toLocaleString(`en-US`, {year: `numeric`});

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${viewed ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavoriteList ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
    </article>`
  );
};

export default class FilmCardComponent extends AbstractClass {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemlate(this._film);
  }

  setOnClick(onObjectClick) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onObjectClick);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onObjectClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onObjectClick);
  }

  onFilmCardAddWatchListClick(onObjectClick) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, onObjectClick);
  }

  onFilmCardMarkAsWatchedClick(onObjectClick) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, onObjectClick);
  }

  onFilmCardAddToFavoriteClick(onObjectClick) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, onObjectClick);
  }
}
