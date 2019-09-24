import {default as TitleUser} from './components/title-user.js';
import {default as Search} from './components/search.js';
import {default as Statistic} from './components/statistic.js';
import {generateRank} from './data.js';
import {render, Position} from './utils.js';
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
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let count = 5;
const stat = new Statistic(titleUser);
const search = new Search();
api.getFilms()
  .then((films) => {
    const page = new PageController(mainContainer, films, count, stat);
    const statsController = new StatsController(mainContainer, films, stat);
    statsController.init();
    page.init();
    const searchControl = new SearchControlLer(headerContainer, films, search, page, mainContainer);
    searchControl.init();
    render(headerContainer, new TitleUser(titleUser).getElement(), Position.BEFOREEND);
  });




