export const generatorRandom = {
  generateRandomNumber: function (min, max) {
    return (min + Math.random() * (max - min)).toFixed(1);
  },
  splitStr: function (str) {
    return str.split(`.`);
  },
  generateRandomCount: function (count) {
    return Math.floor(Math.random() * count);
  },
};
