import AbstractSmartComponent from "./abstract-smart-component.js";
import {getRandomCommentDate} from "../utils.js";
import {encode} from "he";
// Карточка с деталями фильма

const YOUR_COMMENT = `You`;

const createGenreTemplate = (genre) => {
  const genresTemplate = genre
    .map((it) => `<span class="film-details__genre">${it}</span>`)
    .join(`\n`);

  return genresTemplate;
};

const createFilmDetailsTemplate = (film) => {
  const actors = film.actors;
  const ageRaiting = film.ageRaiting;
  const description = film.description;
  const director = film.director;
  const genre = createGenreTemplate(film.genre);
  const inFavoriteList = film.inFavoriteList ? `checked` : ``;
  const inWatchList = film.inWatchList ? `checked` : ``;
  const movieDuration = film.movieDuration;
  const originalTitle = film.originalTitle;
  const poster = film.poster;
  const rating = film.rating;
  const releaseCountry = film.releaseCountry;
  const releaseDate = film.releaseDate;
  const screenwriters = film.screenwriters;
  const title = film.title;
  const viewed = film.viewed ? `checked` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title} - film poster">
              <p class="film-details__age">${ageRaiting}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${movieDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genre}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchList}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${viewed}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${inFavoriteList}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._onObjectClick = null;
    this._onAddWatchListClick = null;
    this._onAddToFavoriteClick = null;
    this._onMarkAsWatchedClick = null;
    this._onCommentDeleteClick = null;
    this._onCommentSubmit = null;
    this.commentEmoji = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments, this.commentEmoji);
  }

  getCommentsSection() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }

  recoveryListeners() {
    this.setOnCloseClick(this._onObjectClick);
    this.setOnDetailsInWatchListClick(this._onAddWatchListClick);
    this.setOnDetailsIAddToFavoriteClick(this._onAddToFavoriteClick);
    this.setOnDetailsMarkAsWatchedClick(this._onMarkAsWatchedClick);
    this.setOnDeleteCommentClick(this._onCommentDeleteClick);
    this.setAddCommentSubmit(this._onCommentSubmit);
  }

  rerender() {
    super.rerender();
  }

  setOnCloseClick(onCloseClick) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, onCloseClick);

    this._onObjectClick = onCloseClick;
  }

  setOnDetailsInWatchListClick(onClick) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, onClick);
    this._onAddWatchListClick = onClick;
  }

  setOnDetailsIAddToFavoriteClick(onClick) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, onClick);
    this._onAddToFavoriteClick = onClick;
  }

  setOnDetailsMarkAsWatchedClick(onClick) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, onClick);
    this._onMarkAsWatchedClick = onClick;
  }

  setOnDeleteCommentClick(onClick) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
    .forEach((delButton) => {
      delButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentId = evt.target.closest(`li`).dataset.id;
        onClick(commentId);
      });
    });

    this._onCommentDeleteClick = onClick;
  }

  _parseCommentData(form) {
    return {
      id: String(Math.random()),
      emotion: this.commentEmoji,
      commentText: encode(form.value),
      authorName: YOUR_COMMENT,
      date: getRandomCommentDate(),
    };
  }

  getCommentDataFromForm() {
    const form = this.getElement().querySelector(`.film-details__comment-input`);
    const formData = this._parseCommentData(form);

    return formData;
  }

  setAddCommentSubmit(onSubmit) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        const subKeys = evt.ctrlKey || evt.metaKey;
        const enterKey = evt.key === `Enter`;

        if (subKeys && enterKey) {
          onSubmit();
        }
      });

    this._onCommentSubmit = onSubmit;
  }


}

