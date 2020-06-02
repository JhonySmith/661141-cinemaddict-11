import MainMenu from "../components/main-menu.js";
import {renderComponent, replace} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

import {FilterType} from "../const.js";

export default class FilterControl {
  constructor(container, FilmsModel) {
    this._container = container;
    this._filmsModel = FilmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setOnDataChange(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new MainMenu(filters);
    this._filterComponent.onFilterClick(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderComponent(container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
