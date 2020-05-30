import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";

import {renderComponent, remove, RenderPosition, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onWatchList = this._onWatchList.bind(this);
    this._onFavourite = this._onFavourite.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);


    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._film = null;
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = this._getFilmCard(film);
    this._filmDetailsComponent = this._getFilmDetails(film);

    renderComponent(this._container, this._filmCardComponent);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      renderComponent(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
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

  _onWatchList() {
    this._onDataChange(this, this._film, Object.assign({}, this._film, {
      inWatchList: !this._film.inWatchList,
    }));
  }

  _onMarkAsWatched() {
    this._onDataChange(this, this._film, Object.assign({}, this._film, {
      viewed: !this._film.viewed,
    }));
  }

  _onFavourite() {
    this._onDataChange(this, this._film, Object.assign({}, this._film, {
      inFavouriteList: !this._film.inFavouriteList,
    }));
  }

  _openFilmDetails() {
    this._filmDetailsComponent = this._getFilmDetails(this._film);
    renderComponent(document.querySelector(`body`), this._filmDetailsComponent);

    this._filmDetailsComponent.setOnCloseClick(this._closeFilmDetails);
    this._onViewChange();
    this._mode = Mode.DETAILS;
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _getFilmDetails(film) {
    const filmDetailsComponent = new FilmDetailsComponent(film);

    filmDetailsComponent.setOnCloseClick(this._closeFilmDetails);

    filmDetailsComponent.setOnDetailsInWatchListClick(() => {
      this._onWatchList();
    });

    filmDetailsComponent.setOnDetailsMarkAsWatchedClick(() => {
      this._onMarkAsWatched();
    });

    filmDetailsComponent.setOnDetailsIAddToFavoriteClick(() => {
      this._onFavourite();
    });

    return filmDetailsComponent;
  }

  _closeFilmDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscPress = (evt.key === `Ecs`) || (evt.key === `Escape`);
    if (isEscPress) {
      this._closeFilmDetails();
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }
}
