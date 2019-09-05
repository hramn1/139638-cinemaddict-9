import {Menu} from './components/menu.js';
import {TitleUser} from './components/title-user.js';
import {Search} from './components/search.js';
import {historyCount} from './data.js';
import {watchlistCount} from './data.js';
import {favorites} from './data.js';
import {generateRank} from './data.js';
import {generateFilmData as filmData} from './data.js';
import {render, Position} from './utils.js';
import {PageController} from './controller.js';
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const page = new PageController(mainContainer, filmData);

render(headerContainer, new Search().getElement(), Position.BEFOREEND);
render(headerContainer, new TitleUser(generateRank()).getElement(), Position.BEFOREEND);
render(mainContainer, new Menu(historyCount, watchlistCount, favorites).getElement(), Position.BEFOREEND);
page.init();
