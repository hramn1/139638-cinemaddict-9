import {default as AbstractComponent} from './abstract.js';

class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._title = card.filmTitle;
    this._id = card.id;
    this._rating = card.ratings;
    this._year = card.year;
    this._runtime = card.runtime;
    this._genre = card.genre;
    this._poster = card.posters;
    this._shortDescription = card.desciption;
    this._countComments = card.countComments;
    this._favorites = card.favorites;
    this._watchlist = card.watchlist;
    this._watched = card.watched;
  }
  getTemplate() {
    return `<article class="film-card" data-id="${this._id}">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">${this._runtime}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._shortDescription}</p>
    <a class="film-card__comments">${this._countComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist && `film-card__controls-item--active`}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched && `film-card__controls-item--active`}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._favorites && `film-card__controls-item--active`}">Mark as favorite</button>
    </form>
  </article>`;
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
