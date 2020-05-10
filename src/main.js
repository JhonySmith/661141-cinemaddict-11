import FilmsBoardController from "./controllers/films-board.js";

import MainMenuComponent from "./components/main-menu";
import ProfileComponent from "./components/profile";
import SortMenuComponent from "./components/sort-menu";
import FilmsComponent from "./components/films";

import {generateFilmCards} from "./mock/film";
import {generateFilters} from "./mock/filter-menu";
import {renderComponent} from "./utils/render.js";

const FILMS_NUMBER = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const films = generateFilmCards(FILMS_NUMBER);
const filters = generateFilters(films);


renderComponent(pageHeader, new ProfileComponent());
renderComponent(pageMain, new MainMenuComponent(filters));
renderComponent(pageMain, new SortMenuComponent());

const filmsBoard = new FilmsComponent();
const filmsBoardController = new FilmsBoardController(filmsBoard);

renderComponent(pageMain, filmsBoard);
filmsBoardController.render(films);


