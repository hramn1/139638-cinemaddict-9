import {render, Position} from "../utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatsController {
  constructor(container, data, stats) {
    this._container = container;
    this._data = data;
    this._stats = stats;
  }

  init() {
    render(this._container, this._stats.getElement(), Position.AFTER);
    this._renderCharts();
  }


  _renderCharts() {

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
            top: 10
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getCountGenres(films) {
    const genresCounter = {
      horrors: 0,
      militant: 0,
      drama: 0,
      comedy: 0,
      adventures: 0,
      criminal: 0,
      fantasy: 0
    };

    films.forEach((film) => {
      genresCounter[film.genre] += 1;
    });

    return genresCounter;
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
}
