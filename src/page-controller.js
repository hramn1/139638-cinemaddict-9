import {default as Button} from './components/button.js';
import {default as TopRated} from './components/top-rated.js';
import {default as FilmContainer} from './components/film-container.js';
import {default as NoSearch} from './components/no-search-result.js';
import {default as FilmCard} from './components/film-card.js';
import {render, unrender, Position} from './utils.js';
import {totalfilm} from "./data.js";
import {default as Sort} from "./components/sort";
import {default as MovieController} from "./movie-controller.js";

class PageController {
  constructor(container, film) {
    this._container = container;
    this._film = film;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  _onDataChange(newData, oldData) {
    this._cards[this._cards.findIndex((card) => card === oldData)] = newData;
    this._renderFilmLists(this._cards, this._generalFilmsList.getElement().querySelector(`.films-list__container`).childElementCount);
  }
  addExtraFilm(container) {
    for (let j = 0; j < 2; j++) {
      render(container.getElement(), new TopRated().getElement(), Position.BEFOREEND);
    }
    const filmExtraTitle = document.querySelectorAll(`.films-list--extra .films-list__title`);
    filmExtraTitle.forEach(function (item, i) {
      if (i === 0) {
        item.textContent = `Top rated`;
      } else {
        item.textContent = `Most comment`;
      }
    });
  }
  // sortFilm(filmCardContainer, arrFilm, totalFilm) {
  //   const btnSort = document.querySelectorAll(`.sort__button`);
  //   const countFilm = 5;
  //   const countFilmStart = 0;
  //   const linkAddActive = () => {
  //     for (let link of btnSort) {
  //       if (link.classList.contains(`sort__button--active`)) {
  //         link.classList.remove(`sort__button--active`);
  //       }
  //     }
  //   };
  //   for (let item of btnSort) {
  //     item.addEventListener(`click`, (evt) => {
  //       evt.preventDefault();
  //       linkAddActive();
  //       item.classList.add(`sort__button--active`);
  //       const blockFilmCard = document.querySelectorAll(`.film-card`);
  //       for (let film of blockFilmCard) {
  //         unrender(film);
  //       }
  //       if (evt.target.dataset.sort === `default`) {
  //         const arrFilmDefault = [];
  //         for (let i = 0; i < totalFilm; i++) {
  //           arrFilmDefault.push(...arrFilm);
  //         }
  //         this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmDefault);
  //       } else if (evt.target.dataset.sort === `rating`) {
  //         const arrFilmRating = [...arrFilm].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
  //         this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRating);
  //       } else if (evt.target.dataset.sort === `date`) {
  //         const arrFilmRDate = [...arrFilm].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
  //         this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRDate);
  //       }
  //     });
  //   }
  // }
  addCountFilmFooter(){
    const headerContainer = document.querySelector(`.header`);
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalfilm} movies inside`;
    if (Object.keys(this._film).length === 0) {
      unrender(this._container);
      render(headerContainer, new NoSearch().getElement(), Position.AFTER);
    }
  }
  init() {
    const filmContainer = new FilmContainer();
    render(this._container, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    render(filmList, new Button().getElement(), Position.BEFOREEND);
    const movieController = new MovieController(filmCardContainer, this._film, totalfilm);
    movieController.create();
    this.addExtraFilm(filmContainer);
    this.addCountFilmFooter();
    const sortFilm = new Sort();
    sortFilm.onSortRating = () => {
      console.log('fdf')
      const arrFilmRating = [...this._film].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
      unrender(this._film);
              render(this._container, new FilmCard(arrFilmRating), Position.BEFOREEND);
    }
    render(this._container, sortFilm.getElement(), Position.BEFOREEND);
  }
}

export default PageController;
