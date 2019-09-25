import {default as AbstractComponent} from './abstract.js';
import moment from "moment";

class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._title = card.title;
    this._id = card.id;
    this._rating = card.totalRating;
    this._year = card.year;
    this._runtime = card.duration;
    this._genre = card.genre;
    this._poster = card.posterLink;
    this._shortDescription = card.description;
    this._countComments = card.countComments;
    this._controls = card.controls;
  }
  getTemplate() {
    return `<article class="film-card" data-id="${this._id}">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this.addYear()} </span>
      <span class="film-card__duration">${this.addRuntime()}</span>
      <span class="film-card__genre">${this.addGenre()}</span>
    </p>
    <img src="${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${this.addDescription()}</p>
    <a class="film-card__comments">${this._countComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._controls.isAddedToWatchlist && `film-card__controls-item--active`}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._controls.isMarkedAsWatched && `film-card__controls-item--active`}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._controls.isFavorite && `film-card__controls-item--active`}">Mark as favorite</button>
    </form>
  </article>`;
  }
  addYear() {
    return moment(this._year).format(`YYYY`);
  }
  addRuntime() {
    let minutes = this._runtime % 60;
    let hour = Math.floor(this._runtime / 60);
    if (hour === 0) {
      hour = ``;
    }
    return `${hour}h ${minutes}m`;
  }
  addGenre() {
    return this._genre.join(`, `);
  }
  addDescription() {
    let strDesk = this._shortDescription;
    if (this._shortDescription.length > 139) {
      strDesk = this._shortDescription.substr(0, 139);
      strDesk += `...`;
    }
    return strDesk;
  }
  onAddToWatchlistClick() {}

  onMarkAsWatchedClick() {}

  onFavoriteClick() {}

  onToggleFilm() {}
  bind() {
    this._element.addEventListener(`click`, (evt) => {
      this.onToggleFilm(evt);
    });
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      this.onAddToWatchlistClick(evt);
    });
    this._element.querySelector(`.film-card__controls-item--mark-as-watched `).addEventListener(`click`, (evt) => {
      this.onMarkAsWatchedClick(evt);
    });
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, (evt) => {
      this.onFavoriteClick(evt);
    });
  }
}

export default FilmCard;
