class App {
  constructor() {
    this._appInit();
  }

  _appInit() {
    // Polymer has been initialized
    if (window.Polymer && window.Polymer.Base.importHref) {
      this.init();
      return ;
    }

    // Try again
    setTimeout(() => this._appInit(), 50);
  }

  init() {
    Polymer.Base.importHref('app/elements/demo-element.html');
  }
}

export default new App();
