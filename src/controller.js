import {default as Button} from './components/button.js';
import {default as FilmCard} from './components/film-card.js';
import {default as Popup} from './components/popup.js';
import {default as TopRated} from './components/top-rated.js';
import {default as FilmContainer} from './components/film-container.js';
import {default as NoSearch} from './components/no-search-result.js';
import {render, unrender, Position, isEscPressed} from './utils.js';
import {generateFilmData as filmData, totalfilm} from "./data.js";
import {default as Sort} from "./components/sort";
const mainContainer = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);
const headerContainer = document.querySelector(`.header`);

class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }
  static renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm) {
    const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
    arrFilmSlice.forEach((item) => render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
    const blockFilmCard = document.querySelectorAll(`.film-card`);
    for (let item of blockFilmCard) {
      item.addEventListener(`click`, this.prototype.onCardTogglerClick);
    }
  }
  static showMoreFilm(countFilm, countFilmStart, filmCardContainer, arrFilm) {
    PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);
    const btnShowFilm = document.querySelector(`.films-list__show-more`);
    btnShowFilm.addEventListener(`click`, function () {
      countFilm = countFilm + 5;
      countFilmStart = countFilmStart + 5;
      if (countFilm >= totalfilm) {
        btnShowFilm.style.display = `none`;
        countFilm = totalfilm;
        PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);
      } else {
        PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);
      }
    });
  }
  static openPopup(popup) {
    render(bodyContainer, popup.getElement(), Position.BEFOREEND);
    bodyContainer.classList.add(`hide-overflow`);
    const onCloseBtnClick = (evtClose) => {
      evtClose.preventDefault();
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        PageController.closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        PageController.closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    document.addEventListener(`keydown`, onEscKeydown);
    const commentAdd = popup.getElement().querySelector(`.film-details__comment-input`);
    commentAdd.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onEscKeydown);
    });
    commentAdd.addEventListener(`blur`, function () {
      document.addEventListener(`keydown`, onEscKeydown);
    });
  }
  static closePopup(popup) {
    unrender(popup.getElement());
    popup.removeElement();
    bodyContainer.classList.remove(`hide-overflow`);
  }
  // Нажатие на карточку
  onCardTogglerClick(evt) {
    evt.preventDefault();
    const popup = new Popup(filmData());
    const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
    if (togglers.some((cls) => evt.target.classList.contains(cls))) {
      PageController.openPopup(popup);
    }
  }
  // СОРТИРОВКА
  sortFilm(filmCardContainer, arrFilm) {
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
            arrFilmDefault.push(filmData());
          }
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmDefault);
        } else if (evt.target.dataset.sort === `rating`) {
          const arrFilmRating = [...arrFilm].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRating);
        } else if (evt.target.dataset.sort === `date`) {
          const arrFilmRDate = [...arrFilm].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
          PageController.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRDate);
        }
      });
    }
  }
  init() {
    render(mainContainer, new Sort().getElement(), Position.BEFOREEND);
    render(mainContainer, new FilmContainer().getElement(), Position.BEFOREEND);
    const filmContainer = document.querySelector(`.films`);
    const filmList = filmContainer.querySelector(`.films-list`);
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    render(filmList, new Button().getElement(), Position.BEFOREEND);
    const arrFilm = [];
    let countFilm = 5;
    let countFilmStart = 0;
    for (let i = 0; i < totalfilm; i++) {
      arrFilm.push(filmData());
    }
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
    this.sortFilm(filmCardContainer, arrFilm);
    PageController.showMoreFilm(countFilm, countFilmStart, filmCardContainer, arrFilm);
    const filmExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
    filmExtraContainer.forEach(function () {
      for (let k = 0; k < 2; k++) {
        render(filmExtraContainer[k], new FilmCard(filmData()).getElement(), Position.BEFOREEND);
      }
    });
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalfilm} movies inside`;
    if (Object.keys(filmData()).length === 0) {
      unrender(mainContainer);
      render(headerContainer, new NoSearch().getElement(), Position.AFTER);
    }
  }
}

export default PageController;
