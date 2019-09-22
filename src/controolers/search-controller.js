import {Position, render} from "../utils";

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
        if (item.filmTitle === this._search.researchValue().trim()) {
          filmSearch.push(item);
        }
      }
      this._page.unrenderCard();
      this._page.renderCard(filmListContainer, filmSearch);

    };
    render(this._container, this._search.getElement(), Position.BEFOREEND);


  }
}
export default SearchControlLer;
