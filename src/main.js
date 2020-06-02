import FilmsBoardController from "./controllers/films-board.js";

import FilterControl from "./controllers/filter.js";
import ProfileComponent from "./components/profile";
import FilmsComponent from "./components/films";

import {generateFilmCards} from "./mock/film";

import {renderComponent} from "./utils/render.js";

import FilmsModel from "./models/films.js";

const FILMS_NUMBER = 20;

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const films = generateFilmCards(FILMS_NUMBER);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

renderComponent(pageHeader, new ProfileComponent());

const filterController = new FilterControl(pageMain, filmsModel);
filterController.render();

const filmsBoard = new FilmsComponent();
const filmsBoardController = new FilmsBoardController(filmsBoard, filmsModel);

renderComponent(pageMain, filmsBoard);
filmsBoardController.render(films);
