import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';

class HomePage extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: block;
          overflow: none;
          background: #f3f3f3;
        }
      </style>
      <a href="/doorman">Doorman</a>
    `;
  }
}

customElements.define(HomePage.is, HomePage);
