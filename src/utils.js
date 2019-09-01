export const generatorRandom = {
  generateRandomNumber(min, max) {
    return (min + Math.random() * (max - min)).toFixed(1);
  },
  splitStr(str) {
    return str.split(`.`);
  },
  generateRandomCount(count) {
    return Math.floor(Math.random() * count);
  },
};
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
export const isEscPressed = (key) => {
  return key === `Escape` || key === `Esc`;
};

