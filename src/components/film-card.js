// Карточка фильма
export const createFilmCardTemlate = (film) => {

  const title = film.title;
  const poster = film.poster;
  const description = film.description;
  const commentsCount = film.comments.length;
  const inWatchList = film.inWatchList;
  const viewed = film.viewed;
  const inFavouriteList = film.inFavouriteList;
  const rating = film.rating;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${viewed ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavouriteList ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
    </article>`
  );
};
