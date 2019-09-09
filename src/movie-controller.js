import {default as Popup} from './components/popup.js';
import {isEscPressed, Position, render, unrender} from "./utils";
const bodyContainer = document.querySelector(`body`);


class MovieController {
  constructor(container, films, onDataChange, onChangeView) {
    this._container = container;
    this._film = films;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.onCardTogglerClick = this.onCardTogglerClick.bind(this);
    this.init();
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
  init() {


  }
}
export default MovieController;
