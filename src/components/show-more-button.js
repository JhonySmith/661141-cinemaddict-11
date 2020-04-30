// Кнопка показать больше
import AbstractComponent from "./abstract-component.js";

const createShowMoreButtonTemlate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemlate();
  }
}
