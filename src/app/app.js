class App {
  constructor() {
    this.init();
  }

  init() {
    Polymer.Base.importHref('app/elements/demo-element.html');
  }
}

export default new App();
