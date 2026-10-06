import { html, GluonElement } from '@gluon/gluon/gluon.js';
import QRCodeLib from 'qrcode';

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
      QRCodeLib.toCanvas(this.canvas, value);
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
