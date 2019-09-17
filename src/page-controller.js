import {default as Button} from './components/button.js';
import {default as TopRated} from './components/top-rated.js';
import {default as FilmContainer} from './components/film-container.js';
import {default as NoSearch} from './components/no-search-result.js';
import {default as FilmCard} from './components/film-card.js';
import {default as Menu} from './components/menu.js';
import {historyCount} from './data.js';
import {watchlistCount} from './data.js';
import {favorites} from './data.js';
import {render, unrender, Position} from './utils.js';
import {totalfilm, arrFilm} from "./data.js";
import {default as Sort} from "./components/sort";
import {default as MovieController} from "./movie-controller.js";
const mainContainer = document.querySelector(`.main`);
class PageController {
  constructor(container, film, count, stat) {
    this._container = container;
    this._film = film;
    this._stat = stat
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = count;
    this._subscriptions = [];
  }
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  _onDataChange(newData, oldData) {
    const currentIndexOfFilmCard = this._film.findIndex((it) => it === oldData);
    const keysOfNewData = Object.keys(newData);
    keysOfNewData.forEach((key) => { // Ищем нужные свойства объекта карточка филма и меняем их
      this._film[currentIndexOfFilmCard][key] = newData[key];

    });
  }
  addExtraFilm(container) {
    const topRated = new TopRated();
    for (let j = 0; j < 2; j++) {
      render(container.getElement(), new TopRated().getElement(), Position.BEFOREEND);
    }
    topRated.removetitle();
    const topRatingFilm = () => {
      let arrFilmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
      arrFilmRating = arrFilmRating.slice(0, 2);
      this.renderCard(topRated.takeContainer()[0], arrFilmRating);

      // arrFilmRating.forEach(function (item) {
      //   render(topRated.takeContainer()[0], new FilmCard(item).getElement(), Position.BEFOREEND);
      // });
    };
    const topCommentFilm = () => {
      let arrFilmComment = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.comments) - parseFloat(filmSecond.comments)));
      arrFilmComment = arrFilmComment.slice(0, 2);
      this.renderCard(topRated.takeContainer()[1], arrFilmComment);

      // arrFilmComment.forEach(function (item) {
      //   render(topRated.takeContainer()[1], new FilmCard(item).getElement(), Position.BEFOREEND);
      // });
    };
    topCommentFilm();
    topRatingFilm();
  }
  addCountFilmFooter() {
    const headerContainer = document.querySelector(`.header`); // нет компонента футера куда бы можно было запихнуть
    const footerStatistics = document.querySelector(`.footer__statistics`); // нет компонента футера куда бы можно было запихнуть
    footerStatistics.textContent = `${totalfilm} movies inside`;
    if (Object.keys(this._film).length === 0) {
      unrender(this._container);
      render(headerContainer, new NoSearch().getElement(), Position.AFTER);
    }
  }
  renderCard(containerCard, films) {
    const movieController = new MovieController(this._container, films, totalfilm, containerCard, this._count, this._onDataChange);
    movieController.filmToggle();
  }
  unrenderCard() {
    const filmCard = document.querySelectorAll(`.films-list .films-list__container .film-card`); // Попытался убрать но там такая логика получается что хуже сем сейчс
    filmCard.forEach((item) => unrender(item));
  }
  init() {
    // меню
    const menu = new Menu(historyCount, watchlistCount, favorites);
    menu.showStat = () => {
      menu.addClassActiv();
      filmContainer.getElement().classList.add(`visually-hidden`);
      this._stat.getElement().classList.remove(`visually-hidden`);

    };
    menu.showAll = () => {
      menu.addClassActiv();
      if(filmContainer.getElement().classList.contains(`visually-hidden`)){
      filmContainer.getElement().classList.remove(`visually-hidden`);
    }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm;
      this.renderCard(filmCardContainer);
    }
    menu.showHistory = () => {
      menu.addClassActiv();
      if(filmContainer.getElement().classList.contains(`visually-hidden`)){
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm.filter(function (it) {
        return it.isViewed === true})
      this.renderCard(filmCardContainer);
    }
    menu.showWatchlist = () => {
      menu.addClassActiv();
      if(filmContainer.getElement().classList.contains(`visually-hidden`)){
      filmContainer.getElement().classList.remove(`visually-hidden`);
    }
    this._stat.getElement().classList.add(`visually-hidden`);
    this.unrenderCard();
    this._film = arrFilm.filter(function (it) {
      return it.isWatchlist === true})
      this.renderCard(filmCardContainer);
    }
    menu.showFavorites = () => {
      menu.addClassActiv();
      if(filmContainer.getElement().classList.contains(`visually-hidden`)){
      filmContainer.getElement().classList.remove(`visually-hidden`);
    }
    this._stat.getElement().classList.add(`visually-hidden`);
    this.unrenderCard();
    this._film = arrFilm.filter(function (it) {
      return it.isFavorites === true})
      this.renderCard(filmCardContainer);
    }

    render(mainContainer, menu.getElement(), Position.BEFOREEND);
    const filmContainer = new FilmContainer();
    render(this._container, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`); // нет компонента
    // кнопка шоу мор
    const moreButton = new Button();

    moreButton.onButtonClick = () => {
      this._count += 5;
      this.unrenderCard();
      this.renderCard(filmCardContainer);
      if (this._count >= totalfilm) {
        unrender(moreButton.getElement());
      }
    };
    render(filmList, moreButton.getElement(), Position.BEFOREEND);

    this.addCountFilmFooter();

    // Сортировка
    const sortFilm = new Sort();

    sortFilm.onSortRating = () => {
      this._film = [...this._film].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
      this.unrenderCard();
      this.renderCard(filmCardContainer);
    };

    sortFilm.onSortDefault = () => {
      this.unrenderCard();
      this._film = arrFilm;
      this.renderCard(filmCardContainer);
    };

    sortFilm.onSortdate = () => {
      this._film = [...this._film].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
      this.unrenderCard();
      this.renderCard(filmCardContainer);
    };

    render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    this.renderCard(filmCardContainer, this._film);
    this.addExtraFilm(filmContainer);
  }

}

export default PageController;
