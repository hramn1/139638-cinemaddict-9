import {Button} from './components/button.js';
import {FilmCard} from './components/film-card.js';
import {Popup} from './components/popup.js';
import {TopRated} from './components/top-rated.js';
import {FilmContainer} from './components/film-container.js';
import {NoSearch} from './components/no-search-result.js';
import {render, unrender, Position, isEscPressed} from './utils.js';
import {generateFilmData as filmData, totalfilm} from "./data.js";
const mainContainer = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);
const headerContainer = document.querySelector(`.header`);

class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }
  onCardTogglerClick(evt) {
    evt.preventDefault();
    const openPopup = (popup) => {
      render(bodyContainer, popup.getElement(), Position.BEFOREEND);
      bodyContainer.classList.add(`hide-overflow`);
    };
    const closePopup = (popup) => {
      unrender(popup.getElement());
      popup.removeElement();
      bodyContainer.classList.remove(`hide-overflow`);
    };
    const popup = new Popup(filmData());
    const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
    if (togglers.some((cls) => evt.target.classList.contains(cls))) {
      openPopup(popup);
    }
    const onCloseBtnClick = (evtClose) => {
      evtClose.preventDefault();
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const commentAdd = popup.getElement().querySelector(`.film-details__comment-input`);
    commentAdd.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onEscKeydown);
    });
    commentAdd.addEventListener(`blur`, function () {
      document.addEventListener(`keydown`, onEscKeydown);
    });
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    document.addEventListener(`keydown`, onEscKeydown);
  }
  renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm) {
    const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
    const btnShowFilm = document.querySelector(`.films-list__show-more`);
    arrFilmSlice.forEach((item) => render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
    const blockFilmCard = document.querySelectorAll(`.film-card`);
    for (let item of blockFilmCard) {
      item.addEventListener(`click`, this.onCardTogglerClick);
    }
    btnShowFilm.addEventListener(`click`, function () {
      countFilm = countFilm + 5;
      countFilmStart = countFilmStart + 5;
      if (countFilm >= totalfilm) {
        btnShowFilm.style.display = `none`;
        countFilm = totalfilm;
        page.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);
      } else {
        page.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);
      }
    });
  }
  init() {
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
    this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilm);

  }
}

export {PageController};
