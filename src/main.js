import {default as TitleUser} from './components/title-user.js';
import {default as Search} from './components/search.js';
import {default as Statistic} from './components/statistic.js';
import {generateRank} from './data.js';
import {arrFilm as filmData} from './data.js';
import {render, Position} from './utils.js';
import {default as PageController} from './page-controller.js';
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
let count = 5;
const stat = new Statistic();
render(headerContainer, new Search().getElement(), Position.BEFOREEND);
render(headerContainer, new TitleUser(generateRank()).getElement(), Position.BEFOREEND);

const page = new PageController(mainContainer, filmData, count, stat);

page.init();
render(mainContainer, stat.getElement(), Position.BEFOREEND);
