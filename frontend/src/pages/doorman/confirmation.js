import { GluonElement, html } from '../../../node_modules/@gluon/gluon/gluon.js';
import { currentQuery, changeRoute } from '../../../node_modules/@gluon/router/gluon-router.js';
import { tickets } from '../../models/ticket.js';

class ConfirmationPage extends GluonElement {
  constructor() {
    super();
    this.ticket = {};
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

        /* Buttons */
        button {
          display: inline-block;
          text-decoration: none;
          border: 0;
          font-size: 1em;
          line-height: 25px;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          padding: 4px 12px;
          margin: 1em;
          overflow: hidden;
          text-transform: uppercase;
          border-radius: 3px;
          outline-color: #ccc;
          background: #4285f4;
          color: #fff;
        }

        button:hover {
          background-color: #3367d6 !important;
          cursor: pointer;
        }

        button.red {
          background: #E53935;
        }

        button.red:hover {
          background-color: #C62828 !important;
        }
        h2, p {
          margin-left: 18px;
        }
      </style>
      <h2>${this.ticket.address}</h2>
      <p>Paid: ${this.ticket.paid > 0 ? 'Yes' : 'No'}</p>
      <p>Status: ${this.ticket.status === 'confirmed' ? 'Checked In' : 'Checked Out'}</p>
      <button id="okButton">${this.ticket.status === 'confirmed' ? 'Ok' : 'Check In'}</button><button id="noButton" class="red">${
      this.ticket.status === 'confirmed' ? 'Check out' : 'Cancel'
    }</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.okButton.addEventListener('click', async () => {
      await this.ticket.checkIn();
      console.log(this.ticket);
      changeRoute('/doorman');
    });

    this.$.noButton.addEventListener('click', () => {
      this.ticket.checkOut();
      changeRoute('/doorman');
    });
  }

  visit() {
    const opts = {};
    currentQuery()
      .split('&')
      .forEach(queryNode => {
        const [key, value] = queryNode.split('=');
        opts[key] = value;
      });
    let address = opts.address;
    let salt = opts.salt;
    if (opts.ticket) {
      [address, salt] = opts.ticket.split('|');
    }
    this.ticket = tickets.get(address).then(ticket => {
      if (!ticket) {
        alert('Invalid Ticket');
        window.history.back();
      }
      this.ticket = ticket;
      this.render();
      if (salt) {
        const data = { address, salt };
        data.salt = salt;
        fetch('/api/tickets/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(response => {
            if (!response.verified) {
              alert('Invalid Ticket');
              this.ticket = {};
              window.history.back();
            }
          })
          .catch(e => {
            this.ticket = {};
          });
      }
    });
  }
}

customElements.define(ConfirmationPage.is, ConfirmationPage);
