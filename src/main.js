import {addShowMore} from './components/button.js';
import {addfilmCard} from './components/film-card.js';
import {addMenu} from './components/menu.js';
// import {addPopup} from './components/popup.js';
import {addTitleUser} from './components/title-user.js';
import {addTopRated} from './components/top-rated.js';
import {addSearch} from './components/search.js';
import {addFilmContainer} from './components/film-container.js';
import {addSort} from './components/sort.js';
import {generateFilmData as filmData} from './data.js';
import {historyCount} from './data.js';
import {watchlistCount} from './data.js';
import {favorites} from './data.js';
import {totalfilm} from './data.js';
import {generateRank} from './data.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
function render(container, layout) {
  container.insertAdjacentHTML(`beforeend`, layout);
}
console.log(filmData());
render(headerContainer, addSearch());
render(headerContainer, addTitleUser(generateRank()));
render(mainContainer, addMenu(historyCount, watchlistCount, favorites));
render(mainContainer, addSort());
render(mainContainer, addFilmContainer());
const filmContainer = document.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list`);
const filmCardContainer = filmList.querySelector(`.films-list__container`);
render(filmList, addShowMore());
const arrFilm = [];
let countFilm = 5;
let countFilmStart = 0;
for (let i = 0; i < totalfilm; i++) {
  arrFilm.push(filmData());
}
function renderCard() {
  const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
  arrFilmSlice.forEach((item) => filmCardContainer.insertAdjacentHTML(`beforeend`, addfilmCard(item)));
}
renderCard();
const btnShowFilm = document.querySelector(`.films-list__show-more`);
btnShowFilm.addEventListener(`click`, function () {
  countFilm = countFilm + 5;
  countFilmStart = countFilmStart + 5;
  if (countFilm >= totalfilm) {
    btnShowFilm.style.display = `none`;
    countFilm = totalfilm;
    renderCard();
  } else {
    renderCard();
  }

});
for (let j = 0; j < 2; j++) {
  render(filmContainer, addTopRated());
}
const filmExtraTitle = document.querySelectorAll(`.films-list--extra .films-list__title`);
filmExtraTitle.forEach(function (item, i) {
  if (i === 0) {
    item.textContent = `Top rated`;
  } else {
    item.textContent = `Most comment`;
  }
});
const filmExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
filmExtraContainer.forEach(function () {
  for (let k = 0; k < 2; k++) {
    render(filmExtraContainer[k], addfilmCard(filmData()));
  }
});

const footerStatistics = document.querySelector(`.footer__statistics`);
footerStatistics.textContent = `${totalfilm} movies inside`;
