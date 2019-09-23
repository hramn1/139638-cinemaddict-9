import {Position,unrender, render} from "../utils";
import {default as NoSearch} from '../components/no-search-result.js';
class SearchControlLer {
  constructor(container, filmData, search, page) {
    this._container = container;
    this._film = filmData;
    this._search = search;
    this._page = page;
  }
  init() {
    let filmSearch = [];
    const filmListContainer = document.querySelector(`.films-list__container`);
    this._search.startSearch = ()=>{
      for (let item of this._film) {
        let filmTitle = item.filmTitle.toLowerCase();

        if (item.filmTitle.includes(this._search.researchValue().toLowerCase().trim())) {
          filmSearch.push(item);
        } else {
          unrender(this._container);
          render(headerContainer, new NoSearch().getElement(), Position.AFTER);
        }
      }
      this._page.unrenderCard();
      this._page.renderCard(filmListContainer, filmSearch);

    };
    render(this._container, this._search.getElement(), Position.BEFOREEND);


  }
}
export default SearchControlLer;
