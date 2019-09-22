import {default as TitleUser} from './components/title-user.js';
import {default as Search} from './components/search.js';
import {default as Statistic} from './components/statistic.js';
import {generateRank} from './data.js';
import {arrFilm as filmData} from './data.js';
import {render, Position} from './utils.js';
import {default as PageController} from './controolers/page-controller.js';
import {default as SearchControlLer} from './controolers/search-controller.js';
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
let count = 5;
const stat = new Statistic();
const search = new Search();
render(headerContainer, stat.getElement(), Position.BEFOREEND);

const page = new PageController(mainContainer, filmData, count, stat);

page.init();
const searchControl = new SearchControlLer(headerContainer, filmData, search, page);

searchControl.init();
render(headerContainer, new TitleUser(generateRank()).getElement(), Position.BEFOREEND);

render(mainContainer, stat.getElement(), Position.BEFOREEND);
