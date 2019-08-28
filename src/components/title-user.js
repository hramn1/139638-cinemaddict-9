  import {createElement} from "../utils.js";
  class TitleUser {
    constructor(Title) {
      this._element = null;
      this._titleUser = Title.generateRank;

    }

    getElement() {
      if (!this._element) {
        this._element = createElement(this.getTemplate());
      }

      return this._element;
    }

    removeElement() {
      remove(this._element);
      this._element = null;
    }


    getTemplate() {
      return `<section class="header__profile profile">
          <p class="profile__rating">${_titleUser}</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        </section>`;
    }
  }
  export {TitleUser}
