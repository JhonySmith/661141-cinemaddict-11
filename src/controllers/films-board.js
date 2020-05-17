import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import FilmListComponent from "../components/films-list";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmsListContainerComponent from "../components/films-list-container";
import FilmsListTopRatedComponent from "../components/films-list-top-rated";
import FilmsListMostCommentedComponent from "../components/films-list-most-commented";
import NoFilmsComponent from "../components/no-films.js";

import {renderComponent, remove} from "../utils/render.js";

import SortMenu, {SortType} from "../components/sort-menu.js";

const FILMS_NUMBER_STEP = 5;
const SUB_FILMS_NUMBER = 2;

const renderFilmCard = (filmCardElement, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  renderComponent(filmCardElement, filmCardComponent);

  const pageBody = document.querySelector(`body`);

  const filmDetailComponent = new FilmDetailsComponent(film);
  const closeFilmDetailButton = filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  const onFilmDetailClose = () => {
    pageBody.removeChild(filmDetailComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
    closeFilmDetailButton.removeEventListener(`click`, onFilmDetailClose);
  };

  const onEscKeyDown = (evt) => {
    const isEscPress = (evt.key === `Ecs`) || (evt.key === `Escape`);
    if (isEscPress) {
      onFilmDetailClose();
    }
  };

  const onFilmCardClick = () => {
    pageBody.appendChild(filmDetailComponent.getElement());
    closeFilmDetailButton.addEventListener(`click`, onFilmDetailClose);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCardComponent.setOnClick(onFilmCardClick);
};

const renderFilms = (films, filmsListElement, showFilmsCount, prevFilmsCount = 0) => {
  films.slice(prevFilmsCount, showFilmsCount)
    .forEach((film) => renderFilmCard(filmsListElement, film));
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
  }

  render(films) {

    const container = this._container.getElement();
    const loadMoreButton = this._loadMoreButtonComponent;

    if (films.length) {

      const renderLoadMoreButton = () => {

        if (showFilmsCount >= films.length) {
          return;
        }

        renderComponent(filmsList, loadMoreButton);

        loadMoreButton.setOnClick(() => {
          const prevFilmsCount = showFilmsCount;
          showFilmsCount = showFilmsCount + FILMS_NUMBER_STEP;

          const sortedFilms = getSortedFilms(films, this._sortMenu.getSortType());

          renderFilms(sortedFilms, mainFilmsContainer.getElement(), showFilmsCount, prevFilmsCount);

          if (showFilmsCount >= films.length) {
            loadMoreButton.getElement().remove();
            loadMoreButton.removeElement();
          }
        });
      };

      renderComponent(container, this._sortMenu);
      renderComponent(container, this._filmsListComponent);

      const mainFilmsContainer = this._mainFilmsContainer;

      renderFilms(films, mainFilmsContainer.getElement(), FILMS_NUMBER_STEP);

      renderComponent(this._filmsListComponent.getElement(), mainFilmsContainer);

      renderComponent(container, this._filmsListTopRatedComponent);


      const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
      const topRatedFilmsContainer = this._topRatedFilmsContainer.getElement();

      renderFilms(topRatedFilms, topRatedFilmsContainer, SUB_FILMS_NUMBER);

      renderComponent(this._filmsListTopRatedComponent.getElement(), this._topRatedFilmsContainer);

      renderComponent(container, this._filmsListMostCommentedComponent);


      const mostCommentFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);
      const mostCommentFilmsContainer = this._mostCommentFilmsContainer.getElement();
      renderFilms(mostCommentFilms, mostCommentFilmsContainer, SUB_FILMS_NUMBER);
      renderComponent(this._filmsListMostCommentedComponent.getElement(), this._mostCommentFilmsContainer);

      let showFilmsCount = FILMS_NUMBER_STEP;

      const filmsList = this._filmsListComponent.getElement();

      renderLoadMoreButton();

      this._sortMenu.setSortTypeChangeClick((sortType) => {
        showFilmsCount = FILMS_NUMBER_STEP;

        const sortedFilms = getSortedFilms(films, sortType);

        mainFilmsContainer.getElement().innerHTML = ``;

        renderFilms(sortedFilms, mainFilmsContainer.getElement(), showFilmsCount);
        remove(this._loadMoreButtonComponent);

        renderLoadMoreButton();
      });

    } else {
      renderComponent(container, this._noFilmsComponent);
    }
  }
}
