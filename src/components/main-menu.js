import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  const countTemplate = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  const active = isChecked ? `main-navigation__item--active` : ``;
  return (
    `<a href="#${name}" id="filter__${name}" class="main-navigation__item ${active}">${name}${countTemplate}</a>`
  );
};

// Блок меню включая статистику
const createMainMenuTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainMenu extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createMainMenuTemplate(this._filters);
  }

  onFilterClick(onClick) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      onClick(filterName);
    });
  }
}
