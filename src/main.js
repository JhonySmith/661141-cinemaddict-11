import FilmCardComponent from "./components/film-card";
import FilmDetailsComponent from "./components/film-details";
import FilmListComponent from "./components/films-list";
import MainMenuComponent from "./components/main-menu";
import ProfileComponent from "./components/profile";
import ShowMoreButtonComponent from "./components/show-more-button";
import SortMenuComponent from "./components/sort-menu";
import {generateFilmCards} from "./mock/film";
import {generateFilters} from "./mock/filter-menu";
import {renderElement, RenderPosition} from "./utils.js";
import FilmsListContainerComponent from "./components/films-list-container";
import FilmsComponent from "./components/films";
import FilmsListTopRatedComponent from "./components/films-list-top-rated";
import FilmsListMostCommentedComponent from "./components/films-list-most-commented";

const FILMS_NUMBER = 20;
const FILMS_NUMBER_STEP = 5;
const SUB_FILMS_NUMBER = 2;

// Отрисовка карточки фильма
const renderFilmCard = (filmCardElement, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  renderElement(filmCardElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  const pageBody = document.querySelector(`body`);

  const filmDetailComponent = new FilmDetailsComponent(film);
  const closeFilmDetailButton = filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  const onFilmDetailClose = () => {
    pageBody.removeChild(filmDetailComponent.getElement());
    closeFilmDetailButton.removeEventListener(`click`, onFilmDetailClose);
  };

  const onFilmCardClick = () => {
    pageBody.appendChild(filmDetailComponent.getElement());
    closeFilmDetailButton.addEventListener(`click`, onFilmDetailClose);
  };

  filmCardComponent.getElement().addEventListener(`click`, onFilmCardClick);
};

//  Отрисовка контэйнера с фильмами
const renderFilmsListContainer = (filmsList, films, count) => {
  const filmsContainer = new FilmsListContainerComponent().getElement();
  renderElement(filmsList, filmsContainer, RenderPosition.BEFOREEND);
  films.slice(0, count)
    .forEach((film) => renderFilmCard(filmsContainer, film));
};

// Отрисовка основного списка фильмов
const renderFilmslist = (filmsSection, films) => {
  const filmsList = new FilmListComponent().getElement();
  renderElement(filmsSection, filmsList, RenderPosition.BEFOREEND);

  let showFilmsCount = FILMS_NUMBER_STEP;
  renderFilmsListContainer(filmsList, films, showFilmsCount);

  const filmsListContainer = filmsList.querySelector(`.films-list__container`);
  const loadMoreButton = new ShowMoreButtonComponent();
  renderElement(filmsList, loadMoreButton.getElement(), RenderPosition.BEFOREEND);


  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showFilmsCount;
    showFilmsCount = showFilmsCount + FILMS_NUMBER_STEP;

    films.slice(prevFilmsCount, showFilmsCount)
      .forEach((film) => renderFilmCard(filmsListContainer, film));

    if (showFilmsCount >= films.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
};

// Отрисовка фильмов с самой высокой оценкой
const renderFilmsListTopRated = (filmsSection, films) => {
  const filmsListTopRated = new FilmsListTopRatedComponent().getElement();
  renderElement(filmsSection, filmsListTopRated, RenderPosition.BEFOREEND);
  renderFilmsListContainer(filmsListTopRated, films, SUB_FILMS_NUMBER);
};

// Отрисовка самых коменитруемых фильмов
const renderFilmsListMostCommented = (filmsSection, films) => {
  const filmsListMostCommented = new FilmsListMostCommentedComponent().getElement();
  renderElement(filmsSection, filmsListMostCommented, RenderPosition.BEFOREEND);
  renderFilmsListContainer(filmsListMostCommented, films, SUB_FILMS_NUMBER);
};

// Создание блока с фильмами
const renderFilmsSection = (placeInDocument, films) => {
  const filmsBoard = new FilmsComponent().getElement();
  renderElement(placeInDocument, filmsBoard, RenderPosition.BEFOREEND);
  renderFilmslist(filmsBoard, films);

  const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
  const mostCommentFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  renderFilmsListTopRated(filmsBoard, topRatedFilms);
  renderFilmsListMostCommented(filmsBoard, mostCommentFilms);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const films = generateFilmCards(FILMS_NUMBER);
const filters = generateFilters(films);


renderElement(pageHeader, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
renderElement(pageMain, new MainMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(pageMain, new SortMenuComponent().getElement(), RenderPosition.BEFOREEND);
renderFilmsSection(pageMain, films);


