import FilmDetails from "../components/film-details.js";
import CommentsController from "../controllers/comments.js";
import CommentsModel from "../models/comments";
import {renderComponent, remove, RenderPosition, replace} from "../utils/render.js";

export default class FilmDetailsController {
  constructor(onDataChange, onViewChange, api, movieController) {
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._movieController = movieController;
    this._api = api;
    this._filmDetailsComponent = null;

    this._pageBody = document.querySelector(`body`);
  }

  render(film) {
    this._filmDetailsComponent = this._getFilmDetailCard(film);
    renderComponent(this._pageBody, this._filmDetailsComponent);

    const commentsModel = new CommentsModel();
    const commentsContainer = this._filmDetailsComponent.getCommentsSection();

    const commentsController = new CommentsController(commentsContainer, this._onDataChange, this._movieController);


    this._api.getComments(film.id)
      .then((comments) => {
        commentsModel.setComments(comments);
        commentsController.render(commentsModel.getComments());
      });
  }

  _getFilmDetailCard(film, comments) {
    const filmDetails = new FilmDetails(film, comments);

    filmDetails.setOnCloseClick((evt) => {
      evt.preventDefault();
      this.destroy();
    });

    filmDetails.setOnDetailsInWatchListClick(() => {
      this._movieController._onWatchList();
    });

    filmDetails.setOnDetailsIAddToFavoriteClick(() => {
      this._movieController._onFavourite();
    });

    filmDetails.setOnDetailsMarkAsWatchedClick(() => {
      this._movieController._onMarkAsWatched();
    });

    document.addEventListener(`keydown`, this._onEscKeyDown);

    return filmDetails;
  }

  _onEscKeyDown(evt) {
    const isEscPress = (evt.key === `Ecs`) || (evt.key === `Escape`);
    if (isEscPress) {
      this.destroy();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
