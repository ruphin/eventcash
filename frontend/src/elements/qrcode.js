import { html, GluonElement } from '../../node_modules/@gluon/gluon/gluon.js';
import '../../node_modules/qrcode/build/qrcode.min.js';

export class QRCode extends GluonElement {
  constructor() {
    super();
    this.canvas = document.createElement('canvas');
  }

  get template() {
    return html`${this.canvas}`;
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

  static get observedAttributes() {
    return ['message'];
  }

  attributeChangedCallback(a, o, value) {
    this.message = value;
  }
}

customElements.define(QRCode.is, QRCode);

// bitcoin:<address>?amount=0.0001425
