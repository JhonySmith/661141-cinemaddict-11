import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DATE: `date`,
  RATING: `raiting`,
  DEFAULT: `deafult`,
};

const createSortMenuTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortMenu extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortMenuTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeClick(onObjectClick) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      const activeButton = this.getElement().querySelector(`.sort__button--active`);
      activeButton.classList.remove(`sort__button--active`);

      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = sortType;

      onObjectClick(this._currentSortType);
    });

  }
}
