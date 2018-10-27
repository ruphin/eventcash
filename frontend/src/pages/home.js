import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';

class HomePage extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: block;
          overflow: auto;
          background: #f3f3f3;
          padding: 40px;
        }
      </style>
      <a href="/doorman">Doorman</a>
    `;
  }
}

customElements.define(HomePage.is, HomePage);
