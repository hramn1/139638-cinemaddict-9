export const addfilmCard = ({filmTitle, genre, ratings, posters, year, desciption}) =>
  `<article class="film-card">
    <h3 class="film-card__title">${filmTitle}</h3>
    <p class="film-card__rating">${ratings}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">1h 55m</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${posters}" alt="" class="film-card__poster">
    <p class="film-card__description">${desciption()}</p>
    <a class="film-card__comments">5 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
