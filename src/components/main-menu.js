const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  const isNumber = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  return (
    `<a href="#${name}" class="main-navigation__item">${name}${isNumber}</a>`
  );
};

// Блок меню включая статистику
export const createMainMenuTemplate = (filters) => {
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
