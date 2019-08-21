import {generatorRandom} from './utils.js';
const deskStr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
 Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
 Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
 Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const filmData = {
  filmTitle: [`Die hard`, `The Godfather`, `Pulp Fiction`, `Star Wars`, `Schindler's List`, `Fight Club`, `Saving Private Ryan`, `Back to the Future`,
    `The Lord of the Rings - The Return of the King`, `Titanic`, `Terminator 2`, `The Departed`, `Avatar`, `Home Alone`, `The Fifth Element`],
  posters: [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`],
  ratings: generatorRandom.generateRandomNumber(1, 9),
  genre: [`Horor`, `Comedy`, `Action`, `Fantasy`, `Adventure`],
  desciption: generatorRandom.splitStr(deskStr),
  year: [1929, 2019],
};
export const generateFilmData = {
  filmTitle: filmData.filmTitle[generatorRandom.generateRandomCount(filmData.filmTitle.length)],
  ratings: parseFloat(filmData.ratings),
  genre: filmData.genre[generatorRandom.generateRandomCount(filmData.genre.length)],
  posters: filmData.posters[generatorRandom.generateRandomCount(filmData.posters.length)],
  year: Math.floor(generatorRandom.generateRandomNumber(filmData.year[0], filmData.year[1])),
  desciption: () => {
    filmData.desciption.length = Math.round(generatorRandom.generateRandomNumber(1, 3));
    return filmData.desciption.join();
  },
};
const generateFilmList = () => Math.round(generatorRandom.generateRandomNumber(5, 25));
export const totalfilm = generateFilmList();
