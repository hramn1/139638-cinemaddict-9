import {asdShowMore} from './components/button.js';
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
const filmcontainer = document.querySelector(`.films`);
for (let i = 0; i < 2; i++){
  render (filmcontainer, addTopRated());
}
