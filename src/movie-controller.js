import {default as Popup} from './components/popup.js';
import {isEscPressed, Position, render, unrender} from "./utils";
import FilmCard from "./components/film-card";
const bodyContainer = document.querySelector(`body`);


class MovieController {
  constructor(container, films, totalFilm, onDataChange) {
    this._container = container;
    this._film = films;
    this._totalfilm = totalFilm;
    this._filmCard = new FilmCard(this._film);
    this._popup = new Popup(this._film );
    this._onDataChange = onDataChange;
    // this._onChangeView = onChangeView;
    this.onCardTogglerClick = this.onCardTogglerClick.bind(this);
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
    this.setDefaultView(popup);
    const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
    if (togglers.some((cls) => evt.target.classList.contains(cls))) {
      MovieController.openPopup(popup);
    }
  }
  setDefaultView(popup) {
    if (document.body.contains(popup.getElement())) {
      unrender(popup.getElement());
      popup.removeElement();
    }
  }
     getNewMokData  (nameOfList)  {
      const switchTrueFalse = (bool) => {
        return bool ? false : true;
      };
      const formData = new FormData(this._popup.getElement().querySelector(`.film-details__inner`));
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
      this._onDataChange(entry, this._film);
      this._filmCard.onAddToWatchlistClick = (evt) => {
        evt.preventDefault();
        console.log('gfg')
        getNewMokData(`watchlist`);
      };
      this._filmCard.onMarkAsWatchedClick = (evt) => {
        evt.preventDefault();
        getNewMokData(`watched`);
      };
      this._filmCard.onFavoriteClick = (evt) => {
        evt.preventDefault();
        getNewMokData(`favorites`);
      };
    };
}
export default MovieController;
