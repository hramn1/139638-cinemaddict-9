import {createElement} from "../utils.js";

class Menu {
  constructor(historyCount, watchlistCount, favorites) {
    this._historyCount = historyCount;
    this.watchlistCount = watchlistCount;
    this.favorites = favorites;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this.watchlistCount
}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._historyCount
}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this.favorites
}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`;
  }
}
export {Menu};
