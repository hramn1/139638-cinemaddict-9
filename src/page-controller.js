import {default as Button} from './components/button.js';
import {default as FilmCard} from './components/film-card.js';
import {default as TopRated} from './components/top-rated.js';
import {default as FilmContainer} from './components/film-container.js';
import {default as NoSearch} from './components/no-search-result.js';
import {render, unrender, Position} from './utils.js';
import {totalfilm} from "./data.js";
import {default as Sort} from "./components/sort";
import {default as MovieController} from "./movie-controller.js";
import {arrFilm} from "./data";
const headerContainer = document.querySelector(`.header`);

class PageController {
  constructor(container, film) {
    this._container = container;
    this._film = film;
  }
  static renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm, movieController) {
    const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
    arrFilmSlice.forEach((item) => render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
    const blockFilmCard = document.querySelectorAll(`.film-card`);
    for (let item of blockFilmCard) {
      item.addEventListener(`click`, movieController.onCardTogglerClick);
    }
  }
  static showMoreFilm(countFilm, countFilmStart, filmCardContainer, arrFilm, movieController) {
    PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm, movieController);
    const btnShowFilm = document.querySelector(`.films-list__show-more`);
    btnShowFilm.addEventListener(`click`, function () {
      countFilm = countFilm + 5;
      countFilmStart = countFilmStart + 5;
      if (countFilm >= totalfilm) {
        btnShowFilm.style.display = `none`;
        countFilm = totalfilm;
        PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm, movieController);
      } else {
        PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm, movieController);
      }
    });
  }
  // _onDataChange(newData, oldData, isCardChanges = true) {
  //   if (isCardChanges) {
  //     this._cardsData[this._cardsData.findIndex((card) => card === oldData)] = newData;
  //   } else {
  //     this._commentsData.comments[this._commentsData.comments.findIndex((comment) => comment === oldData)] = newData;
  //   }
  //
  //   this._mainCardsContainer.clear();
  //   this._cardsData
  //     .slice(0, this._filmList.getCardsCount())
  //     .forEach((data) => this._renderCard(this._container, data));
  //   this._raitingCardsContainer.clear();
  //   this._renderTopRatingCards();
  //   this._commentsCardsContainer.clear();
  //   this._renderMostCommentCards();
  // }
  //
  // _onChangeView() {
  //   this._subscriptions.forEach((subscription) => subscription());
  // }
  // Нажатие на карточку
  // СОРТИРОВКА
  sortFilm(filmCardContainer, arrFilm, movieController) {
    const btnSort = document.querySelectorAll(`.sort__button`);
    const countFilm = 5;
    const countFilmStart = 0;
    const linkAddActive = () => {
      for (let link of btnSort) {
        if (link.classList.contains(`sort__button--active`)) {
          link.classList.remove(`sort__button--active`);
        }
      }
    };
    for (let item of btnSort) {
      item.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        linkAddActive();
        item.classList.add(`sort__button--active`);
        const blockFilmCard = document.querySelectorAll(`.film-card`);
        for (let film of blockFilmCard) {
          unrender(film);
        }
        if (evt.target.dataset.sort === `default`) {
          const arrFilmDefault = [];
          for (let i = 0; i < totalfilm; i++) {
            arrFilmDefault.push(...arrFilm);
          }
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmDefault, movieController);
        } else if (evt.target.dataset.sort === `rating`) {
          const arrFilmRating = [...arrFilm].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRating, movieController);
        } else if (evt.target.dataset.sort === `date`) {
          const arrFilmRDate = [...arrFilm].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRDate, movieController);
        }
      });
    }
  }
  init() {
    render(this._container, new Sort().getElement(), Position.BEFOREEND);
    render(this._container, new FilmContainer().getElement(), Position.BEFOREEND);
    const filmContainer = document.querySelector(`.films`);
    const filmList = filmContainer.querySelector(`.films-list`);
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    render(filmList, new Button().getElement(), Position.BEFOREEND);
    const movieController = new MovieController(this._container, this._film);

    let countFilm = 5;
    let countFilmStart = 0;
    for (let j = 0; j < 2; j++) {
      render(filmContainer, new TopRated().getElement(), Position.BEFOREEND);
    }
    const filmExtraTitle = document.querySelectorAll(`.films-list--extra .films-list__title`);
    filmExtraTitle.forEach(function (item, i) {
      if (i === 0) {
        item.textContent = `Top rated`;
      } else {
        item.textContent = `Most comment`;
      }
    })
    this.sortFilm(filmCardContainer, this._film, movieController);
    PageController.showMoreFilm(countFilm, countFilmStart, filmCardContainer, this._film, movieController);
    const filmExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmExtra = this._film;
    filmExtraContainer.forEach(function () {
      for (let k = 0; k < 2; k++) {
        render(filmExtraContainer[k], new FilmCard(...filmExtra).getElement(), Position.BEFOREEND);
      }
    });
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalfilm} movies inside`;
    if (Object.keys(this._film).length === 0) {
      unrender(this._container);
      render(headerContainer, new NoSearch().getElement(), Position.AFTER);
    }
  }
}

export default PageController;
