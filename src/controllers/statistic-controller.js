import {render, Position} from "../utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatsController {
  constructor(container, data, stats) {
    this._container = container;
    this._data = data;
    this._stats = stats;
  }
  _renderCharts() {
    this._getStats()
    const chartContainer = document.querySelector(`.statistic__chart`);
    return new Chart(chartContainer, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._getCountGenres(this._data))],
        datasets: [{
          data: [...Object.values(this._getCountGenres(this._data))],
          backgroundColor: `#ffe800`,
          anchor: `start`,
          hoverBackgroundColor: `#fff`,
        }],
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 0
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
  _getAllListGenres(data) {
    const genres = new Set([]);
    data.forEach((film) => {
      if(film.genre.length>0) {
        genres.add(...film.genre);
      }
    });
    return Array.from(genres);
  }

  _getCountGenres(films) {
    const listGenresArray = this._getAllListGenres(films);
    const genresCounter = {};

    listGenresArray.forEach((genre) => {
      genresCounter[genre] = 0;
    });

    films.forEach((film) => {
      film.genre.forEach((item) => {
        genresCounter[item] += 1;
      });
    });

    return genresCounter;
  }
  _getStats() {
  console.log(this._data)
  }

  _getTopGenre() {
    const countGenres = this._getCountGenres(this._data);
    let maxCount = 0;
    let topGenre = ``;

    for (let genre in countGenres) {
      if (countGenres[genre] > maxCount) {
        maxCount = countGenres[genre];
        topGenre = genre;
      }
    }

    return topGenre;
  }
  init() {
    this._getAllListGenres(this._data);
    render(this._container, this._stats.getElement(), Position.AFTER);
    this._renderCharts();
  }
}
