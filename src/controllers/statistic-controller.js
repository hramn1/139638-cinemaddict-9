import {render, Position} from "../utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

export default class StatsController {
  constructor(container, data, stats) {
    this._container = container;
    this._data = data;
    this._stats = stats;
  }

  _renderCharts(renderFilm) {
    const chartContainer = document.querySelector(`.statistic__chart`);
    this._stats.getStatAll = () =>{
      renderFilm = this._data;
      chartStat.destroy();
      this._renderCharts(renderFilm);
    };
    this._stats.getStatToday = () =>{
      renderFilm = [];
      for (let item of this._data) {
        if (item.watchingDate !== `Invalid date`) {
          if (moment().diff(moment(item.watchingDate), `days`) === 0) {
            renderFilm.push(item);
          }
        }
      }
      chartStat.destroy();
      this._renderCharts(renderFilm);
    };
    this._stats.getStatWeek = () => {
      renderFilm = [];
      for (let item of this._data) {
        if (item.watchingDate !== `Invalid date`) {
          if (moment().diff(moment(item.watchingDate), `days`) < 8) {
            renderFilm.push(item);
          }
        }
      }
      chartStat.destroy();
      this._renderCharts(renderFilm);
    };
    this._stats.getStatYear = () => {
      renderFilm = [];
      for (let item of this._data) {
        if (item.watchingDate !== `Invalid date`) {
          if (moment().diff(moment(item.watchingDate), `days`) < 366) {
            renderFilm.push(item);
          }
        }
      }
      chartStat.destroy();
      this._renderCharts(renderFilm);
    };
    this._stats.getStatMonth = () => {
      renderFilm = [];
      for (let item of this._data) {
        if (item.watchingDate !== `Invalid date`) {
          if (moment().diff(moment(item.watchingDate), `days`) < 31) {
            renderFilm.push(item);
          }
        }
      }
      chartStat.destroy();
      this._renderCharts(renderFilm);
    };
    let chartStat = new Chart(chartContainer, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...this._getAllListGenres(renderFilm)],
        datasets: [{
          data: [...Object.values(this._getCountGenres(renderFilm))],
          backgroundColor: `#88c9ff`,
          anchor: `start`,
          hoverBackgroundColor: `#fff`,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            clamp: true,
            anchor: `start`,
            offset: 40,
            color: `#ffffff`,
            align: `start`,
            font: {
              family: `Open Sans`,
              weight: `bold`,
              size: 14
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              defaultFontFamily: `Open Sans`,
              beginAtZero: true,
              display: true,
              fontColor: `#ffffff`,
              fontSize: 16,
              padding: 85
            },
            maxBarThickness: 30,
            barPercentage: 1.0,
            categoryPercentage: 0.9,
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              min: 0
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            left: 30,
          }
        },
        animation: {
          easing: `easeInOutQuad`
        }
      }
    });
    const getWatched = () => {
      let historyCount = 0;
      for (let it of renderFilm) {
        if (it.controls.isMarkedAsWatched) {
          historyCount++;
        }
      }
      return historyCount;
    };
    const getTotalDurationHour = () =>{
      return Math.floor(renderFilm.reduce((acc, card) => {
        if (card.controls.isMarkedAsWatched) {
          acc = acc + card.duration;
        } return acc;
      }, 0) / 60);
    };
    const getTotalDurationMinute = () => {
      return renderFilm.reduce((acc, card) => {
        if (card.controls.isMarkedAsWatched) {
          acc = acc + card.duration;
        } return acc;
      }, 0) % 60;
    };
    this._stats.getElement().querySelector(`.statistic__item-text--genre`).textContent = this._getTopGenre(renderFilm);
    this._stats.getElement().querySelector(`.statistic__item-count`).textContent = getWatched();
    this._stats.getElement().querySelector(`.statistic__item-hour`).textContent = getTotalDurationHour();
    this._stats.getElement().querySelector(`.statistic__item-minute`).textContent = getTotalDurationMinute();

  }
  _getAllListGenres(data) {
    const genres = new Set([]);
    data.forEach((film) => {
      if (film.genre.length > 0) {
        genres.add(...film.genre);
      }
    });
    return genres;
  }
  _getCountGenres(films) {
    const listGenres = Array.from(this._getAllListGenres(films));
    let genresCounter = {};

    listGenres.forEach((genre) => {
      genresCounter[genre] = 0;
    });

    films.forEach((film) => {
      film.genre.forEach((item) => {
        genresCounter[item] += 1;
      });
    });

    return genresCounter;
  }

  _getTopGenre(films) {
    const countGenres = this._getCountGenres(films);
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
    this._renderCharts(this._data);
  }
}
