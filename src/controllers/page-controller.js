import {default as Button} from '../components/button';
import {default as TopRated} from '../components/top-rated';
import {default as FilmContainer} from '../components/film-container';
import {default as Menu} from '../components/menu';
import {render, unrender, Position, AUTHORIZATION, END_POINT, generatorRandom} from '../utils';
import {default as Sort} from "../components/sort";
import {default as MovieController} from "./movie-controller";
import API from "../api";


const mainContainer = document.querySelector(`.main`);
class PageController {
  constructor(container, film, count, stat, onDataChangeMain) {
    this._container = container;
    this._film = film;
    this._stat = stat;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = count;
    this._subscriptions = [];
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._onDataChangeMain = onDataChangeMain;
  }
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  _onDataChange(popup, newData, container, oldData, isChangeCommentsList = false, commentId = false) {
    if (isChangeCommentsList) {
      this._onDataChangeComments(newData, oldData, commentId);
    } else {
      const currentIndexOfFilmCard = this._film.findIndex((it) => {
        return it === oldData;
      });
      const keysOfNewData = Object.keys(newData);
      keysOfNewData.forEach((key) => {
        this._film[currentIndexOfFilmCard][key] = newData[key];
      });
    }
    const filmId = oldData.id;
    const dataForSend = oldData;
    this._api.updateFilm(filmId, dataForSend)
      .then(() => {
        this._onDataChangeMain();
        if (popup) {
          popup.unDisabledRating();
        }
      });

    this.unrenderAll();
    this.init();
  }
  _onDataChangeComments(newData, oldData, commentId) {
    if (commentId) {
      const commentsListData = this._film[this._film.findIndex((it) => it === oldData)].comments;
      const indexInCards = this._film.findIndex((it) => it === oldData);
      const indexInCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      this._film[indexInCards].comments.splice(indexInCommentsList, 1);
    } else {
      newData.id = generatorRandom.generateRandomNumber(1000, 9999);
      this._film[this._film.findIndex((it) => it === oldData)].comments.push(newData.id);
    }
  }

  addExtraFilm(topRated) {
    const topRatingFilm = () => {
      let filsmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.totalRating) - parseFloat(filmSecond.totalRating)));
      filsmRating = filsmRating.slice(0, 2);
      this.renderCard(topRated.takeContainer()[0], filsmRating);
    };
    const topCommentFilm = () => {
      let filmsComment = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.comments.length) - parseFloat(filmSecond.comments.length)));
      filmsComment = filmsComment.slice(0, 2);
      this.renderCard(topRated.takeContainer()[1], filmsComment);
    };
    topCommentFilm();
    topRatingFilm();
  }
  addCountFilmFooter() {
    const totalFilm = this._film.length;
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalFilm} movies inside`;
  }
  renderCard(containerCard, films) {
    const movieController = new MovieController(films, containerCard, this._count, this._onDataChange, this._onChangeView);
    movieController.init();
  }
  unrenderCard() {
    const filmCard = document.querySelectorAll(`.films-list .films-list__container .film-card`);
    filmCard.forEach((item) => unrender(item));
  }
  unrenderAll() {
    mainContainer.innerHTML = ``;
  }
  init() {
    // меню
    let totalFilm = this._film;
    let historyCount = 0;
    let watchlistCount = 0;
    let favorites = 0;
    for (let it of this._film) {
      if (it.controls.isMarkedAsWatched) {
        historyCount++;
      }
      if (it.controls.isAddedToWatchlist) {
        watchlistCount++;
      }
      if (it.controls.isFavorite) {
        favorites++;
      }
    }
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
      this.renderCard(filmCardContainer, totalFilm);
    };
    menu.showHistory = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsWatched = totalFilm.filter(function (it) {
        return it.controls.isMarkedAsWatched === true;
      });
      this.renderCard(filmCardContainer, filmsWatched);
    };
    menu.showWatchlist = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsWatchList = totalFilm.filter(function (it) {
        return it.controls.isAddedToWatchlist === true;
      });
      this.renderCard(filmCardContainer, filmsWatchList);
    };
    menu.showFavorites = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsFavor = totalFilm.filter(function (it) {
        return it.controls.isFavorite === true;
      });
      this.renderCard(filmCardContainer, filmsFavor);
    };

    render(mainContainer, menu.getElement(), Position.BEFOREEND);
    const filmContainer = new FilmContainer();
    render(this._container, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    const moreButton = new Button();

    moreButton.onButtonClick = () => {
      this._count += 5;
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      this.unrenderCard();

      this.renderCard(filmCardContainer, this._film);

    };
    render(filmList, moreButton.getElement(), Position.BEFOREEND);
    if (this._count >= this._film.length) {
      unrender(moreButton.getElement());
    }
    this.addCountFilmFooter();

    // Сортировка
    const sortFilm = new Sort();

    sortFilm.onSortRating = () => {
      this._film = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.totalRating) - parseFloat(filmSecond.totalRating)));
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
    };

    sortFilm.onSortDefault = () => {
      this.unrenderCard();
      this._film = totalFilm;
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
