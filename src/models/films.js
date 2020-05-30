export default class Films {
  constructor() {
    this._films = [];

    this._onDataChanges = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callEvents(this._onDataChanges);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callEvents(this._onDataChanges);

    return true;
  }

  setOnDataChange(onChange) {
    this._onDataChanges.push(onChange);
  }

  _callEvents(events) {
    events.forEach((event) => event());
  }
}
