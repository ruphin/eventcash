import { GluonElement, html } from '../../../node_modules/@gluon/gluon/gluon.js';
import { currentQuery, changeRoute } from '../../../node_modules/@gluon/router/gluon-router.js';
import '../../elements/qrcode.js';

class PaymentPage extends GluonElement {
  constructor() {
    super();
    this.eventName = 'Placeholder';
    this.paymentCode = '';
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
      <p>Use this QR code to pay with your Bitcoin Cash wallet</p>
      <qr-code message=${this.paymentCode}></qr-code>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  visit() {
    const opts = {};
    currentQuery()
      .split('&')
      .forEach(queryNode => {
        const [key, value] = queryNode.split('=');
        opts[key] = value;
      });

    const data = {
      address: opts.address
    };
    this.polling = setInterval(() => {
      fetch('http://192.168.1.108:3001/api/tickets/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          console.log('RESPONSE', response);
          if (response.paid > 0) {
            if (this.polling) {
              // Redirect to ticket page
              clearInterval(this.polling);
              this.polling = undefined;
              changeRoute(`/buy/ticket?address=${opts.address}&salt=${opts.salt}`);
            }
          }
        });
    }, 5000);

    // Pull ticketprice and event name

    this.paymentCode = `bitcoincash:${opts.address}?amount=${opts.amount}`;

    this.render();
  }
  leave() {
    if (this.polling) {
      clearInterval(this.polling);
      this.polling = undefined;
    }
  }
}

customElements.define(PaymentPage.is, PaymentPage);
