import {default as Button} from '../components/button.js';
import {default as TopRated} from '../components/top-rated.js';
import {default as FilmContainer} from '../components/film-container.js';
import {default as Menu} from '../components/menu.js';
import {historyCount} from '../data.js';
import {watchlistCount} from '../data.js';
import {favorites} from '../data.js';
import {render, unrender, Position} from '../utils.js';
import {totalfilm, arrFilm} from "../data.js";
import {default as Sort} from "../components/sort";
import {default as MovieController} from "./movie-controller.js";
const mainContainer = document.querySelector(`.main`);
class PageController {
  constructor(container, film, count, stat) {
    this._container = container;
    this._film = film;
    this._stat = stat;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = count;
    this._subscriptions = [];
  }
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  _onDataChange(newData, container, oldData) {
    const currentIndexOfFilmCard = this._film.findIndex((it) => {
      return it === oldData;
    });
    const keysOfNewData = Object.keys(newData);
    keysOfNewData.forEach((key) => {
      this._film[currentIndexOfFilmCard][key] = newData[key];
    });
    this.unrenderCard();
    this.renderCard(container, this._film);

  }
  addExtraFilm(topRated) {
    const topRatingFilm = () => {
      let arrFilmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
      arrFilmRating = arrFilmRating.slice(0, 2);
      this.renderCard(topRated.takeContainer()[0], arrFilmRating);
    };
    const topCommentFilm = () => {
      let arrFilmComment = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.comments) - parseFloat(filmSecond.comments)));
      arrFilmComment = arrFilmComment.slice(0, 2);
      this.renderCard(topRated.takeContainer()[1], arrFilmComment);
    };
    topCommentFilm();
    topRatingFilm();
  }
  addCountFilmFooter() {
    const headerContainer = document.querySelector(`.header`);
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalfilm} movies inside`;
  }
  renderCard(containerCard, films) {
    const movieController = new MovieController(films, containerCard, this._count, this._onDataChange, this._onChangeView);
    movieController.init();
  }
  unrenderCard() {
    const filmCard = document.querySelectorAll(`.films-list .films-list__container .film-card`);
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
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm;
      this.renderCard(filmCardContainer, this._film);
    };
    menu.showHistory = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm.filter(function (it) {
        return it.watched === true;
      });
      this.renderCard(filmCardContainer, this._film);
    };
    menu.showWatchlist = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm.filter(function (it) {
        return it.watchlist === true;
      });
      this.renderCard(filmCardContainer, this._film);
    };
    menu.showFavorites = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._film = arrFilm.filter(function (it) {
        return it.favorites === true;
      });
      this.renderCard(filmCardContainer, this._film);
    };

    render(mainContainer, menu.getElement(), Position.BEFOREEND);
    const filmContainer = new FilmContainer();
    render(this._container, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    const moreButton = new Button();

    moreButton.onButtonClick = () => {
      this._count += 5;
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
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
      this.renderCard(filmCardContainer, this._film);
    };

    sortFilm.onSortDefault = () => {
      this.unrenderCard();
      this._film = arrFilm;
      this.renderCard(filmCardContainer, this._film);
    };

    sortFilm.onSortdate = () => {
      this._film = [...this._film].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
    };

    render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    const topRated = new TopRated();
    for (let j = 0; j < 2; j++) {
      render(filmContainer.getElement(), new TopRated().getElement(), Position.BEFOREEND);
      topRated.removetitle();
    }
    this.renderCard(filmCardContainer, this._film);
    this.addExtraFilm(topRated);
  }

}

export default PageController;
