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
        a {
          line-height: 2em;
          color: black;
        }
      </style>
      <!-- <div><a href="/create">Create Event</a></div> -->
      <div><a href="/buy">Buy Tickets</a></div>
      <div><a href="/doorman">Doorman</a></div>
    `;
  }
}

customElements.define(HomePage.is, HomePage);
