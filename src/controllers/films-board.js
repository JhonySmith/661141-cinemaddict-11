import FilmListComponent from "../components/films-list";
import MovieController from "../controllers/movie.js";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmsListContainerComponent from "../components/films-list-container";
import FilmsListTopRatedComponent from "../components/films-list-top-rated";
import FilmsListMostCommentedComponent from "../components/films-list-most-commented";
import NoFilmsComponent from "../components/no-films.js";

import {renderComponent, remove} from "../utils/render.js";

import SortMenu, {SortType} from "../components/sort-menu.js";

const FILMS_NUMBER_STEP = 5;
const SUB_FILMS_NUMBER = 2;

const renderFilms = (films, filmsListElement, onDataChange, onViewChange, api) => {
  return films
    .map((film) => {
      const movieController = new MovieController(filmsListElement, onDataChange, onViewChange, api);

      movieController.render(film);

      return movieController;
    });
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const copyOfFilms = [...films];

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = copyOfFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = copyOfFilms.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedFilms = copyOfFilms;
      break;
  }
  return sortedFilms;

};

export default class FilmsBoardController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._filmsListComponent = new FilmListComponent();
    this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();

    this._mainFilmsContainer = new FilmsListContainerComponent();
    this._topRatedFilmsContainer = new FilmsListContainerComponent();
    this._mostCommentFilmsContainer = new FilmsListContainerComponent();

    this._loadMoreButtonComponent = new ShowMoreButtonComponent();

    this._noFilmsComponent = new NoFilmsComponent();

    this._sortMenu = new SortMenu();

    this._showedFilmsController = [];
    this._showingFilmsCount = FILMS_NUMBER_STEP;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortMenu.setSortTypeChangeClick(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._filmsModel.setOnFilterChange(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();

    if (films.length) {
      renderComponent(container, this._sortMenu);
      renderComponent(container, this._filmsListComponent);

      this._renderFilms(films.slice(0, this._showingFilmsCount));

      this._renderTopRatedFilms(films);
      this._renderMostCommentedFilms(films);

    } else {
      renderComponent(container, this._noFilmsComponent);
    }
  }

  _removeFilms() {
    this._showedFilmsController.forEach((filmController) => filmController.destroy());
    this._showedFilmsController = [];
  }

  _renderFilms(films) {
    const mainFilmsContainer = this._mainFilmsContainer;
    renderComponent(this._filmsListComponent.getElement(), mainFilmsContainer);

    const newFilms = renderFilms(films, mainFilmsContainer.getElement(), this._onDataChange, this._onViewChange, this._api);
    this._showedFilmsController = this._showedFilmsController.concat(newFilms);
    this._showingFilmsCount = this._showedFilmsController.length;

    this._renderLoadMoreButton();
  }

  _renderTopRatedFilms(films) {
    renderComponent(this._container.getElement(), this._filmsListTopRatedComponent);

    const topRatedFilms = getSortedFilms(films, SortType.RATING).slice(0, SUB_FILMS_NUMBER);
    const topRatedFilmsContainer = this._topRatedFilmsContainer.getElement();

    renderFilms(topRatedFilms, topRatedFilmsContainer, this._onDataChange, this._onViewChange, this._api);
    renderComponent(this._filmsListTopRatedComponent.getElement(), this._topRatedFilmsContainer);
  }

  _renderMostCommentedFilms(films) {
    renderComponent(this._container.getElement(), this._filmsListMostCommentedComponent);

    const mostCommentFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, SUB_FILMS_NUMBER);
    const mostCommentFilmsContainer = this._mostCommentFilmsContainer.getElement();

    renderFilms(mostCommentFilms, mostCommentFilmsContainer, this._onDataChange, this._onViewChange, this._api);
    renderComponent(this._filmsListMostCommentedComponent.getElement(), this._mostCommentFilmsContainer);
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    const filmsList = this._filmsListComponent.getElement();

    renderComponent(filmsList, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setOnClick(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    const films = this._filmsModel.getFilms();
    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + FILMS_NUMBER_STEP;

    const sortedFilms = getSortedFilms(films, this._sortMenu.getSortType());
    this._renderFilms(sortedFilms.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

        if (isSuccess) {
          filmController.render(filmModel);
          this._updateFilms(this._showingFilmsCount);
        }
      });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = FILMS_NUMBER_STEP;

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType);

    this._removeFilms();
    this._renderFilms(sortedFilms.slice(0, this._showingFilmsCount));

    this._renderLoadMoreButton();
  }

  _onViewChange() {
    this._showedFilmsController.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(FILMS_NUMBER_STEP);
  }
}
