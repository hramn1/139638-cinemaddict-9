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
  bind() {
    const element = this._element;
    const btnFilmShow = element.querySelectorAll(`.main-navigation__item`);
    for (let item of btnFilmShow) {
      if (item.hash === `#all`) {
        item.addEventListener(`click`, this.showAll);
      } else if (item.hash === `#watchlist`) {
        item.addEventListener(`click`, this.showWatchlist);
      } else if (item.hash === `#history`) {
        item.addEventListener(`click`, this.showHistory);
      } else if (item.hash === `#favorites`) {
        item.addEventListener(`click`, this.showFavorites);
      } else {
        item.addEventListener(`click`, this.showStat);
      }
    }
  }
  addClassActiv() {
    const linkEl = this._element.querySelectorAll(`.main-navigation__item`);
    for (let el of linkEl) {
      if (el.classList.contains(`main-navigation__item--active`)) {
        el.classList.remove(`main-navigation__item--active`);
      }
    }
    this._element.addEventListener(`click`, function (evt) {
      evt.target.classList.add(`main-navigation__item--active`);
    });
  }
  showAll() {}
  showWatchlist() {}
  showHistory() {}
  showFavorites() {}
  showStat() {}
}
export default Menu;
