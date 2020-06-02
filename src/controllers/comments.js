import CommentsComponent from "../components/comments.js";
import {renderComponent} from "../utils/render.js";

export default class Comments {
  constructor(container, onDataChange, movieController) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._movieController = movieController;
  }

  render(comments) {
    const commentsComponent = new CommentsComponent(comments);
    renderComponent(this._container, commentsComponent);

  }

  _removeComment(film, commentId) {
    const newFilm = Object.assign({}, film);
    newFilm.comments = newFilm.comments.filter(({id}) => id !== commentId);
    return newFilm;
  }

}
