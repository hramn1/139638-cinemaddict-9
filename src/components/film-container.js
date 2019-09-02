import {AbstractComponent} from './abstract.js';

class FilmContainer extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container">
          </div>
        </section>
      </section>`;
  }
}

export {FilmContainer};
