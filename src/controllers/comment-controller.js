import {createElement, render, unrender, KeyCode, Position} from "../utils";
import Comment from "../components/comment";
import CommentsList from "../components/comment-list";

export default class CommentsController {
  constructor(container, dataCard, onDataChange, commentsData) {
    this._container = container;
    this._dataCard = dataCard;
    this._commentsData = commentsData;
    this._onDataChange = onDataChange;
    this._commentsList = new CommentsList();
    this._commentsNumber = this._container.querySelector(`.film-details__comments-count`);
  }

  init() {
    unrender(this._commentsList.getElement());
    this._commentsList.removeElement();

    const formTitle = this._container.querySelector(`.film-details__comments-title`);
    render(formTitle, this._commentsList.getElement(), Position.BEFOREEND);

    this._commentsData.forEach((commentData) => {

      const comment = new Comment(commentData);

      render(this._commentsList.getElement(), comment.getElement(), Position.BEFOREEND);

      this._btnRemoveComment(comment);
    });

    this._container.querySelectorAll(`.film-details__emoji-label`).forEach((el) => {
      el.addEventListener(`click`, () => {
        const img = el.querySelector(`img`);
        this._container.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this._container.querySelector(`.film-details__add-emoji-label`)
          .appendChild(createElement(`<img src="${img.src}" width="55" height="55" alt="emoji">`));
      });
    });

    this._container.querySelector(`.film-details__comment-input`)
    let pressedKey = new Set ();
      .addEventListener(`keydown`, (evt) => this._sendComment(evt, pressedKey));
  }

  _sendComment(evt, pressedKey) {
    if (evtDown.keyCode === KeyCode.ENTER || evtDown.keyCode === KeyCode.CONTROL){
  pressedKey.add(evtDown.keyCode)
  document.addEventListener('keyup', function(evtUp){
    if (evtUp.keyCode === KeyCode.ENTER || evtUp.keyCode === KeyCode.CONTROL){
    pressedKey.delete(evtUp.keyCode)
}
  } )
}
    if(pressedKey.size === 2) {
      const commentTextarea = this._container.querySelector(`.film-details__comment-input`);

      let smile = `smile`;

      if (this._container.querySelector(`.film-details__add-emoji-label img`)) {
        const smileSrc = this._container.querySelector(`.film-details__add-emoji-label img`).src || `/smile.png`;
        const smileImg = smileSrc.substr(smileSrc.lastIndexOf(`/`) + 1);
        smile = smileImg.substr(0, smileImg.indexOf(`.`));
      }

      const commentData = {
        id: Math.random(),
        author: `sasha grey`,
        comment: commentTextarea.value,
        emotion: smile,
      };

      const newComment = new Comment(commentData);

      render(this._commentsList.getElement(), newComment.getElement(), Position.AFTERBEGIN);
      this._commentsNumber.textContent = +this._commentsNumber.textContent + 1;

      this._btnRemoveComment(newComment);

      commentTextarea.value = ``;
      const isChangeCommentsList = true;
      this._onDataChange(commentData, this._container, this._dataCard, isChangeCommentsList);
    }
  }

  _btnRemoveComment(currentComment) {
    const btnDelete = currentComment.getElement().querySelector(`.film-details__comment-delete`);

    btnDelete.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const commentId = currentComment.getElement().dataset.commentId;

      const isChangeCommentsList = true;

      this._onDataChange(null, this._container, this._dataCard, isChangeCommentsList, +commentId);

      unrender(currentComment.getElement());
      currentComment.removeElement();

      this._commentsNumber.textContent = +this._commentsNumber.textContent - 1;
    });
  }
}
