
class DemoElement extends Polymer.Class({
  is: "demo-element",
  properties: {
    name: {
      type: String,
      value: "John"
    }
  }
}) {
  ready() {
    console.log("Demo Element ready");
  }

  attached() {
    console.log("Demo element attached");
  }
}

document.registerElement(DemoElement.prototype.is, DemoElement);
