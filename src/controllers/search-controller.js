import {Position,unrender, render} from "../utils";
import {default as NoSearch} from '../components/no-search-result.js';
class SearchControlLer {
  constructor(container, filmData, search, page, mainContainer) {
    this._container = container;
    this._film = filmData;
    this._search = search;
    this._page = page;
    this._mainContainer = mainContainer;
  }
  init() {
    const filmListContainer = document.querySelector(`.films-list__container`);

    this._search.startSearch = () => {
      let filmSearch = [];
      const noSearch = new NoSearch();
      if (this._search.researchValue().length > 3) {
        for (let item of this._film) {
          let filmTitle = item.title.toLowerCase();
          if (filmTitle.includes(this._search.researchValue().toLowerCase().trim()) || filmTitle === this._search.researchValue().toLowerCase().trim()) {
            filmSearch.push(item);
          }
        }
        if (filmSearch.length === 0) {
          unrender(this._mainContainer);
          render(this._container, noSearch.getElement(), Position.AFTER);
        } else {
          this._page.unrenderCard();
          this._page.renderCard(filmListContainer, filmSearch);
        }
      }
      else if (this._search.researchValue().length === 0){
        this._search.searchReset();
      }
    }
      this._search.searchReset = () => {
        this._page.unrenderCard();
        this._page.renderCard(filmListContainer, this._film);
        //this._page.init()
      }
      render(this._container, this._search.getElement(), Position.BEFOREEND);
  }
}
export default SearchControlLer;
