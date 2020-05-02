export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const renderComponent = (placeInDocument, component, position) => {
  switch (position) {

    case RenderPosition.AFTERBEGIN:
      placeInDocument.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      placeInDocument.append(component.getElement());
      break;

  }
};
