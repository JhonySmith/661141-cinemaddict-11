export default class Film {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.rating = data.film_info.total_rating;
    this.poster = data.film_info.poster;
    this.ageRaiting = data.film_info.age_rating;
    this.director = data.film_info.director;
    this.screenwriters = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.releaseDate = data.film_info.release.date;
    this.releaseCountry = data.film_info.release.release_country;
    this.movieDuration = data.film_info.runtime;
    this.genre = data.film_info.genre;
    this.description = data.film_info.description;
    this.inWatchList = Boolean(data.user_details.watchlist);
    this.viewed = Boolean(data.user_details.already_watched);
    this.viewedDate = data.user_details.watching_date;
    this.inFavoriteList = Boolean(data.user_details.favorite);
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'actors': this.actors,
        'age_rating': this.ageRaiting,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'description': this.description,
        'director': this.director,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': this.releaseDate,
          'release_country': this.releaseCountry
        },
        'runtime': this.movieDuration,
        'writers': this.screenwriters
      },
      'user_details': {
        'already_watched': this.viewed,
        'favorite': this.inFavoriteList,
        'watching_date': this.viewedDate,
        'watchlist': this.inWatchList
      },
    };
  }

  static clone(film) {
    return new Film(film.toRAW());
  }
}
