import {generatorRandom} from './utils.js';
const filmData = {
  filmTitle: [`Die hard`, `The Godfather`, `Pulp Fiction`, `Star Wars`, `Schindler's List`, `Fight Club`, `Saving Private Ryan`, `Back to the Future`,
    `The Lord of the Rings - The Return of the King`, `Titanic`, `Terminator 2`, `The Departed`, `Avatar`, `Home Alone`, `The Fifth Element`],
  posters: [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`],
  ratings: [1, 9],
  genre: [`Horor`, `Comedy`, `Action`, `Fantasy`, `Adventure`],
  desciption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
 Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
 Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
 Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  year: [1929, 2019],
  id: [1, 1000],
  director: [
    `Frank Darabont`,
    `Francis Ford Coppola`,
    `Christopher Nolan`,
    `Sidney Lumet`,
    `Quentin Tarantino`,
  ],
  writers: [
    ` Anne Wigton`,
    ` Heinz Herald`,
    ` Richard Weil`,
    ` Quentin Tarantino`,
    ` Christopher Markus`,
    ` Stephen McFeely`,
    ` Joon-ho Bong`,
  ],
  actors: [
    ` Leonardo DiCaprio`,
    ` Brad Pitt`,
    ` Margot Robbie`,
    ` Robert Downey Jr.`,
    ` Chris Evans`,
    ` Mark Ruffalo`,
    ` Kang-ho Song`,
    ` Sun-kyun Lee`,
  ],
  country: [
    `USA`,
    `Mexico`,
    `England`,
    `Russia`,
  ],
  comments: [0, 10],
  hour: Math.round(generatorRandom.generateRandomNumber(0, 2)),
  minutes: Math.round(generatorRandom.generateRandomNumber(0, 60)),
};
const generateDesk = () => {
  const deskStr = generatorRandom.splitStr(filmData.desciption);
  deskStr.length = Math.round(generatorRandom.generateRandomNumber(1, 3));
  return deskStr.join();
};
const generateTime = () => {
  let hour = Math.round(generatorRandom.generateRandomNumber(0, 2)) + `h`;
  let minutes = Math.round(generatorRandom.generateRandomNumber(0, 60));
  if (hour === `0h`) {
    hour = ``;
  }
  return `${hour} ${minutes}m`;
};
const generateFilmData = () => {
  return {
    filmTitle: filmData.filmTitle[generatorRandom.generateRandomCount(filmData.filmTitle.length)],
    ratings: parseFloat(generatorRandom.generateRandomNumber(1, 9)),
    genre: filmData.genre[generatorRandom.generateRandomCount(filmData.genre.length)],
    posters: filmData.posters[generatorRandom.generateRandomCount(filmData.posters.length)],
    year: Math.floor(generatorRandom.generateRandomNumber(filmData.year[0], filmData.year[1])),
    desciption: generateDesk(),
    id: Math.round(generatorRandom.generateRandomNumber(1, 1000)),
    director: filmData.director[generatorRandom.generateRandomCount(filmData.director.length)],
    writers: filmData.writers,
    actors: filmData.actors.splice(generatorRandom.generateRandomCount(8), generatorRandom.generateRandomNumber(2, 7)),
    country: filmData.country[Math.round(generatorRandom.generateRandomCount(4))],
    comments: Math.round(generatorRandom.generateRandomNumber(0, 10)),
    isWatchlist: Boolean(Math.round(Math.random())),
    isViewed: Boolean(Math.round(Math.random())),
    isFavorites: Boolean(Math.round(Math.random())),
    runtime: generateTime(),
  };
};
const generateFilmList = () => Math.round(generatorRandom.generateRandomNumber(5, 25));
const generateMenuCount = () => Math.round(generatorRandom.generateRandomNumber(0, 20));
export const generateRank = () => {
  let count = Math.round(generatorRandom.generateRandomNumber(0, 30));
  let strRank = ``;
  if (count <= 10 && count > 0) {
    strRank = `novice`;
  } else if (count <= 21 && count > 10) {
    strRank = `fan`;
  } else if (count > 21) {
    strRank = `movie buff`;
  } return strRank;
};
export const historyCount = generateMenuCount();
export const watchlistCount = generateMenuCount();
export const favorites = generateMenuCount();
export const totalfilm = generateFilmList();
export const arrFilm = [];
for (let i = 0; i < totalfilm; i++) {
  arrFilm.push(generateFilmData());
}
