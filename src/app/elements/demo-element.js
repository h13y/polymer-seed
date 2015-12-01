class DemoElement {
  beforeRegister() {
    this.is = 'demo-element';
    this.properties = {
      name: {
        type: String,
        value: "John"
      }
    };
  }

  ready() {
    console.log("Demo Element ready");
  }

  attached() {
    console.log("Demo element attached");
  }
}

Polymer(DemoElement);
