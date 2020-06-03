import API from "./api.js";
import FilmsBoardController from "./controllers/films-board.js";
import FilmsComponent from "./components/films";
import FilmsModel from "./models/films.js";
import FilterControl from "./controllers/filter.js";
import ProfileComponent from "./components/profile";
import LoadingComponent from "./components/loading.js";

import {renderComponent, remove} from "./utils/render.js";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);

const filmsModel = new FilmsModel();

renderComponent(pageHeader, new ProfileComponent());

const filterController = new FilterControl(pageMain, filmsModel);
filterController.render();

const filmsBoard = new FilmsComponent();
const filmsBoardController = new FilmsBoardController(filmsBoard, filmsModel, api);

renderComponent(pageMain, filmsBoard);

const loadingComponent = new LoadingComponent();
renderComponent(filmsBoard.getElement(), loadingComponent);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
  })
  .finally(() => {
    remove(loadingComponent);
    filmsBoardController.render();
  });


