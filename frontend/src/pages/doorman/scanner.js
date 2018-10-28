import { GluonElement, html } from '../../../node_modules/@gluon/gluon/gluon.js';
import { changeRoute } from '../../../node_modules/@gluon/router/gluon-router.js';
import { tickets } from '../../models/ticket.js';

import '../../elements/qrscanner.js';

class ScannerPage extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <qr-scanner id="scanner"></qr-scanner>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.scanner.addEventListener('code', e => {
      tickets.get(e.detail.content.split('|')[0]).then(ticket => {
        if (ticket == undefined) {
          alert('Invalid Ticket');
        } else {
          this.$.scanner.stop();
          changeRoute(`/doorman/confirmation?ticket=${e.detail.content}`);
        }
      });
    });
  }

  visit() {
    this.$.scanner.start();
  }
}

customElements.define(ScannerPage.is, ScannerPage);
