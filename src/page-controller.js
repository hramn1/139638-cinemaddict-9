import {default as Button} from './components/button.js';
import {default as TopRated} from './components/top-rated.js';
import {default as FilmContainer} from './components/film-container.js';
import {default as NoSearch} from './components/no-search-result.js';
import {default as FilmCard} from './components/film-card.js';
import {render, unrender, Position} from './utils.js';
import {totalfilm, arrFilm} from "./data.js";
import {default as Sort} from "./components/sort";
import {default as MovieController} from "./movie-controller.js";

class PageController {
  constructor(container, film, count) {
    this._container = container;
    this._film = film;
    //this._onChangeView = this._onChangeView.bind(this);
    //this._onDataChange = this._onDataChange.bind(this);
    this._count = count
  }
  // _onChangeView() {
  //   this._subscriptions.forEach((subscription) => subscription());
  // }
  // _onDataChange(newData, oldData) {
  //   this._cards[this._cards.findIndex((card) => card === oldData)] = newData;
  //   this._renderFilmLists(this._cards, this._generalFilmsList.getElement().querySelector(`.films-list__container`).childElementCount);
  // }
  addExtraFilm(container) {
    for (let j = 0; j < 2; j++) {
      render(container.getElement(), new TopRated().getElement(), Position.BEFOREEND);
    }
    const filmExtraTitle = document.querySelectorAll(`.films-list--extra .films-list__title`);
    filmExtraTitle.forEach(function (item, i) {
      if (i === 0) {
        item.textContent = `Top rated`;
      } else {
        item.textContent = `Most comment`;
      }
    });
    const containerExtaFilm = document.querySelectorAll(`.films-list--extra .films-list__container`);
    const topRatingFilm=()=>{
      let arrFilmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
      arrFilmRating = arrFilmRating.slice(0, 2);
      arrFilmRating.forEach((item) => render(containerExtaFilm[0], new FilmCard(item).getElement(), Position.BEFOREEND));
    }
    topRatingFilm()
  }
  filmToggle(){
    const movieController = new MovieController(this._container, this._film, totalfilm);
    const blockFilmCard = document.querySelectorAll(`.film-card`);
    for (let item of blockFilmCard) {
      item.addEventListener(`click`, movieController.onCardTogglerClick);
    }
  }
  addCountFilmFooter(){
    const headerContainer = document.querySelector(`.header`);
    const footerStatistics = document.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalfilm} movies inside`;
    if (Object.keys(this._film).length === 0) {
      unrender(this._container);
      render(headerContainer, new NoSearch().getElement(), Position.AFTER);
    }
  }
  renderCard(container) {

    const arrFilmSlice = this._film.slice(0, this._count);

    arrFilmSlice.forEach((item) => render(container, new FilmCard(item).getElement(), Position.BEFOREEND));
    this.filmToggle();
  }
  unrenderCard(){
    const filmCard = document.querySelectorAll('.films-list__container .film-card');
    filmCard.forEach((item) => unrender(item));
  }
  init() {
    const filmContainer = new FilmContainer();
    render(this._container, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    const moreButton = new Button();
    moreButton.onButtonClick = () => {
      const btnShowMore = document.querySelector(`.films-list__show-more`);
         this._count += 5;
         this.unrenderCard();
         this.renderCard(filmCardContainer);
         if(this._count >= totalfilm) {
           unrender(btnShowMore);
         }
       }
    render(filmList, moreButton.getElement(), Position.BEFOREEND);
    this.addExtraFilm(filmContainer);
    this.addCountFilmFooter();
    const linkAddActive = () => {
      const btnSort = document.querySelectorAll(`.sort__button`);
      for (let link of btnSort) {
        if (link.classList.contains(`sort__button--active`)) {
          link.classList.remove(`sort__button--active`);
        }
      }
    };
    const sortFilm = new Sort();
    sortFilm.onSortRating = () => {
    linkAddActive();
    document.querySelector(`.sort__button--rating`).classList.add(`sort__button--active`);
    this._film = [...this._film].sort((filmFirst, filmSecond) => (parseFloat(filmFirst.ratings) - parseFloat(filmSecond.ratings)));
    //this._film = this._film.slice(0, this._count);
    this.unrenderCard();
    this.renderCard(filmCardContainer)
    //arrFilmRating.forEach((item) => render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
    // const blockFilmCard = document.querySelectorAll(`.film-card`);
    // this.filmToggle();

    }
    sortFilm.onSortDefault = () => {
      linkAddActive();
      document.querySelector(`.sort__button--default`).classList.add(`sort__button--active`);
      this.unrenderCard();
      this._film = arrFilm;
      this.renderCard(filmCardContainer);
    }
    sortFilm.onSortdate = () => {
    linkAddActive();
    document.querySelector(`.sort__button--date`).classList.add(`sort__button--active`);
    this._film = [...this._film].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
    //arrFilmRDate = arrFilmRDate.slice(0, this._count);
    this.unrenderCard();
    this.renderCard(filmCardContainer)
    //arrFilmRDate.forEach((item) => render(filmCardContainer, new FilmCard(item).getElement(), Position.BEFOREEND));
    //this.filmToggle();
    }
    render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    this.renderCard(filmCardContainer)
    }
  }

export default PageController;
