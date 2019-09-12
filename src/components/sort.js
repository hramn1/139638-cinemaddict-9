import {default as AbstractComponent} from './abstract.js';
class Sort extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<ul class="sort">
        <li><a href="#" data-sort="default" class="sort__button sort__button--active sort__button--default">Sort by default</a></li>
        <li><a href="#" data-sort="date" class="sort__button sort__button--date">Sort by date</a></li>
        <li><a href="#" data-sort="rating" class="sort__button sort__button--rating">Sort by rating</a></li>
      </ul>`;
  }
  onSortDefault() {}
  onSortdate() {
  }
  onSortRating() {}
  bind() {
      const element = this._element;
      element.querySelector(`.sort__button--default`).addEventListener('click', this.onSortDefault);
      element.querySelector(`.sort__button--date`).addEventListener('click', this.onSortdate);
      element.querySelector(`.sort__button--rating`).addEventListener('click', this.onSortRating);
    }
  }
export default Sort;
