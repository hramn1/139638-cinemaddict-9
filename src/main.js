import {default as TitleUser} from './components/title-user.js';
import {default as Search} from './components/search.js';
import {default as Statistic} from './components/statistic.js';
import {generateRank} from './data.js';
import {render, unrender, Position, AUTHORIZATION, END_POINT} from './utils.js';
import {default as PageController} from './controllers/page-controller.js';
import {default as SearchControlLer} from './controllers/search-controller.js';
import {default as StatsController} from "./controllers/statistic-controller.js";
import {default as NoFilms} from './components/no-films.js';
import API from "./api.js";
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const loading = new NoFilms(`Loading`);
render(mainContainer, loading.getElement());
const titleUser = generateRank();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let count = 5;
const stat = new Statistic(titleUser);
const search = new Search();

const startApp = (films) => {
  unrender(loading.getElement());
  loading.removeElement();
  const page = new PageController(mainContainer, films, count, stat, onDataChangeMain);
  const statsController = new StatsController(mainContainer, films, stat);
  statsController.init();
  page.init();
  const searchControl = new SearchControlLer(headerContainer, films, search, page, mainContainer);
  searchControl.init();
  render(headerContainer, new TitleUser(titleUser).getElement(), Position.BEFOREEND);
}
const onDataChangeMain = (actionType, update) => {
  switch (actionType) {
    case `uptade`:
      api.updateFilm(({
        id: update.id,
        data: update.data.toRAW()
      })
        .then(() => api.getFilms())
        .then((films) => {
          startApp(films);
        }));
      break;
  }
};


api.getFilms()
  .then((films) => {
    startApp(films);
  });
