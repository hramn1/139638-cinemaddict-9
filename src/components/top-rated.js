import {default as AbstractComponent} from './abstract.js';
class TopRated extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container">
          </div>
        </section>`;
  }
  removeElement() {
    const arrElevtnr = document.querySelectorAll(`.films-list--extra`);
    if (arrElevtnr.length > 0) {
      return true;
    } else {
      return true;
    }
  }

  removetitle() {
    const filmExtraTitle = document.querySelectorAll(`.films-list--extra .films-list__title`);
    filmExtraTitle.forEach(function (item, i) {
      if (i === 0) {
        item.textContent = `Top rated`;
      } else {
        item.textContent = `Most comment`;
      }
    });
  }
  takeContainer() {
    return document.querySelectorAll(`.films-list--extra .films-list__container`);
  }
}
export default TopRated;
