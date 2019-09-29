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
    this._getStats()
    const chartContainer = document.querySelector(`.statistic__chart`);
    return new Chart(chartContainer, {
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
  }
  _getAllListGenres(data) {
    const genres = new Set([]);
    data.forEach((film) => {
      if(film.genre.length>0) {
        genres.add(...film.genre);
      }
    });
    return genres;
  }

  _getCountGenres(films) {
    const listGenresArray = Array.from(this._getAllListGenres(films));
    let genresCounter = {};

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
    let renderFilm = this._data;
    this._stats.getStatAll =()=>{
      renderFilm = this._data.slice(0,5)
      this._renderCharts(renderFilm);
    }
    for (let item of this._data){
      if (item.watchingDate) {
        //console.log('Разница в ', moment().diff(moment(item.watchingDate), 'days'), 'дней');
        // console.log(moment(item.watchingDate).format())
        // console.log(moment().format())
        // console.log(watchedTima)
      }
    }
    this._stats.getStatToday =()=>{

      // console.log(moment().startOf('day').fromNow())
      //  console.log(moment(this._data.watchingDate).fromNow())
      renderFilm = this._data
    }
    console.log(renderFilm)
    this._stats.getElement().querySelector(`.statistic__item-text--genre`).textContent = this._getTopGenre();
    this._getAllListGenres(this._data);
    render(this._container, this._stats.getElement(), Position.AFTER);
    this._renderCharts(renderFilm);
  }
}
