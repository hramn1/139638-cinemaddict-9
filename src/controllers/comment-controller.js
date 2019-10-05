import {createElement, render, unrender, KeyCode, Position, AUTHORIZATION, END_POINT} from "../utils";
import Comment from "../components/comment";
import CommentsList from "../components/comment-list";
import API from "../api";
import DOMPurify from "dompurify";

export default class CommentsController {
  constructor(container, dataCard, onDataChange, commentsData) {
    this._container = container;
    this._dataCard = dataCard;
    this._commentsData = commentsData;
    this._onDataChange = onDataChange;
    this._commentsList = new CommentsList();
    this._commentsNumber = this._container.querySelector(`.film-details__comments-count`);
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
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
    let pressedKey = new Set();
    this._container.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => this._sendComment(evt, pressedKey));
  }

  _sendComment(evtDown, pressedKey) {
    const commentTextarea = this._container.querySelector(`.film-details__comment-input`);
    let commentUserText = DOMPurify.sanitize(commentTextarea.value, {FORBID_TAGS: [`style`]});
    if (evtDown.key === KeyCode.ENTERSTRING || evtDown.key === KeyCode.CONTROLSTRING) {
      pressedKey.add(evtDown.key);
      document.addEventListener(`keyup`, function (evtUp) {
        if (evtUp.key === KeyCode.ENTERSTRING || evtUp.key === KeyCode.CONTROLSTRING) {
          pressedKey.delete(evtUp.key);
        }
      });
    }
    if (pressedKey.size === 2) {
      pressedKey.clear();

      commentTextarea.disabled = true;
      let smile = `smile`;

      if (this._container.querySelector(`.film-details__add-emoji-label img`)) {
        const smileSrc = this._container.querySelector(`.film-details__add-emoji-label img`).src || `/smile.png`;
        const smileImg = smileSrc.substr(smileSrc.lastIndexOf(`/`) + 1);
        smile = smileImg.substr(0, smileImg.indexOf(`.`));
      }

      const commentData = {
        comment: commentUserText,
        date: new Date(),
        emotion: smile,
      };
      this._api.createComment(commentData, this._dataCard.id)
        .then(() => {
          this._api.getComments(this._dataCard.id)
            .then((comments) => {
              const lastComment = comments[comments.length - 1];
              const newComment = new Comment(lastComment);
              render(this._commentsList.getElement(), newComment.getElement(), Position.AFTERBEGIN);
              this._commentsNumber.textContent = +this._commentsNumber.textContent + 1;

              this._btnRemoveComment(newComment);

              commentTextarea.value = ``;
              commentTextarea.disabled = false;
              const isChangeCommentsList = true;
              this._onDataChange(null, commentData, this._container, this._dataCard, isChangeCommentsList, commentData.id);
            });
        })
        .catch(() => {
          commentTextarea.value = ``;
          commentTextarea.disabled = false;
        });
    }
  }

  _btnRemoveComment(currentComment) {
    const btnDelete = currentComment.getElement().querySelector(`.film-details__comment-delete`);

    btnDelete.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const commentId = currentComment.getElement().dataset.commentId;

      const isChangeCommentsList = true;
      this._api.deleteComment({commentId})
        .then(() => {
          unrender(currentComment.getElement());
          currentComment.removeElement();

          this._commentsNumber.textContent = +this._commentsNumber.textContent - 1;
          this._onDataChange(null, null, this._container, this._dataCard, isChangeCommentsList, +commentId);
        });
    });
  }
}
