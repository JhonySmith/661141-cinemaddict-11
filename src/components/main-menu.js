import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  const countTemplate = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  return (
    `<a href="#${name}" class="main-navigation__item">${name}${countTemplate}</a>`
  );
};

// Блок меню включая статистику
const createMainMenuTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);
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
}
