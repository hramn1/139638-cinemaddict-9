import moment from "moment";

class ModelFilm {
  constructor(data) {
    this.id = data[`id`] || null;
    this.title = data[`film_info`][`title`] || ``;
    this.year = data[`film_info`][`release`][`date`] || null;
    this.duration = data[`film_info`][`runtime`] || null;
    this.genre = data[`film_info`][`genre`] || [];
    this.posterLink = `./${data[`film_info`][`poster`]}` || ``;
    this.description = data[`film_info`][`description`] || ``;
    this.controls = {
      isAddedToWatchlist: Boolean(data[`user_details`][`watchlist`]) || false,
      isMarkedAsWatched: Boolean(data[`user_details`][`already_watched`]) || false,
      isFavorite: Boolean(data[`user_details`][`favorite`]) || false
    };
    this.alternativeTitle = data[`film_info`][`alternative_title`] || ``;
    this.totalRating = data[`film_info`][`total_rating`] || 0;
    this.releaseCountry = data[`film_info`][`release`][`release_country`] || ``;
    this.director = data[`film_info`][`director`] || ``;
    this.ageRating = data[`film_info`][`age_rating`] || 0;
    this.actors = data[`film_info`][`actors`] || [];
    this.writers = data[`film_info`][`writers`] || [];

    // Временные комменты, чтобы код работал
    this.comments = [
      {
        id: Math.random(),
        smile: `smile.png`,
        text: `Interesting setting and a good cast`,
        author: `Tim Macoveev`,
        date: `3 days ago`
      },
      {
        id: Math.random(),
        smile: `sleeping.png`,
        text: `Booooooooooring`,
        author: `ohn Doe`,
        date: `1 days ago`
      },
      {
        id: Math.random(),
        smile: `puke.png`,
        text: `Very very old. Meh`,
        author: `John Doe`,
        date: `today`
      }
    ];
    // this.comments = data[`comments`];

    this.personalRating = data[`user_details`][`personal_rating`] || ``;
    this.watchingDate = moment(data[`user_details`][`watching_date`]).format() || null;
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
export default ModelFilm;
