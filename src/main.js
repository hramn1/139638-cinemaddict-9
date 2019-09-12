import {default as Menu} from './components/menu.js';
import {default as TitleUser} from './components/title-user.js';
import {default as Search} from './components/search.js';
import {historyCount} from './data.js';
import {watchlistCount} from './data.js';
import {favorites} from './data.js';
import {generateRank} from './data.js';
import {arrFilm as filmData} from './data.js';
import {render, Position} from './utils.js';
import {default as PageController} from './page-controller.js';
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
let count = 5;
const page = new PageController(mainContainer, filmData, count);

render(headerContainer, new Search().getElement(), Position.BEFOREEND);
render(headerContainer, new TitleUser(generateRank()).getElement(), Position.BEFOREEND);
render(mainContainer, new Menu(historyCount, watchlistCount, favorites).getElement(), Position.BEFOREEND);
page.init();
