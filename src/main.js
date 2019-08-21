import {addShowMore} from './components/button.js';
import {addfilmCard} from './components/film-card.js';
import {addMenu} from './components/menu.js';
//import {addPopup} from './components/popup.js';
import {addTitleUser} from './components/title-user.js';
import {addTopRated} from './components/top-rated.js';
import {addSearch} from './components/search.js';
import {addFilmContainer} from './components/film-container.js';
import {addSort} from './components/sort.js';
import {generateFilmData as filmData} from './data.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
function render(container, layout) {
  container.insertAdjacentHTML(`beforeend`, layout);
}
render(headerContainer, addSearch());
render(headerContainer, addTitleUser());
render(mainContainer, addMenu());
render(mainContainer, addSort());
render(mainContainer, addFilmContainer());
const filmContainer = document.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list`);
const filmCardContainer = filmList.querySelector(`.films-list__container`);
render(filmList, addShowMore());
for (let i = 0; i < 5; i++) {
  render(filmCardContainer, addfilmCard(filmData));
}
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
    render(filmExtraContainer[k], addfilmCard(filmData));
  }
});
const btnShowFilm = document.querySelector(`.films-list__show-more`);
let countFilm = 5;
btnShowFilm.addEventListener(`click`, function () {
  for (let i = 0; i < 5; i++) {
    countFilm++
    render(filmCardContainer, addfilmCard(filmData));
  }
  console.log(countFilm)
  console.log(filmData.filmTitle.length)
  if (countFilm >= filmData.filmTitle.length) {
    btnShowFilm.style.display = `none`;
  }
});
