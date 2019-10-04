import {default as TitleUser} from './components/title-user';
import {default as Search} from './components/search';
import {default as Statistic} from './components/statistic';
import {generateRank} from './data';
import {render, unrender, Position, AUTHORIZATION, END_POINT} from './utils';
import {default as PageController} from './controllers/page-controller';
import {default as SearchControlLer} from './controllers/search-controller';
import {default as StatsController} from "./controllers/statistic-controller";
import {default as NoFilms} from './components/no-films';
import API from "./api";
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const loading = new NoFilms(`Loading`);
render(mainContainer, loading.getElement(), Position.BEFOREEND);
const titleUser = generateRank();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let count = 5;
const search = new Search();

const startApp = (films) => {
  const stat = new Statistic(titleUser, films);
  console.log(films)
  let commentArr = [];
  for (let i = 0; i < films.length; i++) {
    api.getComments(films[i].id).then((comments) => {
      commentArr[films[i].id] = comments;
    });
  }
  unrender(loading.getElement());
  loading.removeElement();
  const page = new PageController(mainContainer, films, count, stat, onDataChangeMain, commentArr);
  const statsController = new StatsController(mainContainer, films, stat);
  statsController.init();
  page.init();
  const searchControl = new SearchControlLer(headerContainer, films, search, page, mainContainer);
  searchControl.init();
  render(headerContainer, new TitleUser(titleUser).getElement(), Position.BEFOREEND);
};
const onDataChangeMain = (actionType, update) => {
  switch (actionType) {
    case `update`:
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
