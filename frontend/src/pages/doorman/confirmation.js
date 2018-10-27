import { GluonElement, html } from '../../../node_modules/@gluon/gluon/gluon.js';
import { currentQuery } from '../../../node_modules/@gluon/router/gluon-router.js';
import { changeRoute } from '../../../node_modules/@gluon/router/gluon-router.js';
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
          font-family: RobotoDraft, 'Helvetica Neue', Helvetica, Arial;
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
      <h2>${this.ticket.id}</h2>
      <p>Status: ${this.ticket.checkedIn ? 'Checked In' : 'Checked Out'}</p>
      <button id="okButton">${this.ticket.checkedIn ? 'Ok' : 'Check In'}</button><button id="noButton" class="red">${
      this.ticket.checkedIn ? 'Check out' : 'Cancel'
    }</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.okButton.addEventListener('click', () => {
      this.ticket.checkIn();
      changeRoute('/doorman');
    });

    this.$.noButton.addEventListener('click', () => {
      this.ticket.checkOut();
      changeRoute('/doorman');
    });
  }

  visit() {
    this.ticket = tickets.get(currentQuery().split('=')[1]).then(ticket => {
      if (!ticket) {
        alert('Invalid Ticket');
        window.history.back();
      }
      this.ticket = ticket;
      this.render();
    });
  }
}

customElements.define(ConfirmationPage.is, ConfirmationPage);
