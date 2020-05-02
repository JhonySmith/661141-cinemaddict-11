import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import FilmListComponent from "../components/films-list";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmsListContainerComponent from "../components/films-list-container";
import FilmsListTopRatedComponent from "../components/films-list-top-rated";
import FilmsListMostCommentedComponent from "../components/films-list-most-commented";
import NoFilmsComponent from "../components/no-films.js";

import {renderComponent, RenderPosition} from "../utils/render.js";

const FILMS_NUMBER_STEP = 5;
const SUB_FILMS_NUMBER = 2;

const renderFilmCard = (filmCardElement, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  renderComponent(filmCardElement, filmCardComponent, RenderPosition.BEFOREEND);

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


export default class FilmsBoardController {
  constructor(container) {
    this._container = container;

    this._filmsListComponent = new FilmListComponent();
    this._loadMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(films) {
    const container = this._container.getElement();

    if (films.length > 0) {

      renderComponent(container, this._filmsListComponent, RenderPosition.BEFOREEND);

      const mainFilmsContainer = new FilmsListContainerComponent();

      films.slice(0, FILMS_NUMBER_STEP)
      .forEach((film) => renderFilmCard(mainFilmsContainer.getElement(), film));

      renderComponent(this._filmsListComponent.getElement(), mainFilmsContainer, RenderPosition.BEFOREEND);
      renderComponent(this._filmsListComponent.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      let showFilmsCount = FILMS_NUMBER_STEP;
      this._loadMoreButtonComponent.setOnClick(() => {
        const prevFilmsCount = showFilmsCount;
        showFilmsCount = showFilmsCount + FILMS_NUMBER_STEP;

        films.slice(prevFilmsCount, showFilmsCount)
        .forEach((film) => renderFilmCard(mainFilmsContainer.getElement(), film));

        if (showFilmsCount >= films.length) {
          this._loadMoreButtonComponent.getElement().remove();
          this._loadMoreButtonComponent.removeElement();
        }
      });

      renderComponent(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);

      const topRatedFilmsContainer = new FilmsListContainerComponent();
      const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);

      topRatedFilms.slice(0, SUB_FILMS_NUMBER)
      .forEach((film) => renderFilmCard(topRatedFilmsContainer.getElement(), film));
      renderComponent(this._filmsListTopRatedComponent.getElement(), topRatedFilmsContainer, RenderPosition.BEFOREEND);

      renderComponent(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

      const mostCommentFilmsContainer = new FilmsListContainerComponent();
      const mostCommentFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

      mostCommentFilms.slice(0, SUB_FILMS_NUMBER)
      .forEach((film) => renderFilmCard(mostCommentFilmsContainer.getElement(), film));
      renderComponent(this._filmsListMostCommentedComponent.getElement(), mostCommentFilmsContainer, RenderPosition.BEFOREEND);
    } else {
      renderComponent(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }
  }
}
