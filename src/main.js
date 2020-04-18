import {createFilmCardTemlate} from "./components/film-card";
import {createFilmDeatilsTemplate} from "./components/film-details";
import {createFilmsListTemlate} from "./components/films-list";
import {createMainMenuTemplate} from "./components/main-menu";
import {createProfileTemplate} from "./components/profile";
import {createShowMoreButtonTemlate} from "./components/show-more-button";
import {createSortMenuTemplate} from "./components/sort-menu";
import {generateFilmCardsArr} from "./mock/film";
import {generateFilters} from "./mock/filter-menu";

const FILMS_NUMBER = 20;
const FILMS_NUMBER_STEP = 5;
const SUB_FILMS_NUMBER = 2;

// Функция вставки объекта на страницу
const renderBlock = (place, block, position = `beforeend`) => {
  place.insertAdjacentHTML(position, block);
};

// Шапка страницы
const pageHeader = document.querySelector(`.header`);
// Блок main
const pageMain = document.querySelector(`.main`);

const films = generateFilmCardsArr(FILMS_NUMBER);
const filters = generateFilters(films);
const topRatedFilmsArr = films.slice().sort((a, b) => b.raiting - a.raiting);
const mostCommentFilmsArr = films.slice().sort((a, b) => b.commentsCount - a.commentsCount);

// Отрисовка элементов на странице
renderBlock(pageHeader, createProfileTemplate());
renderBlock(pageMain, createMainMenuTemplate(filters));
renderBlock(pageMain, createSortMenuTemplate());
renderBlock(pageMain, createFilmsListTemlate());

// Блок с фильмами
const filmsSection = document.querySelector(`.films`);
// Основной блок с фильмами
const mainFilmsBlock = filmsSection.querySelector(`.films-list`);
// Список всех 3х блоков
const filmsLists = filmsSection.querySelectorAll(`.films-list__container`);
// Завденеие блоков в отдельные переменыне
const [mainFilmList, topRatedFilms, mostCommentedFilms] = filmsLists;


// Отрисовка основных фильмов
let showingFilmsCount = FILMS_NUMBER_STEP;

films.slice(0, showingFilmsCount)
  .forEach((film) => renderBlock(mainFilmList, createFilmCardTemlate(film), `beforeend`));

// Отрисовка кнпоки показать еще
renderBlock(mainFilmsBlock, createShowMoreButtonTemlate());

// Отрисовка просматриваемых и комментируемых фильмов
topRatedFilmsArr.slice(0, SUB_FILMS_NUMBER)
  .forEach((film) => renderBlock(topRatedFilms, createFilmCardTemlate(film)));

mostCommentFilmsArr.slice(0, SUB_FILMS_NUMBER)
  .forEach((film) => renderBlock(mostCommentedFilms, createFilmCardTemlate(film)));

const pageFooter = document.querySelector(`.footer`);
// Отрисовка карточки фильма
renderBlock(pageFooter, createFilmDeatilsTemplate(films[0]), `afterend`);

// Временный блок
const popup = document.querySelector(`.film-details`);
const popupCloseButton = popup.querySelector(`.film-details__close-btn`);
const onPopupClose = () => {
  popup.remove();
  popupCloseButton.removeEventListener(`click`, onPopupClose);
};
popupCloseButton.addEventListener(`click`, onPopupClose);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILMS_NUMBER_STEP;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderBlock(mainFilmList, createFilmCardTemlate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
