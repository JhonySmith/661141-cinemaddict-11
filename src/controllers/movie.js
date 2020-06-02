import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import FilmModel from "../models/film.js";
import FilmDetailsController from "../controllers/film-details.js";
import CommentsModel from "../models/comments";

import {renderComponent, remove, RenderPosition, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._api = api;

    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._onWatchList = this._onWatchList.bind(this);
    this._onFavourite = this._onFavourite.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);


    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._film = null;
    this._comments = null;
    this._filmsDetailsController = null;
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = this._getFilmCard(film);

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      renderComponent(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _getFilmCard(film) {
    const filmCard = new FilmCardComponent(film);

    filmCard.setOnClick(() => {
      this._openFilmDetails();
    });

    filmCard.onFilmCardAddToFavoriteClick((evt) => {
      evt.preventDefault();
      this._onFavourite();
    });

    filmCard.onFilmCardAddWatchListClick((evt) => {
      evt.preventDefault();
      this._onWatchList();
    });

    filmCard.onFilmCardMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      this._onMarkAsWatched();
    });

    return filmCard;
  }

  _openFilmDetails() {
    const commentsModel = new CommentsModel();
    this._filmsDetailsController = new FilmDetailsController(this._onDataChange, this._onViewChange, this._api, this);

    this._api.getComments(this._film.id)
      .then((comments) => {
        commentsModel.setComments(comments);
        this._filmsDetailsController.render(this._film, commentsModel.getComments());
      });
  }

  _onWatchList() {
    const newFilm = FilmModel.clone(this._film);
    newFilm.inWatchList = !newFilm.inWatchList;
    this._onDataChange(this, this._film, newFilm);
  }

  _onMarkAsWatched() {
    const newFilm = FilmModel.clone(this._film);
    newFilm.viewed = !newFilm.viewed;
    this._onDataChange(this, this._film, newFilm);
  }

  _onFavourite() {
    const newFilm = FilmModel.clone(this._film);
    newFilm.inFavoriteList = !newFilm.inFavoriteList;
    this._onDataChange(this, this._film, newFilm);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }
}
