import {default as AbstractComponent} from './abstract';

class NoSearch extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="no-search-result">
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
</section>`;
  }
}
export default NoSearch;
