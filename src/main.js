import {createFilmCardTemlate} from "./components/film-card";
import {createFilmDeatilsTemplate} from "./components/film-details";
import {createFilmsListTemlate} from "./components/films-list";
import {createMainMenuTemplate} from "./components/main-menu";
import {createProfileTemplate} from "./components/profile";
import {createShowMoreButtonTemlate} from "./components/show-more-button";
import {createSortMenuTemplate} from "./components/sort-menu";

const FILMS_NUMER = 5;
const SUB_FILMS_NUMBER = 2;

// Функция вставки объекта на страницу
const renderBlock = (place, block, position = `beforeend`) => {
  place.insertAdjacentHTML(position, block);
};

// Шапка страницы
const pageHeader = document.querySelector(`.header`);
// Блок main
const pageMain = document.querySelector(`.main`);

// Отрисовка элементов на странице
renderBlock(pageHeader, createProfileTemplate());
renderBlock(pageMain, createMainMenuTemplate());
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
for (let i = 0; i < FILMS_NUMER; i++) {
  renderBlock(mainFilmList, createFilmCardTemlate());
}

// Отрисовка кнпоки показать еще
renderBlock(mainFilmsBlock, createShowMoreButtonTemlate());

// Отрисовка просматриваемых и комментируемых фильмов
for (let i = 0; i < SUB_FILMS_NUMBER; i++) {
  renderBlock(topRatedFilms, createFilmCardTemlate());
  renderBlock(mostCommentedFilms, createFilmCardTemlate());
}

const pageFooter = document.querySelector(`.footer`);
// Отрисовка карточки фильма
renderBlock(pageFooter, createFilmDeatilsTemplate(), `afterend`);

// Временный блок
const popup = document.querySelector(`.film-details`);
const popupCloseButton = popup.querySelector(`.film-details__close-btn`);
const onPopupClose = () => {
  popup.remove();
  popupCloseButton.removeEventListener(`click`, onPopupClose);
};
popupCloseButton.addEventListener(`click`, onPopupClose);
