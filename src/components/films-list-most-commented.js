import AbstractComponent from "./abstract-component.js";

const createFilmsListMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class FilmsListTopRated extends AbstractComponent {
  getTemplate() {
    return createFilmsListMostCommentedTemplate();
  }
}
