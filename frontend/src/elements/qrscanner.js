import { html, GluonElement } from '../@gluon/gluon/gluon.js';

export class QRScanner extends GluonElement {
  get template() {
    return html`stuff`;
  }
}

customElements.define(QRScanner.is, QRScanner);
