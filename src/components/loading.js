import AbstractComponent from './abstract-component.js';

const createLoadingComponent = () => {
  return (
    `<section class="films-list">
        <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};

export default class LoadingComponent extends AbstractComponent {
  getTemplate() {
    return createLoadingComponent();
  }
}
