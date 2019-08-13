import {addShowMore} from './components/button.js';
import {addfilmCard} from './components/film-card.js';
import {addMenu} from './components/menu.js';
import {addMostComment} from './components/most-comment.js';
import {addPopup} from './components/popup.js';
import {addTitleUser} from './components/title-user.js';
import {addTopRated} from './components/top-rated.js';
import {addSearch} from './components/search.js';
import {addFilmContainer} from './components/film-container.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
function render(container, layout) {
  container.insertAdjacentHTML(`beforeend`, layout);
}
render (headerContainer, addSearch());
render (headerContainer, addTitleUser());
render (mainContainer, addMenu());
render (mainContainer, addFilmContainer());
const filmContainer = document.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list`);
const filmCardContainer = filmList.querySelector(`.films-list__container`)
render (filmList, addShowMore());
for (let i = 0; i < 5; i++){
  render(filmCardContainer,addfilmCard());
}
for (let j = 0; j < 2; j++){
  render (filmContainer, addTopRated());
}
const filmExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
for (let k = 0; k < 2; k++){
  render(filmExtraContainer[k],addfilmCard());
}
