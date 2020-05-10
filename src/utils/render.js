export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const renderComponent = (placeInDocument, component, position = RenderPosition.BEFOREEND) => {
  if (position === RenderPosition.AFTERBEGIN) {
    placeInDocument.prepend(component.getElement());

  } else if (position === RenderPosition.BEFOREEND) {
    placeInDocument.append(component.getElement());
  }
};
