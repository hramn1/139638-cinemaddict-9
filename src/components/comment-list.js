import AbstractComponent from "./abstract";

export default class CommentsList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="film-details__comments-list"></ul>`;
  }
}
