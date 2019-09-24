// Шаблон для комментариев - comment.js
import {default as AbstractComponent} from './abstract.js';

export class Comment extends AbstractComponent {
  constructor({avatar, text, autor, date}) {
    super();
    this._avatar = avatar;
    this._text = text;
    this._autor = autor;
    this._date = date;
  }

  static createComments(array) { // Функция получения комментариев
    const fragment = document.createElement(`div`);
    array.forEach((element) => {
      const comment = new Comment(element);
      fragment.appendChild(comment.getElement());
    });
    return fragment.innerHTML;
  }

  getTemplate() {
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._avatar}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._autor}</span>
          <span class="film-details__comment-day">${(this._date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
}
