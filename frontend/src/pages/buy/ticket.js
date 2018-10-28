import { GluonElement, html } from '../../../node_modules/@gluon/gluon/gluon.js';
import { currentQuery } from '../../../node_modules/@gluon/router/gluon-router.js';
import '../../elements/qrcode.js';

class TicketPage extends GluonElement {
  constructor() {
    super();
    this.eventName = 'Placeholder';
    this.ticket = '';
  }
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
      <p>Payment received! Here is your ticket:</p>
      <qr-code message=${this.ticket}></qr-code>
    `;
  }
  visit() {
    const opts = {};
    currentQuery()
      .split('&')
      .forEach(queryNode => {
        const [key, value] = queryNode.split('=');
        opts[key] = value;
      });
    this.ticket = `${opts.address}|${opts.salt}`;
    this.render();
  }
}

customElements.define(TicketPage.is, TicketPage);
