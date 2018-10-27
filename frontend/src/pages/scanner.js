import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';
import { changeRoute } from '../../node_modules/@gluon/router/gluon-router.js';

import '../elements/qrscanner.js';

class ScannerPage extends GluonElement {
  get template() {
    return html`
      <qr-scanner id="scanner"></qr-scanner>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.scanner.addEventListener('code', e => {
      this.$.scanner.stop();
      changeRoute(`/doorman/confirmation?ticket=${e.detail.content}`);
    });
  }

  visit() {
    this.$.scanner.start();
  }
}

customElements.define(ScannerPage.is, ScannerPage);
