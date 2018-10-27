import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';

class DoormanPage extends GluonElement {
  get template() {
    return html`
      <a href="/doorman/scanner">Scanner</a>
    `;
  }
}

customElements.define(DoormanPage.is, DoormanPage);
