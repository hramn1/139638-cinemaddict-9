import {createElement} from "../utils.js";

class NoSearch {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<main class="main">
  <div class="result">
    <p class="result__text">Result <span class="result__count">0</span></p>
  </div>

  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="no-result">
        There is no movies for your request.
      </div>
    </section>
    </section>
</main>`;
  }
}
export {NoSearch};
