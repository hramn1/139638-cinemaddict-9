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
  init() {
    const headerContainer = document.querySelector(`.header`);
    render(this._container, new Sort().getElement(), Position.BEFOREEND);
    render(this._container, new FilmContainer().getElement(), Position.BEFOREEND);
    const filmContainer = document.querySelector(`.films`);
    const filmList = filmContainer.querySelector(`.films-list`);
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    render(filmList, new Button().getElement(), Position.BEFOREEND);
    const movieController = new MovieController(filmCardContainer, this._film, totalfilm);
    movieController.create();

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
    });
    const filmExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const filmExtra = this._film;
    filmExtraContainer.forEach(function () {
      for (let k = 0; k < 2; k++) {
        render(filmExtraContainer[k], new FilmCard(...filmExtra).getElement(), Position.BEFOREEND);
        const blockFilmCard = document.querySelectorAll(`.film-card`);
        for (let item of blockFilmCard) {
          item.addEventListener(`click`, movieController.onCardTogglerClick);
        }
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
