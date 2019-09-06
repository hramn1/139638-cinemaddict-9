import {default as AbstractComponent} from './abstract.js';
class Sort extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<ul class="sort">
        <li><a href="#" data-sort="default" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort="date" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort="rating" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }
}
export default Sort;
