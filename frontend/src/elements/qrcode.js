import { html, GluonElement } from '../../node_modules/@gluon/gluon/gluon.js';
import '../../node_modules/qrcode/build/qrcode.min.js'

export class QRCode extends GluonElement {
  constructor() {
    super();
    this.canvas = document.createElement('canvas');
  }

  get template() {
    return html`${this.canvas}`
  }

  static get observedAttributes() {
    return ['message'];
  }

  set message(value) {
    if (value !== null) {
      this._message = value;
      window.QRCode.toCanvas(this.canvas, value);
    }
  }

  get message() {
    return this._message;
  }

  attributeChangedCallback(a, o, value) {
    this.message = value;
  }
}

customElements.define(QRCode.is, QRCode);
