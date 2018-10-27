import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';
import { tickets } from '../models/ticket.js';

class DoormanPage extends GluonElement {
  constructor() {
    super();
    this.tickets = [];
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
        .button {
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

        .button:hover {
          background-color: #3367d6 !important;
          cursor: pointer;
        }
        h2 {
          display: inline-block;
          margin-left: 18px;
        }
        .check {
          display: inline-block;
          width: 18px;
        }
        .ticketlink {
          display: inline-block;
          margin: 8px 0px;
          color: black;
          text-decoration: none;
        }
        .checkedin a {
          color: darkgreen;
        }
        .title {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
        }

        .title .count {
          font-weight: normal;
        }
      </style>

      <div class="title">
      <h2>Tickets<span class="count"> — ${this.tickets.filter(ticket => ticket.checkedIn).length}/${this.tickets.length}</span></h2>
        <a class="button" href="/doorman/scanner">Scan</a>
      </div>
      <div class="ticketList">
        ${this.tickets.map(ticket => html`
          <div class=${ticket.checkedIn ? 'checkedin' : ''}><a class="ticketlink" href="/doorman/confirmation?id=${ticket.id}"><span class="check">${ticket.checkedIn ? '✔' : ''}</span>${ticket.id}</a></div>
        `)}
      </div>

    `;
  }
  connectedCallback() {
    super.connectedCallback();
    tickets.all().then(tickets => {
      this.tickets = tickets;
      this.render();
    });
  }
  visit() {
    this.render();
  }
}

customElements.define(DoormanPage.is, DoormanPage);
