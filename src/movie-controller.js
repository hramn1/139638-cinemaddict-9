import {default as Popup} from './components/popup.js';
import {isEscPressed, Position, render, unrender} from "./utils";
import FilmCard from "./components/film-card";
const bodyContainer = document.querySelector(`body`);


class MovieController {
  constructor(container, films, totalFilm, containerCard, count, onDataChange, onChangeView) {
    this._container = container;
    this._film = films;
    this._count = count;
    this._totalfilm = totalFilm;
    this._containerCard = containerCard;
    //this._filmCard = new FilmCard(this._film);
    //this._popup = new Popup(this._film);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    //this.onCardTogglerClick = this.onCardTogglerClick.bind(this);
  }

  openPopup(popup) {
    this._onChangeView();
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

  setDefaultView(popup) {
    if (document.body.contains(popup.getElement())) {
      unrender(popup.getElement());
      popup.removeElement();
    }
  }
  init() {

    const arrFilmSlice = this._film.slice(0, this._count);
    let film = {};
    let popup = {};
    const filmToggle = (evt, popup) => {
      this.setDefaultView(popup);
      const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
      if (togglers.some((cls) => evt.target.classList.contains(cls))) {
        this.openPopup(popup);
      }
    }
    for (let i = 0; i < arrFilmSlice.length; i++) {
      film = new FilmCard(this._film[i]);
      film.onMarkAsWatchedClick = (evt) => {
        evt.preventDefault();
        popup = new Popup(this._film[i]);
        getNewMokData(`watched`, popup);
      };
      film.onFavoriteClick = (evt) => {
        evt.preventDefault();
        popup = new Popup(this._film[i]);
        getNewMokData(`favorites`, popup);
      };
      film.onAddToWatchlistClick = (evt) => {
        evt.preventDefault();
        popup = new Popup(this._film[i]);
        getNewMokData(`watchlist`, popup);
      };
      film.onToggleFilm = (evt) =>{
          popup = new Popup(this._film[i]);
          filmToggle(evt, popup)
      }



      render(this._containerCard, film.getElement(), Position.BEFOREEND);
    }
    const getNewMokData = (nameOfList, popup) => {
      const formData = new FormData(popup.getElement().querySelector(`.film-details__inner`));
      const switchTrueFalse = (bool) => {
        return bool ? false : true;
      };
      const userRatio = formData.getAll(`score`);
      const entry = {
        favorites: Boolean(formData.get(`favorite`)),
        watchlist: Boolean(formData.get(`watchlist`)),
        watched: Boolean(formData.get(`watched`)),
        userRatio: `Your rate ${userRatio}`,
      };
      switch (nameOfList) {
        case `favorites`:
          entry.favorites = switchTrueFalse(entry.favorites);
          break;
        case `watchlist`:
          entry.watchlist = switchTrueFalse(entry.watchlist);
          break;
        case `watched`:
          entry.watched = switchTrueFalse(entry.watched);
          break;
      }
      for (let i = 0; i < this._film.length; i++) {
        let data =  this._film[i];
        this._onDataChange(entry, this._containerCard, data);
      }
    };
  }
}
export default MovieController;
