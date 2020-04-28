export const getRandomNumer = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrElement = (arr) => {
  const randomIndex = getRandomNumer(0, arr.length);
  return arr[randomIndex];
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const renderElement = (placeInDocument, element, position) => {
  switch (position) {

    case RenderPosition.AFTERBEGIN:
      placeInDocument.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      placeInDocument.append(element);
      break;

  }
};
