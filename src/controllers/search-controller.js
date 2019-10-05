import {Position, unrender, render} from "../utils";
import {default as NoSearch} from '../components/no-search-result';
import {default as SearchResult} from '../components/search-result';
class SearchControlLer {
  constructor(container, filmData, search, page, mainContainer) {
    this._container = container;
    this._film = filmData;
    this._search = search;
    this._page = page;
    this._mainContainer = mainContainer;
  }
  init() {
    const noSearch = new NoSearch();
    const searchResult = new SearchResult();
    this._search.startSearch = () => {
      let filmSearch = [];
      if (this._search.researchValue().length > 3) {
        unrender(searchResult.getElement());
        document.querySelector(`.films-list__container`).textContent = ``;

        render(this._mainContainer, searchResult.getElement(), Position.AFTERBEGIN);
        const searchResultCount = searchResult.getElement().querySelector(`.result__count`);
        if (!document.querySelector(`.no-search-result`)) {
          document.querySelector(`.sort`).classList.add(`visually-hidden`);
          document.querySelector(`.main-navigation`).classList.add(`visually-hidden`);
          document.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
        }
        const filmEtra = document.querySelectorAll(`.films-list--extra`);
        for (let it of filmEtra) {
          it.classList.add(`visually-hidden`);
        }
        for (let item of this._film) {
          let filmTitle = item.title.toLowerCase();
          if (filmTitle.includes(this._search.researchValue().replace(/,/g, ``).toLowerCase().trim()) || filmTitle === this._search.researchValue().replace(/,/g, ``).toLowerCase().trim()) {
            filmSearch.push(item);
          }
        }
        if (filmSearch.length === 0) {

          document.querySelector(`.films-list__container`).innerHTML = `<div class="no-result">
            There is no movies for your request.
            </div>`;
        } else {
          const filmListContainer = document.querySelector(`.films-list__container`);
          this._page.unrenderCard();
          this._page.renderCard(filmListContainer, filmSearch);
        }
        searchResultCount.textContent = filmSearch.length;
      } else if (this._search.researchValue().length === 0) {
        this._search.searchReset();
      }
    };
    this._search.searchReset = () => {
      if (document.querySelector(`.no-search-result`)) {
        unrender(noSearch.getElement());
      } else {
        this._page.unrenderAll();
      }
      this._page.init();
    };
    render(this._container, this._search.getElement(), Position.BEFOREEND);
  }
}
export default SearchControlLer;
