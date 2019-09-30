import {default as AbstractComponent} from './abstract';
class TitleUser extends AbstractComponent {
  constructor(Title) {
    super();
    this._titleUser = Title;
  }
  getTemplate() {
    return `<section class="header__profile profile">
        <p class="profile__rating">${this._titleUser}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
export default TitleUser;
