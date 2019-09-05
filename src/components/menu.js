import {default as AbstractComponent} from './abstract.js';

class Menu extends AbstractComponent {
  constructor(historyCount, watchlistCount, favorites) {
    super();
    this._historyCount = historyCount;
    this.watchlistCount = watchlistCount;
    this.favorites = favorites;
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
export default Menu;
