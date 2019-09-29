// Шаблон для комментариев - comment.js
import {default as AbstractComponent} from './abstract';

export class Comment extends AbstractComponent {
  constructor({id, emotion, comment, author, date}) {
    super();
    this.id = id;
    this._avatar = emotion;
    this._text = comment;
    this._autor = author;
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
        <img src="./images/emoji/${this._avatar}.png" width="55" height="55" alt="emoji">
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
