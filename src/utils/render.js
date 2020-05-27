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

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    const { scrollTop, scrollLeft } = oldElement;

    parentElement.replaceChild(newElement, oldElement);

    newElement.scrollTop = scrollTop;
    newElement.scrollLeft = scrollLeft;
  }
};
