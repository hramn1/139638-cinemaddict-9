import AbstractComponent from "./abstract.js";

class NoFilms extends AbstractComponent {
  constructor(textInfo = `There are no movies in our database.`) {
    super();
    this._textInfo = textInfo;
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
          <div class="no-result">
            ${this._textInfo}
          </div>
        </section>
      </section>
    `;
  }
}
export default NoFilms;
