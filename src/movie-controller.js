import {default as Popup} from './components/popup.js';
import {isEscPressed, Position, render, unrender} from "./utils";
import {default as FilmCard} from './components/film-card.js';
const bodyContainer = document.querySelector(`body`);


class MovieController {
  constructor(container, films, totalFilm) {
    this._container = container;
    this._film = films;
    this._totalfilm = totalFilm;
    // this._onDataChange = onDataChange;
    // this._onChangeView = onChangeView;
    this.onCardTogglerClick = this.onCardTogglerClick.bind(this);
  }
  renderCard(countFilm, countFilmStart, container, arrFilm, totalFilm) {
    const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
    arrFilmSlice.forEach((item) => render(container, new FilmCard(item).getElement(), Position.BEFOREEND));
    const blockFilmCard = document.querySelectorAll(`.film-card`);
    for (let item of blockFilmCard) {
      item.addEventListener(`click`, this.onCardTogglerClick);
    }
    // Вот кнопка показать ещё фильмы работает как то не так и фильтры ломает то есть фильтры работают только на первые 5 фильмов нажимаю кнопку и показывает первый раз ещё 5 фильмов при этом фильтры сбиваются
    // Если нажать ещё раз то вообще может хоть 20 показать в общем куда её тока не засовывал должным образом она у меня не работает. С остальным вроде понятно только со связывнием данных ещё толком не разбирался.
    const btnShowFilm = document.querySelector(`.films-list__show-more`);
    btnShowFilm.addEventListener(`click`, () => {
      for (let film of blockFilmCard) {
        unrender(film);
      }
      countFilm = countFilm + 5;
      if (countFilm >= totalFilm) {
        btnShowFilm.style.display = `none`;
        countFilm = totalFilm;
      }
      this.renderCard(countFilm, countFilmStart, container, arrFilm, totalFilm);
    });
    this.sortFilm(this._container, this._film, this._totalfilm);
  }
  sortFilm(filmCardContainer, arrFilm, totalFilm) {
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
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        linkAddActive();
        item.classList.add(`sort__button--active`);
        const blockFilmCard = document.querySelectorAll(`.film-card`);
        for (let film of blockFilmCard) {
          unrender(film);
        }
        if (evt.target.dataset.sort === `default`) {
          const arrFilmDefault = [];
          for (let i = 0; i < totalFilm; i++) {
            arrFilmDefault.push(...arrFilm);
          }
          this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmDefault);
        } else if (evt.target.dataset.sort === `rating`) {
          const arrFilmRating = [...arrFilm].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
          this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRating);
        } else if (evt.target.dataset.sort === `date`) {
          const arrFilmRDate = [...arrFilm].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
          this.renderCard(countFilm, countFilmStart, filmCardContainer, arrFilmRDate);
        }
      });
    }
  }
  static openPopup(popup) {
    render(bodyContainer, popup.getElement(), Position.BEFOREEND);
    bodyContainer.classList.add(`hide-overflow`);
    const onCloseBtnClick = (evtClose) => {
      evtClose.preventDefault();
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        MovieController.closePopup(popup);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        MovieController.closePopup(popup);
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
  onCardTogglerClick(evt) {
    evt.preventDefault();
    const popups = [];
    let popup = {};
    popups.push(...this._film);
    for (let i = 0; i < popups.length; i++) {
      if (evt.currentTarget.dataset.id === String(popups[i].id)) {
        popup = new Popup(this._film[i]);
      }
    }
    const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
    if (togglers.some((cls) => evt.target.classList.contains(cls))) {
      MovieController.openPopup(popup);
    }
  }
  // setDefaultView() {
  //   if (document.body.contains(popup.getElement())) {
  //     unrender(this._moviePopup.getElement());
  //     this._moviePopup.removeElement();
  //   }
  // }
  create() {
    let countFilm = 5;
    let countFilmStart = 0;
    this.renderCard(countFilm, countFilmStart, this._container, this._film, this._totalfilm);
  }
}
export default MovieController;
