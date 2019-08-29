import {Button} from './components/button.js';
import {FilmCard} from './components/film-card.js';
import {Menu} from './components/menu.js';
import {Popup} from './components/popup.js';
import {TitleUser} from './components/title-user.js';
import {TopRated} from './components/top-rated.js';
import {Search} from './components/search.js';
import {FilmContainer} from './components/film-container.js';
import {Sort} from './components/sort.js';
import {generateFilmData as filmData} from './data.js';
import {historyCount} from './data.js';
import {watchlistCount} from './data.js';
import {favorites} from './data.js';
import {totalfilm} from './data.js';
import {generateRank} from './data.js';
import {render, unrender, Position} from './utils.js';
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);

const openPopup = (popup) => {
  render(bodyContainer,  popup.getElement(), Position.BEFOREEND);
  bodyContainer.classList.add(`hide-overflow`);
};

const closePopup = (popup) => {
  unrender(popup.getElement());
  popup.removeElement();
  bodyContainer.classList.remove(`hide-overflow`);
};
function onCardTogglerClick (evt) {
  evt.preventDefault();
  console.log('true');
  const popup = new Popup(filmData());
  const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];

  if (togglers.some((cls) => evt.target.classList.contains(cls))) {
    openPopup(popup);
    document.addEventListener(`keydown`, onEscKeydown);

    // filmDetails
    //   .getElement()
    //   .addEventListener(`click`, onCloseBtnClick);
  }
};
//.

render(headerContainer, new Search().getElement(), Position.BEFOREEND);
render(headerContainer, new TitleUser(generateRank()).getElement(), Position.BEFOREEND);
 render(mainContainer, new Menu(historyCount, watchlistCount, favorites).getElement(), Position.BEFOREEND);
 render(mainContainer, new Sort().getElement(), Position.BEFOREEND);
 render(mainContainer, new FilmContainer().getElement(), Position.BEFOREEND);
 const filmContainer = document.querySelector(`.films`);
 const filmList = filmContainer.querySelector(`.films-list`);
 const filmCardContainer = filmList.querySelector(`.films-list__container`);
 render(filmList,new Button().getElement(), Position.BEFOREEND);
 const arrFilm = [];
 let countFilm = 5;
 let countFilmStart = 0;
for (let i = 0; i < totalfilm; i++) {
  arrFilm.push(filmData());
}
function renderCard() {
  const arrFilmSlice = arrFilm.slice(countFilmStart, countFilm);
  arrFilmSlice.forEach((item) =>  render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
}
renderCard();
const btnShowFilm = document.querySelector(`.films-list__show-more`);
const blockFilmCard = document.querySelector('.film-card')
blockFilmCard.addEventListener(`click`, onCardTogglerClick);
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
  render(filmContainer,  new TopRated().getElement(), Position.BEFOREEND) ;
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
    render(filmExtraContainer[k], new FilmCard(filmData()).getElement(), Position.BEFOREEND);
  }
});

const footerStatistics = document.querySelector(`.footer__statistics`);
footerStatistics.textContent = `${totalfilm} movies inside`;
