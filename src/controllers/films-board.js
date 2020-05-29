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

const renderFilms = (films, filmsListElement, onDataChange, onViewChange, showFilmsCount, prevFilmsCount = 0) => {
  return films.slice(prevFilmsCount, showFilmsCount)
    .map((film) => {
      const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);

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
  constructor(container) {
    this._container = container;

    this._filmsListComponent = new FilmListComponent();
    this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();

    this._mainFilmsContainer = new FilmsListContainerComponent();
    this._topRatedFilmsContainer = new FilmsListContainerComponent();
    this._mostCommentFilmsContainer = new FilmsListContainerComponent();

    this._loadMoreButtonComponent = new ShowMoreButtonComponent();

    this._noFilmsComponent = new NoFilmsComponent();

    this._sortMenu = new SortMenu();

    this._films = [];
    this._showedFilmsController = [];
    this._showingFilmsCount = FILMS_NUMBER_STEP;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortMenu.setSortTypeChangeClick(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    const container = this._container.getElement();

    if (this._films.length) {
      renderComponent(container, this._sortMenu);
      renderComponent(container, this._filmsListComponent);

      const mainFilmsContainer = this._mainFilmsContainer;

      const newFilms = renderFilms(films, mainFilmsContainer.getElement(), this._onDataChange, this._onViewChange, FILMS_NUMBER_STEP);
      this._showedFilmsController = this._showedFilmsController.concat(newFilms);

      renderComponent(this._filmsListComponent.getElement(), mainFilmsContainer);

      this._renderTopRatedFilms();
      this._renderMostCommentedFilms();
      this._renderLoadMoreButton();

    } else {
      renderComponent(container, this._noFilmsComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }
    const filmsList = this._filmsListComponent.getElement();

    renderComponent(filmsList, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setOnClick(() => {
      const mainFilmsContainer = this._mainFilmsContainer.getElement();
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FILMS_NUMBER_STEP;

      const sortedFilms = getSortedFilms(this._films, this._sortMenu.getSortType());
      const newFilms = renderFilms(sortedFilms, mainFilmsContainer, this._onDataChange, this._onViewChange, this._showingFilmsCount, prevFilmsCount);

      this._showedFilmsController = this._showedFilmsController.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        this._loadMoreButtonComponent.getElement().remove();
        this._loadMoreButtonComponent.removeElement();
      }
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._showedFilmsController[index].render(this._films[index]);
  }

  _renderTopRatedFilms() {
    renderComponent(this._container.getElement(), this._filmsListTopRatedComponent);

    const topRatedFilms = getSortedFilms(this._films, SortType.RATING);
    const topRatedFilmsContainer = this._topRatedFilmsContainer.getElement();

    renderFilms(topRatedFilms, topRatedFilmsContainer, this._onDataChange, SUB_FILMS_NUMBER);

    renderComponent(this._filmsListTopRatedComponent.getElement(), this._topRatedFilmsContainer);
  }

  _renderMostCommentedFilms() {
    renderComponent(this._container.getElement(), this._filmsListMostCommentedComponent);

    const mostCommentFilms = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);
    const mostCommentFilmsContainer = this._mostCommentFilmsContainer.getElement();

    renderFilms(mostCommentFilms, mostCommentFilmsContainer, this._onDataChange, this._onViewChange, SUB_FILMS_NUMBER);
    renderComponent(this._filmsListMostCommentedComponent.getElement(), this._mostCommentFilmsContainer);
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = FILMS_NUMBER_STEP;

    const mainFilmsContainer = this._mainFilmsContainer.getElement();
    const sortedFilms = getSortedFilms(this._films, sortType);

    mainFilmsContainer.innerHTML = ``;

    const newFilms = renderFilms(sortedFilms, mainFilmsContainer, this._onDataChange, this._onViewChange, this._showingFilmsCount);
    this._showedFilmsController = this._showedFilmsController.concat(newFilms);

    remove(this._loadMoreButtonComponent);

    this._renderLoadMoreButton();
  }

  _onViewChange() {
    this._showedFilmsController.forEach((it) => it.setDefaultView());
  }
}
