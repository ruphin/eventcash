import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';
import { currentQuery } from '../../node_modules/@gluon/router/gluon-router.js';

import '../elements/qrscanner.js';

class ConfirmationPage extends GluonElement {
  constructor() {
    super();
    this.ticket = '';
  }

  get template() {
    return html`
      <p>${this.ticket}
    `;
  }

  visit() {
    this.ticket = currentQuery();
    this.render();
  }
}

customElements.define(ConfirmationPage.is, ConfirmationPage);
